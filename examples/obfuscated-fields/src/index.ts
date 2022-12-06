import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient().$extends({
  name: "obfuscated-fields",
  result: {
    user: {
      password: {
        needs: {},
        compute() {
          return undefined;
        },
      },
    },
  },
});

async function main() {
  const user = await prisma.user.findFirstOrThrow();
  console.info("Email: ", user.email);
  console.info("Password: ", user.password);
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
