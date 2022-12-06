import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

const xprisma = prisma.$extends({
  name: "model-methods",
  result: {
    user: {
      save: {
        needs: { id: true, email: true },
        compute({ id, email }) {
          return () => prisma.user.update({ where: { id }, data: { email } });
        },
      },

      delete: {
        needs: { id: true },
        compute({ id }) {
          return () => prisma.user.delete({ where: { id } });
        },
      },
    },
  },
});

async function main() {
  const user = await xprisma.user.findFirstOrThrow({});
  user.email = "test@example.com";

  await user.save();
  console.info(await xprisma.user.findUnique({ where: { id: user.id } }));

  await user.delete();
  console.info(await xprisma.user.findUnique({ where: { id: user.id } }));
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
