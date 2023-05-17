# Prisma Client Extension - Transformed Fields

This example shows how to use a Prisma Client extension to transform result fields returned by queries. In this example, a date field is transformed to a relative string for a specific locale.

This example shows a way to implement internationalization (i18n) at the data access layer in your application. However, this technique allows you to implement any kind of custom transformation or serialization/deserialization of fields on your query results.

## Caveats

Prisma Client extensions are currently in [Preview](https://www.prisma.io/docs/about/prisma/releases#preview). This extension is provided as an example only. It is not intended to be used in production environments.

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
cd transformed-fields
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
