import { PrismaClient } from "@prisma/client";
import { performance } from "perf_hooks";
import * as util from "util";

const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        const start = performance.now();
        const result = await query(args);
        const end = performance.now();
        const time = end - start;
        console.log(
          util.inspect(
            { model, operation, args, time },
            { showHidden: false, depth: null, colors: true }
          )
        );
        return result;
      },
    },
  },
});

async function main() {
  await prisma.user.findMany({
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    take: 5,
  });

  await prisma.user.groupBy({ by: ["lastName"], _count: true });
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
