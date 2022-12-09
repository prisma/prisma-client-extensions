import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
  .$extends({
    result: {
      user: {
        fullName: {
          needs: { firstName: true, lastName: true },
          compute(user) {
            return `${user.firstName} ${user.lastName}`;
          },
        },
      },
    },
  })
  .$extends({
    result: {
      user: {
        displayName: {
          needs: { fullName: true, email: true },
          compute(user) {
            return `${user.fullName} <${user.email}>`;
          },
        },
      },
    },
  });

async function main() {
  const users = await prisma.user.findMany({ take: 5 });

  for (const user of users) {
    console.info(`- ${user.displayName}`);
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
