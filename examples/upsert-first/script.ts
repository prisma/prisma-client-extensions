import * as runtime from "@prisma/client/runtime/index";
import { Prisma, PrismaClient } from "@prisma/client";

/**
 * User upsertFirst
 */
export type UserUpsertFirstArgs<
  ExtArgs extends runtime.Types.Extensions.Args = runtime.Types.Extensions.DefaultArgs
> = {
  /**
   * Select specific fields to fetch from the User
   *
   **/
  select?: Prisma.UserSelect<ExtArgs> | null;
  /**
   * The filter to search for the User to update in case it exists.
   *
   **/
  where: Prisma.UserWhereInput;
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
   *
   **/
  create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
   *
   **/
  update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
new PrismaClient().$extends();

type Config<TypeMap> = {
  models: TypeMap extends Record<
    infer Model,
    {
      update: { args: { where: infer WhereUniqueInput }; result: infer Result };
    }
  >
    ? { [K in Model]?: (object: Result) => WhereUniqueInput }
    : never;
};

type Foo = Config<Prisma.TypeMap>;

function upsertFirst<T>({ models }: Config<T>) {
  return Prisma.defineExtension((prisma) => {});
}

const upsertirst = Prisma.defineExtension((prisma) => {
  type ExtArgs = typeof prisma["$extends"]["extArgs"];

  return prisma.$extends({
    model: {
      user: {
        async upsertFirst<T extends UserUpsertFirstArgs<ExtArgs>>(
          args: Prisma.SelectSubset<T, UserUpsertFirstArgs<ExtArgs>>
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

type foo = {
  datamodel: {
    enums: [
      {
        name: "TaskStatus";
        values: [
          { name: "Pending"; dbName: null },
          { name: "InProgress"; dbName: null },
          { name: "Complete"; dbName: null },
          { name: "WontDo"; dbName: null }
        ];
        dbName: null;
      }
    ];
    models: [
      {
        name: "Company";
        dbName: null;
        fields: [
          {
            name: "id";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: true;
            isReadOnly: false;
            hasDefaultValue: true;
            type: "String";
            default: { name: "dbgenerated"; args: ["gen_random_uuid()"] };
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "name";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "String";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "users";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "User";
            relationName: "CompanyToUser";
            relationFromFields: [];
            relationToFields: [];
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "projects";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Project";
            relationName: "CompanyToProject";
            relationFromFields: [];
            relationToFields: [];
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "tasks";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Task";
            relationName: "CompanyToTask";
            relationFromFields: [];
            relationToFields: [];
            isGenerated: false;
            isUpdatedAt: false;
          }
        ];
        primaryKey: null;
        uniqueFields: [];
        uniqueIndexes: [];
        isGenerated: false;
      },
      {
        name: "User";
        dbName: null;
        fields: [
          {
            name: "id";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: true;
            isReadOnly: false;
            hasDefaultValue: true;
            type: "String";
            default: { name: "dbgenerated"; args: ["gen_random_uuid()"] };
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "companyId";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: true;
            hasDefaultValue: true;
            type: "String";
            default: {
              name: "dbgenerated";
              args: ["(current_setting('app.current_company_id'::text))::uuid"];
            };
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "email";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: true;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "String";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "company";
            kind: "object";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Company";
            relationName: "CompanyToUser";
            relationFromFields: ["companyId"];
            relationToFields: ["id"];
            relationOnDelete: "Cascade";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "ownedProjects";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Project";
            relationName: "ProjectToUser";
            relationFromFields: [];
            relationToFields: [];
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "assignedTasks";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Task";
            relationName: "TaskToUser";
            relationFromFields: [];
            relationToFields: [];
            isGenerated: false;
            isUpdatedAt: false;
          }
        ];
        primaryKey: null;
        uniqueFields: [];
        uniqueIndexes: [];
        isGenerated: false;
      },
      {
        name: "Project";
        dbName: null;
        fields: [
          {
            name: "id";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: true;
            isReadOnly: false;
            hasDefaultValue: true;
            type: "String";
            default: { name: "dbgenerated"; args: ["gen_random_uuid()"] };
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "companyId";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: true;
            hasDefaultValue: true;
            type: "String";
            default: {
              name: "dbgenerated";
              args: ["(current_setting('app.current_company_id'::text))::uuid"];
            };
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "userId";
            kind: "scalar";
            isList: false;
            isRequired: false;
            isUnique: false;
            isId: false;
            isReadOnly: true;
            hasDefaultValue: false;
            type: "String";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "title";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "String";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "company";
            kind: "object";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Company";
            relationName: "CompanyToProject";
            relationFromFields: ["companyId"];
            relationToFields: ["id"];
            relationOnDelete: "Cascade";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "owner";
            kind: "object";
            isList: false;
            isRequired: false;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "User";
            relationName: "ProjectToUser";
            relationFromFields: ["userId"];
            relationToFields: ["id"];
            relationOnDelete: "SetNull";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "tasks";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Task";
            relationName: "ProjectToTask";
            relationFromFields: [];
            relationToFields: [];
            isGenerated: false;
            isUpdatedAt: false;
          }
        ];
        primaryKey: null;
        uniqueFields: [];
        uniqueIndexes: [];
        isGenerated: false;
      },
      {
        name: "Task";
        dbName: null;
        fields: [
          {
            name: "id";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: true;
            isReadOnly: false;
            hasDefaultValue: true;
            type: "String";
            default: { name: "dbgenerated"; args: ["gen_random_uuid()"] };
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "companyId";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: true;
            hasDefaultValue: true;
            type: "String";
            default: {
              name: "dbgenerated";
              args: ["(current_setting('app.current_company_id'::text))::uuid"];
            };
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "projectId";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: true;
            hasDefaultValue: false;
            type: "String";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "userId";
            kind: "scalar";
            isList: false;
            isRequired: false;
            isUnique: false;
            isId: false;
            isReadOnly: true;
            hasDefaultValue: false;
            type: "String";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "title";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "String";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "status";
            kind: "enum";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "TaskStatus";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "company";
            kind: "object";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Company";
            relationName: "CompanyToTask";
            relationFromFields: ["companyId"];
            relationToFields: ["id"];
            relationOnDelete: "Cascade";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "project";
            kind: "object";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Project";
            relationName: "ProjectToTask";
            relationFromFields: ["projectId"];
            relationToFields: ["id"];
            relationOnDelete: "Cascade";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "assignee";
            kind: "object";
            isList: false;
            isRequired: false;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "User";
            relationName: "TaskToUser";
            relationFromFields: ["userId"];
            relationToFields: ["id"];
            relationOnDelete: "SetNull";
            isGenerated: false;
            isUpdatedAt: false;
          }
        ];
        primaryKey: null;
        uniqueFields: [];
        uniqueIndexes: [];
        isGenerated: false;
      }
    ];
    types: [];
  };
  mappings: {
    modelOperations: [
      {
        model: "Company";
        plural: "companies";
        findUnique: "findUniqueCompany";
        findUniqueOrThrow: "findUniqueCompanyOrThrow";
        findFirst: "findFirstCompany";
        findFirstOrThrow: "findFirstCompanyOrThrow";
        findMany: "findManyCompany";
        create: "createOneCompany";
        createMany: "createManyCompany";
        delete: "deleteOneCompany";
        update: "updateOneCompany";
        deleteMany: "deleteManyCompany";
        updateMany: "updateManyCompany";
        upsert: "upsertOneCompany";
        aggregate: "aggregateCompany";
        groupBy: "groupByCompany";
      },
      {
        model: "User";
        plural: "users";
        findUnique: "findUniqueUser";
        findUniqueOrThrow: "findUniqueUserOrThrow";
        findFirst: "findFirstUser";
        findFirstOrThrow: "findFirstUserOrThrow";
        findMany: "findManyUser";
        create: "createOneUser";
        createMany: "createManyUser";
        delete: "deleteOneUser";
        update: "updateOneUser";
        deleteMany: "deleteManyUser";
        updateMany: "updateManyUser";
        upsert: "upsertOneUser";
        aggregate: "aggregateUser";
        groupBy: "groupByUser";
      },
      {
        model: "Project";
        plural: "projects";
        findUnique: "findUniqueProject";
        findUniqueOrThrow: "findUniqueProjectOrThrow";
        findFirst: "findFirstProject";
        findFirstOrThrow: "findFirstProjectOrThrow";
        findMany: "findManyProject";
        create: "createOneProject";
        createMany: "createManyProject";
        delete: "deleteOneProject";
        update: "updateOneProject";
        deleteMany: "deleteManyProject";
        updateMany: "updateManyProject";
        upsert: "upsertOneProject";
        aggregate: "aggregateProject";
        groupBy: "groupByProject";
      },
      {
        model: "Task";
        plural: "tasks";
        findUnique: "findUniqueTask";
        findUniqueOrThrow: "findUniqueTaskOrThrow";
        findFirst: "findFirstTask";
        findFirstOrThrow: "findFirstTaskOrThrow";
        findMany: "findManyTask";
        create: "createOneTask";
        createMany: "createManyTask";
        delete: "deleteOneTask";
        update: "updateOneTask";
        deleteMany: "deleteManyTask";
        updateMany: "updateManyTask";
        upsert: "upsertOneTask";
        aggregate: "aggregateTask";
        groupBy: "groupByTask";
      }
    ];
    otherOperations: { read: []; write: ["executeRaw", "queryRaw"] };
  };
};
