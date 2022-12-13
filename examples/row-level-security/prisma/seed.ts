import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create 100 companies
  const data = Array.from({ length: 100 }, () => {
    const company = {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    } satisfies Prisma.CompanyCreateManyInput;

    // Create 20 users per company
    const users = Array.from({ length: 10 }, () => ({
      id: faker.datatype.uuid(),
      companyId: company.id,
      email: faker.helpers.unique(faker.internet.email),
    })) satisfies Prisma.UserCreateManyInput[];

    // Create 50 projects per company
    const projects = Array.from({ length: 20 }, () => ({
      id: faker.datatype.uuid(),
      companyId: company.id,
      userId: faker.helpers.arrayElement(users).id,
      title: faker.commerce.productName(),
    })) satisfies Prisma.ProjectCreateManyInput[];

    // Create 500 tasks per company
    const tasks = Array.from({ length: 200 }, () => ({
      id: faker.datatype.uuid(),
      companyId: company.id,
      projectId: faker.helpers.arrayElement(projects).id,
      userId: faker.helpers.arrayElement(users).id,
      title: faker.hacker.phrase(),
      status: faker.helpers.objectValue(TaskStatus),
    })) satisfies Prisma.TaskCreateManyInput[];

    return { company, users, projects, tasks };
  });

  await prisma.$transaction([
    prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
    prisma.company.deleteMany(),
    prisma.company.createMany({ data: data.map((d) => d.company) }),
    prisma.user.createMany({ data: data.flatMap((d) => d.users) }),
    prisma.project.createMany({ data: data.flatMap((d) => d.projects) }),
    prisma.task.createMany({ data: data.flatMap((d) => d.tasks) }),
  ]);

  console.log(`Database has been seeded. 🌱`);

  await prisma.user.createMany({
    data: Array.from({ length: 100 }, () => ({
      email: randomEmail(),
    })),
  });
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
