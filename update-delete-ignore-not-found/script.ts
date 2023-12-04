import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  name: "UpdateAndDeleteIgnoreNotFound",
  model: {
    $allModels: {
      async updateIgnoreOnNotFound<T, A>(
        this: T,
        args: Prisma.Exact<A, Prisma.Args<T, "update">>
      ): Promise<Prisma.Result<T, A, "update"> | null> {
        try {
          const context = Prisma.getExtensionContext(this) as any;
          return await context.update(args);
        } catch (err) {
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2025"
          ) {
            return null;
          }
          throw err;
        }
      },
      async deleteIgnoreOnNotFound<T, A>(
        this: T,
        args: Prisma.Exact<A, Prisma.Args<T, "delete">>
      ): Promise<Prisma.Result<T, A, "delete"> | null> {
        try {
          const context = Prisma.getExtensionContext(this) as any;
          return await context.delete(args);
        } catch (err) {
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2025"
          ) {
            return null;
          }
          throw err;
        }
      },
    },
  },
});

async function main() {
  const updateOp = await prisma.user.updateIgnoreOnNotFound({
    where : {
      id: "-1"
    },
    data: {
      firstName: "Alex P."
    }
  });

  const deleteOp = await prisma.user.deleteIgnoreOnNotFound({
    where : {
      id: "-1"
    },
  });

  console.log({
    updateOp,
    deleteOp
  })

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
