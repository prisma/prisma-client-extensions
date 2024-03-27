import { Prisma, PrismaClient } from "@prisma/client";

const WRITE_METHODS = [
  "create",
  "update",
  "upsert",
  "delete",
  "createMany",
  "updateMany",
  "deleteMany",
] as const;

const GLOBAL_WRITE_METHODS = [
    '$executeRaw',
    '$queryRawUnsafe',
    '$executeRawUnsafe',
] as const;

const ReadonlyClient = Prisma.defineExtension({
  name: "ReadonlyClient",
  model: {
    $allModels: Object.fromEntries(
      WRITE_METHODS.map((method) => [
        method,
        function (args: never) {
          throw new Error(
            `Calling the \`${method}\` method on a readonly client is not allowed`
          );
        },
      ])
    ) as {
      [K in typeof WRITE_METHODS[number]]: (
        args: `Calling the \`${K}\` method on a readonly client is not allowed`
      ) => never;
    },
  },
  query: Object.fromEntries(
    GLOBAL_WRITE_METHODS.map((method) => [
        method,
        function (args: any) {
          throw new Error(`Calling the \`${method}\` method on a readonly client is not allowed`);
        }
    ])) as {
        [K in typeof GLOBAL_WRITE_METHODS[number]]: (args: any) => never;
    }
});

const prisma = new PrismaClient();
const readonlyPrisma = prisma.$extends(ReadonlyClient);

async function main() {
  const posts = await readonlyPrisma.post.findMany({ take: 5 });
  console.log(posts);

  // @ts-expect-error:
  //   Argument of type '{ data: { title: string; published: boolean; }; }'
  //   is not assignable to parameter of type '"Calling the `create` method
  //   on a readonly client is not allowed"'.
  await readonlyPrisma.post.create({
    data: { title: "New post", published: false },
  });

  await readonlyPrisma.$executeRaw`INSERT INTO post(id,title, published) VALUES(12345,'New post', false)`
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
