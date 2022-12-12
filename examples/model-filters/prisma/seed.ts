import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import cuid from "cuid";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing users
  await prisma.user.deleteMany({});

  // Create 100 random users
  const users = Array.from({ length: 100 }, () => ({
    id: cuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  })) satisfies Prisma.UserCreateInput[];

  // Create 40 posts with random authors and comments
  const posts = Array.from({ length: 40 }, () => ({
    title: faker.hacker.phrase(),
    published: faker.datatype.boolean(),
    authorId: faker.helpers.arrayElement(users).id,
    comments: {
      create: Array.from(
        { length: faker.datatype.number({ min: 0, max: 5 }) },
        () => ({
          text: faker.lorem.paragraph(),
          commenterId: faker.helpers.arrayElement(users).id,
          createdAt: faker.date.recent(365),
        })
      ),
    },
  })) satisfies Prisma.PostUncheckedCreateInput[];

  // Seed the database
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
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
