import { PrismaClient } from "@prisma/client";

const adminPrisma = new PrismaClient();

const publicPrisma = adminPrisma.$extends({
  query: {
    post: {
      $allOperations({ args, query, operation }) {
        // Do nothing for `create`
        if (operation === "create") {
          return query(args);
        }

        // Refine the type - methods other than `create` accept a `where` clause
        args = args as Extract<typeof args, { where: unknown }>;

        // Augment the `where` clause with `published: true`
        return query({
          ...args,
          where: {
            ...args.where,
            published: true,
          },
        });
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
