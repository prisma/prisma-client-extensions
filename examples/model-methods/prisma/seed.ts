import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "../src/generated/client";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing users
  await prisma.user.deleteMany({});

  // Create a user and some posts
  await prisma.user.create({
    data: {
      email: faker.internet.email(),
    },
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
