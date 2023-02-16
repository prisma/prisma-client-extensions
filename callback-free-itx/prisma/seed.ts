import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing users
  await prisma.user.deleteMany({});

  // Create 100 random users
  const users = Array.from({ length: 100 }, () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  })) satisfies Prisma.UserCreateInput[];

  // Seed the database
  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  console.log(`Database has been seeded. 🌱`);
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
