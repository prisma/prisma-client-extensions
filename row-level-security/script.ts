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
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  // console.log('Duration: ' + e.duration + 'ms')
})

async function main() {
  const bypassClient = prisma.$extends(bypassRLS())

  console.log("### plainProjects")
  const plainProjects = await prisma.project.findMany({ take: 3 });
  console.log({ plainProjects})

  console.log("### users1_a")
  const user1_a = await bypassClient.user.findFirstOrThrow();
  console.log({user1_a})
  console.log("### users1_b")
  const user1_b = await bypassClient.user.findFirstOrThrow();
  console.log({user1_b})

  console.log("### projects")
  const companyPrisma = prisma.$extends(forCompany(user1_a.companyId));
  const projects = await companyPrisma.project.findMany({ take: 3 });
  console.log({projects})

  console.log("### user2")
  const user2 = await bypassClient.user.findFirstOrThrow();
  console.log({user2})
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
