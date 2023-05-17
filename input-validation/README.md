# Prisma Client Extension - Input Validation

This example uses Prisma Client extensions to perform custom runtime validations when creating and updating database objects.

This technique could be used to sanitize user input or otherwise deny mutations that do not meet some criteria.

## Caveats

> **NOTE**: Query extensions do not currently work for nested operations. In this example, validations are only run on the top level `data` object passed to methods such as `prisma.product.create()`. Validations implemented this way do not automatically run for [nested writes](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes).

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
cd input-validation
npm install
```

### 2. Create an SQLite database and run migrations

Run the following command. An SQLite database will be created automatically:

```sh
npx prisma migrate deploy
```

### 3. Run the `dev` script

To run the `script.ts` file, run the following command:

```sh
npm run dev
```
