import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient().$extends({
  name: "computed-fields",
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute({ firstName, lastName }) {
          return `${firstName} ${lastName}`;
        },
      },
    },
  },
});

async function main() {
  const users = await prisma.user.findMany({
    select: {
      fullName: true,
    },
    take: 5,
  });

  for (const user of users) {
    console.info(`- ${user.fullName}`);
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
