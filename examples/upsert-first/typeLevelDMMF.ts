interface ScalarType {
  String: string;
  Int: number;
  BigInt: bigint;
  Boolean: boolean;
  DateTime: Date;
}

interface ScalarFilterType {
  String: StringFilter;
  Int: IntFilter;
  BigInt: BigIntFilter;
  Boolean: BoolFilter;
  DateTime: DateTimeFilter;
}

export declare const QueryMode: {
  default: "default";
  insensitive: "insensitive";
};

export type QueryMode = typeof QueryMode[keyof typeof QueryMode];

export type DateTimeFilter = {
  equals?: Date | string;
  in?: Enumerable<Date> | Enumerable<string>;
  notIn?: Enumerable<Date> | Enumerable<string>;
  lt?: Date | string;
  lte?: Date | string;
  gt?: Date | string;
  gte?: Date | string;
  not?: NestedDateTimeFilter | Date | string;
};

export type NestedDateTimeFilter = {
  equals?: Date | string;
  in?: Enumerable<Date> | Enumerable<string>;
  notIn?: Enumerable<Date> | Enumerable<string>;
  lt?: Date | string;
  lte?: Date | string;
  gt?: Date | string;
  gte?: Date | string;
  not?: NestedDateTimeFilter | Date | string;
};

export type UuidFilter = {
  equals?: string;
  in?: Enumerable<string>;
  notIn?: Enumerable<string>;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  mode?: QueryMode;
  not?: NestedUuidFilter | string;
};

export type NestedUuidFilter = {
  equals?: string;
  in?: Enumerable<string>;
  notIn?: Enumerable<string>;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  not?: NestedUuidFilter | string;
};

export type StringFilter = {
  equals?: string;
  in?: Enumerable<string>;
  notIn?: Enumerable<string>;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: QueryMode;
  not?: NestedStringFilter | string;
};

export type NestedStringFilter = {
  equals?: string;
  in?: Enumerable<string>;
  notIn?: Enumerable<string>;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringFilter | string;
};

export type IntFilter = {
  equals?: number;
  in?: Enumerable<number>;
  notIn?: Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | number;
};

export type NestedIntFilter = {
  equals?: number;
  in?: Enumerable<number>;
  notIn?: Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | number;
};

export type BoolFilter = {
  equals?: boolean;
  not?: NestedBoolFilter | boolean;
};

export type NestedBoolFilter = {
  equals?: boolean;
  not?: NestedBoolFilter | boolean;
};

export type BigIntFilter = {
  equals?: bigint | number;
  in?: Enumerable<bigint> | Enumerable<number>;
  notIn?: Enumerable<bigint> | Enumerable<number>;
  lt?: bigint | number;
  lte?: bigint | number;
  gt?: bigint | number;
  gte?: bigint | number;
  not?: NestedBigIntFilter | bigint | number;
};

export type NestedBigIntFilter = {
  equals?: bigint | number;
  in?: Enumerable<bigint> | Enumerable<number>;
  notIn?: Enumerable<bigint> | Enumerable<number>;
  lt?: bigint | number;
  lte?: bigint | number;
  gt?: bigint | number;
  gte?: bigint | number;
  not?: NestedBigIntFilter | bigint | number;
};

type Enumerable<T> = T | Array<T>;

type Enum = {
  [E in DMMFEnum as E["name"]]: E["values"][number]["name"];
};

type Model = {
  [M in DMMFModel as M["name"]]: {
    [F in DMMFGetScalarFields<M> as F["name"]]: DMMFGetScalarFieldType<F>;
  };
};

type ModelSelectScalar = {
  [M in DMMFModel as M["name"]]: {
    [F in DMMFGetScalarFields<M> as F["name"]]?: boolean;
  };
};

type ModelSelect = {
  [M in DMMFModel as M["name"]]: {
    [F in DMMFGetObjectFields<M> as F["name"]]?: boolean | ModelArgs[F["type"]];
  } & ModelSelectScalar[M["name"]];
};

type ModelInclude = {
  [M in DMMFModel as M["name"]]: {
    [F in DMMFGetObjectFields<M> as F["name"]]?: boolean | ModelArgs[F["type"]];
  };
};

type ModelFindUniqueArgs = {
  [M in DMMFModel as M["name"]]: {
    select?: ModelSelect[M["name"]] | null;
    include?: ModelInclude[M["name"]] | null;
  };
};

