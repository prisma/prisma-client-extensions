import bcrypt from "bcryptjs";
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

const xprisma = prisma.$extends({
  name: "custom-methods",
  model: {
    user: {
      async signUp(email: string, password: string) {
        const hash = await bcrypt.hash(password, 10);
        return prisma.user.create({
          data: {
            email,
            password: {
              create: {
                hash,
              },
            },
          },
        });
      },

      async findManyByDomain(domain: string) {
        return prisma.user.findMany({
          where: { email: { endsWith: `@${domain}` } },
        });
      },
    },
  },
});

async function main() {
  await xprisma.user.signUp("user1@example1.com", "p4ssword");
  await xprisma.user.signUp("user2@example2.com", "s3cret");

  const users = await xprisma.user.findManyByDomain("example2.com");
  console.log(users);
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
