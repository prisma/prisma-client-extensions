# Prisma Client Extension - Update and Delete ignore on not found

This example adds the `updateIgnoreNotFound` and `deleteIgnoreNotFound` methods to all your models. The two methods allow you to return `null` if a record is not found when updating or deleting a record instead of throwing an error.

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

Run the following command to create a SQLite database and seed your database with sample data:

```sh
npx prisma migrate dev
```

### 4. Run the `dev` script

To run the `script.ts` file, run the following command:

```sh
npm run dev
```
