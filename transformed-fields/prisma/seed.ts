import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing posts
  await prisma.post.deleteMany({});

  // Create 100 random posts
  const posts = Array.from({ length: 100 }, () => ({
    title: faker.hacker.phrase(),
    createdAt: faker.date.recent(365),
  })) satisfies Prisma.PostCreateInput[];

  // Seed the database
  for (const post of posts) {
    await prisma.post.create({ data: post });
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
