import * as runtime from "@prisma/client/runtime/index";
import { Prisma, PrismaClient } from "@prisma/client";

export type UpsertFirstArgs<T extends TypeMap, K extends keyof T> = {
  select?: T[K]["findFirst"]["args"]["select"];
  where?: T[K]["findFirst"]["args"]["where"];
  orderBy?: T[K]["findFirst"]["args"]["orderBy"];
  cursor?: T[K]["findFirst"]["args"]["cursor"];
  take?: T[K]["findFirst"]["args"]["take"];
  skip?: T[K]["findFirst"]["args"]["skip"];
  distinct?: T[K]["findFirst"]["args"]["distinct"];
  create: T[K]["upsert"]["args"]["create"];
  update: T[K]["upsert"]["args"]["update"];
};

type TypeMap = Record<
  string,
  {
    findFirst: {
      args: {
        select: any;
        where: any;
        orderBy: any;
        cursor: any;
        take: any;
        skip: any;
        distinct: any;
      };
      result: any;
    };
    update: {
      args: {
        where: any;
      };
      result: any;
    };
    upsert: {
      args: {
        select: any;
        create: any;
        update: any;
      };
      result: any;
    };
  }
>;

type UpsertFirstConfig<T extends TypeMap> = {
  models: {
    [K in keyof T]?: (
      object: T[K]["findFirst"]["result"]
    ) => T[K]["update"]["args"]["where"];
  };
};

type SelectAndInclude = {
  select: any;
  include: any;
};

/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude
  ? "Please either choose `select` or `include`."
  : {});

type UpsertFirstExtArgs<Config> = Config extends UpsertFirstConfig<
  infer TypeMap
>
  ? {
      model: {
        [K in keyof Config]: {};
      };
    }
  : never;

function upsertFirst<TM extends TypeMap, C extends UpsertFirstConfig<TM>>(
  config: C
) {
  const model = {} as {
    [K in keyof C]: K extends keyof TM
      ? {
          upsertFirst: <T extends UpsertFirstArgs<TM, K>>(
            args: SelectSubset<T, UpsertFirstArgs<TM, K>>
          ) => string;
        }
      : never;
  };

  return Prisma.defineExtension((prisma) =>
    prisma.$extends({
      model: Object.fromEntries(
        Object.entries(config.models).map(([model, getId]) => [
          model,
          {
            async upsertFirst(args) {},
          },
        ])
      ),
    })
  );
}

const upsertFrst = Prisma.defineExtension((prisma) => {
  type ExtArgs = typeof prisma["$extends"]["extArgs"];

  return prisma.$extends({
    model: {
      user: {
        async upsertFirst<T extends UserUpsertFirstArgs<ExtArgs>>(
          args: SelectSubset<T, UserUpsertFirstArgs<ExtArgs>>
        ) {
          const found = await prisma.user.findFirst({ where: args.where });

          if (found) {
            return (await prisma.user.update({
              where: {
                companyId_id: {
                  companyId: found.companyId,
                  id: found.id,
                },
              },
              select: args.select,
              data: args.update,
            })) as unknown as Prisma.UserGetPayload<T, ExtArgs>;
          }

          return (await prisma.user.create({
            select: args.select,
            data: args.create,
          })) as unknown as Prisma.UserGetPayload<T, ExtArgs>;
        },
      },
    },
  });
});

console.log(Prisma);

const prisma = new PrismaClient().$extends(upsertFirst);

async function main() {
  const P = Prisma;
  const user = await prisma.user.upsertFirst({
    select: { email: true },
    where: { firstName: { startsWith: "A" } },
    create: { email: "foo@example.com", firstName: "Foo", lastName: "Bar" },
    update: { firstName: "Foo" },
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
