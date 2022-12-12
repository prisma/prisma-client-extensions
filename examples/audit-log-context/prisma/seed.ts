import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create 100 random users
  const users = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    email: faker.helpers.unique(faker.internet.email),
  })) satisfies Prisma.UserCreateManyInput[];

  // Create 20 random products
  const products = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: faker.helpers.unique(faker.commerce.productName),
  })) satisfies Prisma.ProductCreateManyInput[];

  // Create 300 random orders
  const orders = Array.from({ length: 300 }, (_, i) => ({
    userId: faker.helpers.arrayElement(users).id,
    productId: faker.helpers.arrayElement(products).id,
    quantity: faker.datatype.number({ min: 1, max: 100 }),
  })) satisfies Prisma.OrderCreateManyInput[];

  await prisma.$transaction([
    // Cleanup existing data
    prisma.$executeRaw`TRUNCATE TABLE "audit"."OrderVersion" RESTART IDENTITY`,
    prisma.$executeRaw`TRUNCATE TABLE "audit"."ProductVersion" RESTART IDENTITY`,
    prisma.$executeRaw`TRUNCATE TABLE "public"."Order" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "public"."Product" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "public"."User" RESTART IDENTITY CASCADE`,

    // Add new data
    prisma.user.createMany({ data: users }),
    prisma.product.createMany({ data: products }),
    prisma.order.createMany({ data: orders }),
  ]);

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
