# Prisma Client Extension - Row Level Security

This example shows how to use a Prisma Client extension to isolate data between tenants in a multi-tenant app using Row Level Security (RLS) in Postgres.

## Caveats

> **NOTE**: Because this example extension wraps every query in a new batch transaction, explicitly running transactions with `companyPrisma.$transaction()` may not work as intended. In a future version of Prisma Client, `query` extensions will have access to information about whether they are run inside a transaction, similar to [the `runInTransaction` parameter provided to Prisma middleware](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#params). When this is available, this example will be updated to work for queries run inside explicit transactions.

Prisma Client extensions are currently in developer preview. This extension is provided as an example only. It is not intended to be used in production environments.

Please read [the documentation on `query` extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions/query) for more information.

## Background

In a multi-tenant application, the data for multiple tenants (customers, companies, users, etc) is stored in a shared database. This approach can reduce costs and simplify infrastructure. However, it is important to ensure that the data for separate tenants is isolated, so that users can not view or modify another customer's data.

The AWS blog post, ["Multi-tenant data isolation with PostgreSQL Row Level Security"](https://aws.amazon.com/blogs/database/multi-tenant-data-isolation-with-postgresql-row-level-security/) describes two approaches to using Row Level Security in Postgres to isolate data in a multi-tenant app. This example uses the "Alternative approach" described in the article, using a Postgres runtime parameter to set the current tenant ID, which is referenced in table security policies. This approach allows the application to use a shared connection pool, rather than creating a new database connection for each tenant.

## How it works

There are a few steps required to set up Row Level Security in Postgres and then use it in Prisma:

### 1. Create a database user with limited permissions

Superusers and roles with the `BYPASSRLS` attribute always bypass the row security system in Postgres. Your application should connect to the database as a user with limited permissions that do not allow bypassing RLS. In this example, the database is defined by extending the `postgres` image in [a custom `Dockerfile`](docker/Dockerfile), which adds [a shell script under `/docker-entrypoint-initdb.d/init-app-db.sh`](docker/init-app-db.sh) to create a new database user and database.

### 2. Enable Row Level Security on tables you want to secure

Create [a custom migration file](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/customizing-migrations) that includes SQL commands to enable Row Level Security for each table you want to secure. See [this migration file](prisma/migrations/20221211203153_row_level_security/migration.sql), where the following commands are run for each table:

```sql
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;
```

The first command (`ENABLE ROW LEVEL SECURITY`) tells Postgres to deny access to the table's rows for `SELECT`, `INSERT`, `UPDATE`, or `DELETE` commands, except for rows that are allowed by a row security policy on the table.

The second command (`FORCE ROW LEVEL SECURITY`) tells Postgres to apply row level security even for the table's owner, which normally bypasses row security policies. This is important if the database user that you run migrations with is the same user that your application uses to connect to the database.

### 3. Create row security policies for each table that has RLS enabled

Enabling Row Level Security on a table creates a default-deny policy, meaning no rows on the table are visible or can be modified. To allow access to the table, you must define one or more row security policies that define the conditions when access is allowed. In the same migration file as above, a row security policy is defined for each table as follows:

```sql
CREATE POLICY tenant_isolation_policy ON "User" USING ("companyId" = current_setting('app.current_company_id', TRUE)::uuid);
```

This policy tells Postgres to allow a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` on rows where the `"companyId"` column matches the runtime parameter named `app.current_company_id`, which we will set at runtime in a Prisma Client extension.

### 4. Create row security policies to bypass RLS (optional)

Your application may need to run queries that bypass RLS. Examples might include looking up the current user to determine their tenant ID, admin page queries, or aggregations across multiple tenants.

One option is to run these queries with a database user that has a role with the `BYPASSRLS` attribute. However, this requires managing multiple different database connection pools. Another option is to add policies that allow access to all rows when a certain runtime parameter is set:

```sql
CREATE POLICY bypass_rls_policy ON "User" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
```

This policy and the previous policy are both "permissive" policies by default, meaning Postgres combines them with an `OR` condition. To access a row in this table, either the `"companyId"` column must match the `app.current_company_id` setting, OR the `app.bypass_rls` setting must be set to the string `'on'`.

### 5. Set default values for columns associated with row security policies (optional)

You might want to automatically populate columns associated with row level security policies. In the [Prisma schema file](prisma/schema.prisma) for this example, we set default values for the `companyId` columns, so that the default value for these columns can be inferred from the same runtime parameter used in the row security policy:

```prisma
model User {
  // ...
  companyId String @default(dbgenerated("(current_setting('app.current_company_id'::text))::uuid")) @db.Uuid
  // ...
}
```

Setting a default value in the Prisma schema allows us to omit the value when creating a row in Prisma Client queries. An `INSERT` command will only succeed in the following scenarios:

- The `companyId` is omitted, but the `app.current_company_id` setting is set
- A `companyId` is provided, and it matches the `app.current_company_id` setting
- A `companyId` is provided, and the `app.bypass_rls` is set to `'on'`

### 6. Create a Prisma Client extension that wraps queries in a transaction and sets the RLS runtime parameter(s)

In order to set a runtime parameter in Postgres, you can execute a raw query with Prisma:

```typescript
await prisma.$executeRaw`SELECT set_config('app.current_company_id', ${companyId}, TRUE)`;
```

However, each time you run a query, Prisma may use a different connection from the connection pool. In order to associate the parameter with all of the queries in the context of a given request in your application, you should:

1. Start a transaction.
2. Set the runtime parameter as a `LOCAL` setting, which lasts only until the end of the current transaction. This may be done by passing `TRUE` to the third argument (`is_local`) of the `set_config()` function.
3. Run all queries for the duration of the request inside this transaction.

All queries for a given transaction will use the same database connection, and because the setting is local, it won't affect any other transactions.

Prisma Client extensions provide a way to easily ensure all queries run inside a transaction with a setting enabled for RLS. See [the `script.ts` file](script.ts) for an example extension, which allows you to create RLS-enabled client instances:

```typescript
const companyPrisma = prisma.forCompany(companyId);

const projects = await companyPrisma.project.findMany();
```

## How to use

### Prerequisites

- Install [Node.js](https://nodejs.org/en/download/)
- Install [Docker](https://docs.docker.com/get-docker/)

### 1. Download example & install dependencies

Clone this repository:

```sh
git clone git@github.com:sbking/prisma-client-extensions.git
```

Create a `.env` file and install dependencies:

```sh
cd row-level-security
cp .env.example .env
npm install
```

### 2. Start the database

Run the following command to start a new Postgres database in a Docker container:

```sh
docker compose up -d
```

### 3. Run migrations

Run this command to apply migrations to the database:

```sh
npx prisma migrate deploy
```

### 4. Seed the database

Run the following command to add seed data to the database:

```sh
npx prisma db seed
```

### 5. Run the `dev` script

To run the `script.ts` file, run the following command:

```sh
npm run dev
```
