import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    post: {
      createdAtFormatted: {
        needs: { createdAt: true },
        compute(post) {
          return formatDistanceToNow(post.createdAt, {
            addSuffix: true,
            locale: de,
          });
        },
      },
    },
  },
});

async function main() {
  const posts = await prisma.post.findMany({ take: 5 });

  for (const post of posts) {
    console.info(`- ${post.title} (${post.createdAtFormatted})`);
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
