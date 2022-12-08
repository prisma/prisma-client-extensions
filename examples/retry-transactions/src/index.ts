import { backOff, IBackOffOptions } from "exponential-backoff";
import { Prisma, PrismaClient } from "./generated/client";

function RetryTransactions(options?: Partial<IBackOffOptions>) {
  return Prisma.defineExtension((prisma) =>
    prisma.$extends({
      name: "retry-transactions",
      client: {
        $transaction(...args: any) {
          return backOff(() => prisma.$transaction.apply(prisma, args), {
            retry: (e) => e.code === "P2034",
            ...options,
          });
        },
      } as { $transaction: typeof prisma["$transaction"] },
    })
  );
}

const prisma = new PrismaClient().$extends(
  RetryTransactions({
    jitter: "full",
    numOfAttempts: 5,
  })
);

async function main() {
  const before = await prisma.user.findFirstOrThrow();
  console.log("Before: ", before);

  await Promise.allSettled([
    firstTransaction(before.id),
    secondTransaction(before.id),
  ]);

  const after = await prisma.user.findUniqueOrThrow({
    where: { id: before.id },
  });
  console.log("After: ", after);
}

// Runs a read-modify-write transaction, where the "modify" step takes 2000ms,
// enough time for the second transaction to cause a serialization failure
async function firstTransaction(id: string) {
  await prisma.$transaction(
    async (tx) => {
      try {
        // Read
        const user = await tx.user.findUniqueOrThrow({ where: { id } });
        // "Modify"
        await sleep(2000);
        // Write
        await tx.user.update({ where: { id }, data: { firstName: "Albert" } });
      } catch (e) {
        console.log("First transaction failed");
        throw e;
      }
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
  );
  console.log("First transaction committed");
}

// Waits 1000ms, then writes to the database, causing a conflict with the first transaction
async function secondTransaction(id: string) {
  await sleep(1000);

  await prisma.$transaction(
    async (tx) => {
      try {
        await tx.user.update({ where: { id }, data: { firstName: "Beto" } });
      } catch (e) {
        console.log("Second transaction failed");
        throw e;
      }
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
  );

  console.log("Second transaction committed");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
