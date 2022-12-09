import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
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
  const user = await prisma.user.create({
    data: { email: "test@example.com" },
  });
  user.email = "updated@example.com";

  await user.save();
  console.info(
    "Updated object: ",
    await prisma.user.findUnique({ where: { id: user.id } })
  );

  await user.delete();
  console.info(
    "Deleted object: ",
    await prisma.user.findUnique({ where: { id: user.id } })
  );
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
