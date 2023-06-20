# Prisma Client Extension - Model Filters

This example demonstrates a Prisma Client extension which adds reusable filters for a model which can be composed and passed to a `where` condition. Complex, frequently used filtering conditions can be written once and accessed in many queries through the extended Prisma Client instance.

## Caveats

This extension is provided as an example only. It is not intended to be used in production environments.

Please read [the documentation on `model` extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions/model) for more information.

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
cd model-filters
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
