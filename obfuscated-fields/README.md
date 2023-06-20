# Prisma Client Extension - Obfuscated Fields

This example uses an extension to obfuscate a sensitive `password` field on a `User` model. The `password` column is not included in selected columns in the underlying SQL queries, and it will resolve to `undefined` when accessed on a user result object. It could also resolve to any other value, such as an obfuscated string like `"********"`.

## Caveats

This extension is provided as an example only. It is not intended to be used in production environments.

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
cd obfuscated-fields
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
