# Prisma Client Extension - Callback-free Interactive Transactions

This example shows a Prisma Client extension which adds a new API for starting [interactive transactions](https://www.prisma.io/docs/concepts/components/prisma-client/transactions#interactive-transactions) without callbacks.

This gives you the full power of [interactive transactions](https://www.prisma.io/docs/concepts/components/prisma-client/transactions#interactive-transactions) (such as read–modify–write cycles), but in a more imperative API. This may be more convenient than the normal callback-style API for interactive transactions in some scenarios:

```typescript
const tx = await prisma.$begin();
const user = await tx.user.findFirstOrThrow();
await tx.user.update(/* ... */);
await tx.$commit(); // Or: await tx.$rollback();
```

## Caveats

Prisma Client extensions are currently in [Preview](https://www.prisma.io/docs/about/prisma/releases#preview). This extension is provided as an example only. It is not intended to be used in production environments.

Please read [the documentation on `client` extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions/client) for more information.

## How to use

### Prerequisites

- Install [Node.js](https://nodejs.org/en/download/)
- Install [Docker](https://docs.docker.com/get-docker/)

### 1. Download example & install dependencies

Clone this repository:

```sh
git clone git@github.com:sbking/prisma-client-extensions.git
```

Create a `.env` file and install dependencies:

```sh
cd callback-free-itx
cp .env.example .env
npm install
```

### 2. Start the database

Run the following command to start a new Postgres database in a Docker container:

```sh
docker compose up -d
```

### 3. Run migrations

Run this command to apply migrations to the database:

```sh
npx prisma migrate deploy
```

### 4. Seed the database

Run the following command to add seed data to the database:

```sh
npx prisma db seed
```

### 5. Run the `dev` script

To run the `script.ts` file, run the following command:

```sh
npm run dev
```
