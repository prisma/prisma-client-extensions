import { Prisma, PrismaClient, TaskStatus } from "@prisma/client";
import { extractPreviewFeatures, getConfig, getDMMF } from "@prisma/internals";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const datamodel = fs.readFileSync("prisma/schema.prisma", "utf-8");
  const config = await getConfig({ datamodel, ignoreEnvVarErrors: true });
  const previewFeatures = extractPreviewFeatures(config);
  const dmmf = await getDMMF({
    datamodel,
    previewFeatures,
  });
  await fs.writeFileSync("dmmf.json", JSON.stringify(dmmf, null, 2));
}

function invariant<T>(condition: T): asserts condition {
  if (!condition) throw new Error("Invariant failed");
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
