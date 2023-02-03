# Prisma Client Extension - JSON Field Types

This example shows how to use a Prisma Client extension to provide static and runtime types for a `Json` field. It uses [Zod](https://github.com/colinhacks/zod) to parse the field data and infer static TypeScript types.

This example includes a `User` model with a JSON `profile` field, which has a sparse structure which may vary between each users. The extension has two parts:

- A `result` extension that adds a computed `profileData` field. This field uses the `Profile` Zod parser to parse the untyped `profile` field. TypeScript infers the static data type from the parser, so query results have both static and runtime type safety.
- A `query` extension that parses the `profile` field of input data for the `User` model's write methods like `create` and `update`.

## Caveats

> **NOTE**: Query extensions do not currently work for nested operations. In this example, validations are only run on the top level `data` object passed to methods such as `prisma.user.create()`. Validations implemented this way do not automatically run for [nested writes](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes).

Prisma Client extensions are currently in developer preview. This extension is provided as an example only. It is not intended to be used in production environments.

Please read the documentation on [`query` extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions/query) and [`result` extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions/query) for more information.

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
cd examples/json-field-types
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