type ModelFindManyArgs = {
  [M in DMMFModel as M["name"]]: {
    select?: ModelSelect[M["name"]] | null;
    include?: ModelInclude[M["name"]] | null;
    take?: number;
    skip?: number;
  };
};

type ModelArgs = {
  [M in DMMFModel as M["name"]]: {
    select?: ModelSelect[M["name"]] | null;
    include?: ModelInclude[M["name"]] | null;
  };
};

type ModelWhereInput = {
  [M in DMMFModel as M["name"]]: {
    [F in DMMFGetScalarFields<M> as F["name"]]?: boolean;
  } & {
    AND?: Enumerable<ModelWhereInput[M["name"]]>;
    OR?: Enumerable<ModelWhereInput[M["name"]]>;
    NOT?: Enumerable<ModelWhereInput[M["name"]]>;
  };
};

export type EnumName = keyof Enum;

export declare const ModelName: { [K in ModelName]: K };
export type ModelName = keyof Model;

export type Company = Model["Company"];
export type User = Model["User"];
export type Profile = Model["Profile"];
export type Team = Model["Team"];
export type Ownership = Model["Ownership"];
export type Project = Model["Project"];
export type Task = Model["Task"];
export type Attribute = Model["Attribute"];

export declare const TaskStatus: { [K in TaskStatus]: K };
export type TaskStatus = Enum["TaskStatus"];

export type DMMFEnum = DMMF["datamodel"]["enums"][number];
export type DMMFModel = DMMF["datamodel"]["models"][number];
export type DMMFModelField = DMMFModel["fields"][number];
export type DMMFModelScalarField = Extract<DMMFModelField, { kind: "scalar" }>;

export type DMMFGetScalarFields<M extends DMMFModel> = Extract<
  M["fields"][number],
  { kind: "scalar" }
>;

export type DMMFGetObjectFields<M extends DMMFModel> = Extract<
  M["fields"][number],
  { kind: "object" }
>;

export type DMMFGetScalarFieldType<F extends DMMFModelScalarField> =
  F["isList"] extends true
    ? ScalarType[F["type"]][]
    : F["isRequired"] extends true
    ? ScalarType[F["type"]]
    : ScalarType[F["type"]] | null;

