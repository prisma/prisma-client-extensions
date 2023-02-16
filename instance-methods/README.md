# Prisma Client Extension - Instance Methods

This example shows how to add an [Active Record](https://www.martinfowler.com/eaaCatalog/activeRecord.html)-like interface to Prisma result objects. It uses a `result` extension to add `save` and `delete` methods directly to `User` model objects returned by Prisma Client methods.

This technique can be used to customize Prisma result objects with behavior, analogous to adding instance methods to model classes.

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
cd instance-methods
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
