import { Prisma, PrismaClient } from "@prisma/client";

type FlatTransactionClient = Prisma.TransactionClient & {
  $commit: () => Promise<void>;
  $rollback: () => Promise<void>;
};

const ROLLBACK = { [Symbol.for("prisma.client.extension.rollback")]: true };

const prisma = new PrismaClient({ log: ["query"] }).$extends({
  client: {
    async $begin() {
      const prisma = Prisma.getExtensionContext(this);
      let setTxClient: (txClient: Prisma.TransactionClient) => void;
      let commit: () => void;
      let rollback: () => void;

      // a promise for getting the tx inner client
      const txClient = new Promise<Prisma.TransactionClient>((res) => {
        setTxClient = (txClient) => res(txClient);
      });

      // a promise for controlling the transaction
      const txPromise = new Promise((_res, _rej) => {
        commit = () => _res(undefined);
        rollback = () => _rej(ROLLBACK);
      });

      // opening a transaction to control externally
      if (
        "$transaction" in prisma &&
        typeof prisma.$transaction === "function"
      ) {
        const tx = prisma.$transaction((txClient) => {
          setTxClient(txClient as unknown as Prisma.TransactionClient);
          return txPromise;
        }).catch((e) => {
          if (e === ROLLBACK) return;
          throw e;
        });

        // return a proxy TransactionClient with `$commit` and `$rollback` methods
        return new Proxy(await txClient, {
          get(target, prop) {
            if (prop === "$commit") {
              return () => {
                commit();
                return tx;
              };
            }
            if (prop === "$rollback") {
              return () => {
                rollback();
                return tx;
              };
            }
            if (prop === "$transaction") {
              return async (fn: (client: Prisma.TransactionClient) => Promise<any>) => {
                return fn(target);
              };
            }
            return target[prop as keyof typeof target];
          },
        }) as FlatTransactionClient;
      }

      throw new Error("Transactions are not supported by this client");
    },
  },
});

async function main() {
  const tx = await prisma.$begin();
  const user = await tx.user.findFirstOrThrow();

  const tx2 = await prisma.$begin();
  await tx2.user.findMany();

  await tx.user.update({
    where: { id: user.id },
    data: { firstName: `${user.firstName} II` },
  });
  await tx.$commit();

  await tx2.user.count();
  await tx2.$commit();
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