export type DMMF = {
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
          },
          {
            name: "team";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Team";
            relationName: "CompanyToTeam";
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
            name: "profile";
            kind: "object";
            isList: false;
            isRequired: false;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Profile";
            relationName: "ProfileToUser";
            relationFromFields: [];
            relationToFields: [];
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
          },
          {
            name: "teams";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Team";
            relationName: "TeamToUser";
            relationFromFields: [];
            relationToFields: ["id"];
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "ledTeams";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Team";
            relationName: "leader";
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
        name: "Profile";
        dbName: null;
        fields: [
          {
            name: "user";
            kind: "object";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "User";
            relationName: "ProfileToUser";
            relationFromFields: ["userId"];
            relationToFields: ["id"];
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "userId";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: true;
            isId: false;
            isReadOnly: true;
            hasDefaultValue: false;
            type: "String";
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
        name: "Team";
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
            name: "leaderId";
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
            name: "company";
            kind: "object";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Company";
            relationName: "CompanyToTeam";
            relationFromFields: ["companyId"];
            relationToFields: ["id"];
            relationOnDelete: "Cascade";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "leader";
            kind: "object";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "User";
            relationName: "leader";
            relationFromFields: ["leaderId"];
            relationToFields: ["id"];
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "members";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "User";
            relationName: "TeamToUser";
            relationFromFields: [];
            relationToFields: ["id"];
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
            type: "Ownership";
            relationName: "OwnershipToTeam";
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
        name: "Ownership";
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
            name: "teamId";
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
            name: "effectiveAt";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "DateTime";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "effectiveUntil";
            kind: "scalar";
            isList: false;
            isRequired: false;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "DateTime";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "team";
            kind: "object";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Team";
            relationName: "OwnershipToTeam";
            relationFromFields: ["teamId"];
            relationToFields: ["id"];
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
            relationName: "OwnershipToProject";
            relationFromFields: ["projectId"];
            relationToFields: ["id"];
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
          },
          {
            name: "teams";
            kind: "object";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Ownership";
            relationName: "OwnershipToProject";
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
            name: "isComplete";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Boolean";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "size";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "Int";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "bigSize";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "BigInt";
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
      },
      {
        name: "Attribute";
        dbName: null;
        fields: [
          {
            name: "serial";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: true;
            type: "Int";
            default: { name: "autoincrement"; args: [] };
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "uuid";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: true;
            type: "String";
            default: { name: "dbgenerated"; args: ["gen_random_uuid()"] };
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "createdAt";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "DateTime";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "stringValue";
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
            name: "stringOptional";
            kind: "scalar";
            isList: false;
            isRequired: false;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: false;
            type: "String";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "stringList";
            kind: "scalar";
            isList: true;
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
            name: "stringDefault";
            kind: "scalar";
            isList: false;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: true;
            type: "String";
            default: "foo";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "stringOptionalDefault";
            kind: "scalar";
            isList: false;
            isRequired: false;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: true;
            type: "String";
            default: "foo";
            isGenerated: false;
            isUpdatedAt: false;
          },
          {
            name: "stringListDefault";
            kind: "scalar";
            isList: true;
            isRequired: true;
            isUnique: false;
            isId: false;
            isReadOnly: false;
            hasDefaultValue: true;
            type: "String";
            default: ["foo", "bar"];
            isGenerated: false;
            isUpdatedAt: false;
          }
        ];
        primaryKey: { name: null; fields: ["serial", "uuid"] };
        uniqueFields: [["serial", "createdAt"]];
        uniqueIndexes: [{ name: null; fields: ["serial", "createdAt"] }];
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
        model: "Profile";
        plural: "profiles";
        findUnique: "findUniqueProfile";
        findUniqueOrThrow: "findUniqueProfileOrThrow";
        findFirst: "findFirstProfile";
        findFirstOrThrow: "findFirstProfileOrThrow";
        findMany: "findManyProfile";
        create: "createOneProfile";
        createMany: "createManyProfile";
        delete: "deleteOneProfile";
        update: "updateOneProfile";
        deleteMany: "deleteManyProfile";
        updateMany: "updateManyProfile";
        upsert: "upsertOneProfile";
        aggregate: "aggregateProfile";
        groupBy: "groupByProfile";
      },
      {
        model: "Team";
        plural: "teams";
        findUnique: "findUniqueTeam";
        findUniqueOrThrow: "findUniqueTeamOrThrow";
        findFirst: "findFirstTeam";
        findFirstOrThrow: "findFirstTeamOrThrow";
        findMany: "findManyTeam";
        create: "createOneTeam";
        createMany: "createManyTeam";
        delete: "deleteOneTeam";
        update: "updateOneTeam";
        deleteMany: "deleteManyTeam";
        updateMany: "updateManyTeam";
        upsert: "upsertOneTeam";
        aggregate: "aggregateTeam";
        groupBy: "groupByTeam";
      },
      {
        model: "Ownership";
        plural: "ownerships";
        findUnique: "findUniqueOwnership";
        findUniqueOrThrow: "findUniqueOwnershipOrThrow";
        findFirst: "findFirstOwnership";
        findFirstOrThrow: "findFirstOwnershipOrThrow";
        findMany: "findManyOwnership";
        create: "createOneOwnership";
        createMany: "createManyOwnership";
        delete: "deleteOneOwnership";
        update: "updateOneOwnership";
        deleteMany: "deleteManyOwnership";
        updateMany: "updateManyOwnership";
        upsert: "upsertOneOwnership";
        aggregate: "aggregateOwnership";
        groupBy: "groupByOwnership";
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
      },
      {
        model: "Attribute";
        plural: "attributes";
        findUnique: "findUniqueAttribute";
        findUniqueOrThrow: "findUniqueAttributeOrThrow";
        findFirst: "findFirstAttribute";
        findFirstOrThrow: "findFirstAttributeOrThrow";
        findMany: "findManyAttribute";
        create: "createOneAttribute";
        createMany: "createManyAttribute";
        delete: "deleteOneAttribute";
        update: "updateOneAttribute";
        deleteMany: "deleteManyAttribute";
        updateMany: "updateManyAttribute";
        upsert: "upsertOneAttribute";
        aggregate: "aggregateAttribute";
        groupBy: "groupByAttribute";
      }
    ];
    otherOperations: { read: []; write: ["executeRaw", "queryRaw"] };
  };
};
