import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  model: {
    $allModels: {
      async exists<T>(
        this: T,
        args: { where: Prisma.Args<T, 'findFirst'>['where'] }
      ): Promise<boolean> {
        const context = Prisma.getExtensionContext(this)
        const result = await (context as any).findFirst(args)
        return result !== null
      },
    },
  },
})

async function main() {
  const user = await prisma.user.exists({
    where: {
      name: 'Alice'
    }
  })

  console.log({ user })

  const post = await prisma.post.exists({
    where: {
      OR: [
        { title: { contains: 'Prisma' } },
        { content: { contains: 'Prisma' } }
      ]
    }
  })

  console.log({ post })
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
