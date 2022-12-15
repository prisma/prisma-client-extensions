import { Prisma, PrismaClient, TaskStatus } from "@prisma/client";

function bypassRLS() {
  return Prisma.defineExtension((prisma) =>
    prisma.$extends({
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
    })
  );
}

function forCompany(companyId: string) {
  return Prisma.defineExtension((prisma) =>
    prisma.$extends({
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
    })
  );
}

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.$extends(bypassRLS()).user.findFirstOrThrow();

  const companyPrisma = prisma.$extends(forCompany(user.companyId));

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
