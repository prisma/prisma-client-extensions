import { Prisma, PrismaClient } from "@prisma/client";
import { sub } from "date-fns";

const prisma = new PrismaClient({ log: ["query"] }).$extends({
  model: {
    post: {
      unpublished: () => ({ published: false }),
      published: () => ({ published: true }),
      byAuthor: (authorId: string) => ({ authorId }),
      byAuthorDomain: (domain: string) => ({
        author: { email: { endsWith: `@${domain}` } },
      }),
      hasComments: () => ({ comments: { some: {} } }),
      hasRecentComments: (date: Date) => ({
        comments: { some: { createdAt: { gte: date } } },
      }),
      titleContains: (search: string) => ({ title: { contains: search } }),
    } satisfies Record<string, (...args: any) => Prisma.PostWhereInput>,
  },
});

async function main() {
  const posts = await prisma.post.findMany({
    where: {
      AND: [
        prisma.post.published(),
        prisma.post.byAuthorDomain("prisma.io"),
        prisma.post.hasRecentComments(sub(new Date(), { weeks: 1 })),
        prisma.post.titleContains("GraphQL"),
      ],
    },
  });
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
