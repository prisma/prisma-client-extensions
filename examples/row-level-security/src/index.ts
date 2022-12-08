import { Prisma, PrismaClient, TaskStatus } from "./generated/client";

const prisma = new PrismaClient().$extends({
  name: "row-level-security",
  client: {
    // Creates an extended Prisma Client which bypasses row-level security
    bypassRLS() {
      return Prisma.getExtensionContext(this).$extends({
        query: {
          $allModels: {
            async $allOperations({ args, query }) {
              const [, result] = await prisma.$transaction([
                prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
                query(args),
              ]);
              return result;
            },
          },
        },
      });
    },

    // Creates an extended Prisma Client which can access the given company's data
    forCompany(companyId: string) {
      return Prisma.getExtensionContext(this).$extends({
        query: {
          $allModels: {
            async $allOperations({ args, query }) {
              const [, result] = await prisma.$transaction([
                prisma.$executeRaw`SELECT set_config('app.current_company_id', ${companyId}, TRUE)`,
                query(args),
              ]);
              return result;
            },
          },
        },
      });
    },
  },
});

async function main() {
  const user = await prisma.bypassRLS().user.findFirstOrThrow();

  const companyPrisma = prisma.forCompany(user.companyId);

  const projectInclude = {
    owner: true,
    tasks: {
      include: {
        assignee: true,
      },
    },
  } satisfies Prisma.ProjectInclude;

  const projects = await companyPrisma.project.findMany({
    include: projectInclude,
  });

  invariant(projects.every((project) => project.companyId === user.companyId));

  const newProject = await companyPrisma.project.create({
    include: projectInclude,
    data: {
      title: "New project",
      owner: {
        connect: { id: user.id },
      },
      tasks: {
        createMany: {
          data: [
            { title: "Task A", status: TaskStatus.Pending, userId: user.id },
            { title: "Task B", status: TaskStatus.Pending, userId: user.id },
            { title: "Task C", status: TaskStatus.Pending, userId: user.id },
          ],
        },
      },
    },
  });

  invariant(newProject.companyId === user.companyId);
  invariant(
    newProject.tasks.every((task) => task.companyId === user.companyId)
  );
}

function invariant<T>(condition: T): asserts condition {
  if (!condition) throw new Error("Invariant failed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
