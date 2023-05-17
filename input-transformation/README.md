# Prisma Client Extension - Input Transformation

This example creates an `adminPrisma` client instance, as well as an extended `publicPrisma` client instance. The `publicPrisma` client automatically restricts queries to only include `published` posts.

This extension also uses the [`extendedWhereUnique` preview flag](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#enable-the-ability-to-filter-on-non-unique-fields-with-userwhereuniqueinput) to allow filtering on non-unique fields like `published` in methods like `findUnique`.

Currently, `query` extensions allow you to modify the arguments passed to Prisma Client methods like `findMany` which do not affect the return type, such as `where`, `take`, and `skip`. This allows you to customize how queries are run and filter down the result set.

## Caveats

> **NOTE**: Query extensions do not currently work for nested operations. In this example, the `publicPrisma` client will only filter out unpublished posts when calling a top level `post` method such as `publicPrisma.post.findMany`. It won't filter out posts that are included as relations of another model with [nested reads using `include` or `select`](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-reads).

Prisma Client extensions are currently in [Preview](https://www.prisma.io/docs/about/prisma/releases#preview). This extension is provided as an example only. It is not intended to be used in production environments.

Please read [the documentation on `query` extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions/query) for more information.

## How to use

### Prerequisites

- Install [Node.js](https://nodejs.org/en/download/)

### 1. Download example & install dependencies

Clone this repository:

```sh
git clone git@github.com:sbking/prisma-client-extensions.git
```

Install dependencies:

```sh
cd input-transformation
npm install
```

### 2. Create an SQLite database and run migrations

Run the following command. An SQLite database will be created automatically:

```sh
npx prisma migrate deploy
```

### 3. Seed the database

Run the following command to add seed data to the database:

```sh
npx prisma db seed
```

### 4. Run the `dev` script

To run the `script.ts` file, run the following command:

```sh
npm run dev
```
