# Prisma Client Extension - `exists` function

This example demonstrates how to create a Prisma Client extension that adds an `exists` method to all your models.


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
cd exists-fn
npm install
```

### 2. Create an SQLite database and run migrations

Run the following command. An SQLite database will be created automatically and seeded with data contained in [`seed.ts`](./prisma/seed.ts):

```sh
npx prisma migrate dev --name init
```

### 3. Run the `dev` script

To run the `script.ts` file, run the following command:

```sh
npm run dev
```
