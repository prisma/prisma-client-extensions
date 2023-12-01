# Prisma Client Extension - Update and Delete ignore on not found

This example leverages Prisma Client extensions to enhance your models with `updateIgnoreNotFound` and `deleteIgnoreNotFound` functions. These functions ensures that if an `update` or `delete` operation is performed on a field that doesn't exist,  `null` is returned, instead of throwing an error.

Please read [the documentation on `model` extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions/model) for more information.

## How to use

### Prerequisites

- Install [Node.js](https://nodejs.org/en/download/)

### 1. Download example & install dependencies

Clone this repository:

```sh
git clone git@github.com:prisma/prisma-client-extensions.git
```

Install dependencies:

```sh
cd update-delete-ignore-not-found
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
