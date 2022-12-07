import { Prisma, PrismaClient } from "./generated/client";
import { ProductValidation } from "./models/product";
import { ReviewValidation } from "./models/review";

const prisma = new PrismaClient()
  .$extends(ProductValidation)
  .$extends(ReviewValidation);

async function main() {
  await prisma.product.deleteMany();

  // Valid product
  const product = await prisma.product.create({
    data: {
      slug: "example-product",
      name: "Example Product",
      description: "Lorem ipsum dolor sit amet",
      price: new Prisma.Decimal("10.95"),
    },
  });

  // Valid review
  const review = await prisma.review.create({
    data: {
      stars: 4,
      body: "Lorem ipsum dolor sit amet",
      productId: product.id,
    },
  });

  console.log({ product, review });

  // Invalid product
  try {
    await prisma.product.create({
      data: {
        slug: "invalid-product",
        name: "Invalid Product",
        description: "Lorem ipsum dolor sit amet",
        price: new Prisma.Decimal("-1.00"),
      },
    });
  } catch (err: any) {
    console.log(err?.cause?.issues);
  }

  // Invalid review
  try {
    await prisma.review.create({
      data: {
        stars: 6,
        body: "Wow!",
        productId: product.id,
      },
    });
  } catch (err: any) {
    console.log(err?.cause?.issues);
  }
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
