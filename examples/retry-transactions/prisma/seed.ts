import { faker } from "@faker-js/faker";
import { PrismaClient } from "../src/generated/client";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing users
  await prisma.user.deleteMany({});

  // Create 100 random users
  await prisma.user.createMany({
    data: Array.from({ length: 100 }, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    })),
  });

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
