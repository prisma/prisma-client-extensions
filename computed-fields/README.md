# Prisma Client Extension - Computed Fields

This example demonstrates how to create a Prisma Client extension that adds virtual / computed fields to a Prisma model. These fields are not included in the database, but rather are computed at runtime.

Computed fields are type-safe and may return anything from simple values to complex objects, or even functions that can act as methods for your models.

Computed fields must specify which other fields they depend on, and they may be composed / reused by other computed fields.

## Caveats

Prisma Client extensions are currently in developer preview. This extension is provided as an example only. It is not intended to be used in production environments.

Please read [the documentation on `result` extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions/result) for more information.

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
cd computed-fields
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
