# Prisma Client Extension - Audit Log Context

This example shows how to use a Prisma Client extension to provide the current application user's ID as context to an audit log trigger in Postgres. User IDs are included in an audit trail tracking every change to rows on certain tables.

## Caveats

> **NOTE**: Because this example extension wraps every query in a new batch transaction, explicitly running transactions with `prisma.$transaction()` may not work as intended. In a future version of Prisma Client, `query` extensions will have access to information about whether they are run inside a transaction, similar to [the `runInTransaction` parameter provided to Prisma middleware](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#params). When this is available, this example will be updated to work for queries run inside explicit transactions.

Prisma Client extensions are currently in developer preview. This extension in is provided as an example only. It is not intended to be used in production environments.

Please read [the documentation on `query` extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions/query) for more information.

## Background

Certain applications need to track changes to data over time and generate an audit trail to record which user made each change. One approach is to store this audit log in one or more tables in the same database and populate the audit log automatically with database triggers.

In order to provide information about the current user and/or session, it is possible to set a runtime parameter in Postgres and reference it from a trigger.

## How it works

There are a few steps required to set up an audit table in Postgres and then provide session context to it from Prisma:

### 1. Create one or more tables to store audit logs

There is more than one way to structure audit log tables. For example, you might create a single audit log table which tracks changes to various other tables. In this case, you could include `text` columns that track the base table's schema and name, as well as a `json` column which contains the actual data for each modification.

In this example, we create a separate "`Version`" table for each base table that needs an audit log. These tables contain columns that mirror all of the columns on the base table, as well as a few extra columns that contain metadata about each version:

- `versionId`: The primary key of the version table — a unique value for each version of each row in the base table
- `versionOperation`: Tracks whether the modification was a `CREATE`, `UPDATE`, or `DELETE` command
- `version<ModelName>Id`: The ID of the row in the base table. This is a nullable foreign key to the base table for rows that still exist, but can be `NULL` for deleted rows. The deleted row IDs are tracked in the mirrored `id` column.
- `versionUserId`: The ID of the user who made the modification, provided as context by the application
- `versionTimestamp`: When the modification was made

There are benefits and drawbacks to each way to model audit log tables, but the general approach for including session context is the same.

> **NOTE**: This example also uses the [`multiSchema` preview feature](https://www.prisma.io/docs/guides/database/multi-schema) for Postgres in order to store audit tables in a separate `audit` schema.

### 2. Create audit log triggers

Create [a custom migration file](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/customizing-migrations) that includes SQL commands to create audit triggers for operations on the base tables. See [this migration file](prisma/migrations/20221208205006_audit_triggers/migration.sql), which includes a trigger for each table that needs to be audited:

```sql
CREATE OR REPLACE FUNCTION "audit"."Product_audit"() RETURNS TRIGGER AS $$
    BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO "audit"."ProductVersion"
            VALUES (DEFAULT, 'DELETE', NULL, current_setting('app.current_user_id', TRUE)::int, now(), OLD.*);
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO "audit"."ProductVersion"
            VALUES (DEFAULT, 'UPDATE', NEW."id", current_setting('app.current_user_id', TRUE)::int, now(), NEW.*);
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO "audit"."ProductVersion"
            VALUES (DEFAULT, 'INSERT', NEW."id", current_setting('app.current_user_id', TRUE)::int, now(), NEW.*);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit
AFTER INSERT OR UPDATE OR DELETE ON "public"."Product"
    FOR EACH ROW EXECUTE FUNCTION "audit"."Product_audit"();
```

These triggers create a row in a `Version` table for every row affected by an `INSERT`, `UPDATE`, or `DELETE` command on the base table. They set the `versionUserId` column to the result of calling `current_setting('app.current_user_id', TRUE)::int`, which gets a runtime parameter named `app.current_user_id` that we'll set via a Prisma Client extension.

### 3. Create a Prisma Client extension that wraps queries in a transaction and sets the audit log session context

In order to set a runtime parameter in Postgres, you can execute a raw query with Prisma:

```typescript
await prisma.$executeRaw`SELECT set_config('app.current_user_id', ${user}, TRUE)`;
```

However, each time you run a query, Prisma may use a different connection from the connection pool. In order to associate the parameter with all of the queries in the context of a given request in your application, you should:

1. Start a transaction.
2. Set the runtime parameter as a `LOCAL` setting, which lasts only until the end of the current transaction. This may be done by passing `TRUE` to the third argument (`is_local`) of the `set_config()` function.
3. Run all queries for the duration of the request inside this transaction.

All queries for a given transaction will use the same database connection, and because the setting is local, it won't affect any other transactions.

Prisma Client extensions provide a way to easily ensure all queries run inside a transaction with a setting enabled for RLS. See [the `script.ts` file](script.ts) for an example extension, which allows you to create a client instance for the current user:

```typescript
const userPrisma = prisma.forUser(user.id);

await userPrisma.product.update({
  where: { id: product.id },
  data: { name: "Updated Name" },
});
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
cd examples/audit-log-context
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
