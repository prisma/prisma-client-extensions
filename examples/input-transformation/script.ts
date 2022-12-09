import { PrismaClient } from "@prisma/client";

const adminPrisma = new PrismaClient();

const publicPrisma = adminPrisma.$extends({
  query: {
    post: {
      $allOperations({ args, query, operation }) {
        switch (operation) {
          case "aggregate":
          case "count":
          case "findFirst":
          case "findFirstOrThrow":
          case "findMany":
          case "findUnique":
          case "findUniqueOrThrow":
          case "groupBy": {
            return query({
              ...args,
              where: {
                ...(args as any).where,
                published: true,
              },
            });
          }

          default:
            throw new Error("Public client is read-only");
        }
      },
    },
  },
});

async function main() {
  const allPosts = await adminPrisma.post.count();
  console.log(`- All posts: ${allPosts}`);

  const publishedPosts = await publicPrisma.post.count();
  console.log(`- Published posts: ${publishedPosts}`);
}

main()
  .then(async () => {
    await adminPrisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await adminPrisma.$disconnect();
    process.exit(1);
  });
