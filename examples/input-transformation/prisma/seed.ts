import { faker } from "@faker-js/faker";
import { PrismaClient } from "../src/generated/client";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing users
  await prisma.post.deleteMany({});

  // Create 100 random posts
  await prisma.post.createMany({
    data: Array.from({ length: 100 }, () => ({
      title: faker.hacker.phrase(),
      published: faker.datatype.boolean(),
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
