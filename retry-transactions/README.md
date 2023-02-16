# Prisma Client Extension - Retry Transactions

This example shows how to use a Prisma Client extension to automatically retry transactions that fail due to a write conflict / deadlock timeout. Failed transactions will be retried with [exponential backoff and jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/) to spread out the database load under heavy traffic contention.

## Caveats

> **NOTE**: This extension overwrites the `$transaction` method on a Prisma Client instance, and relies on this method being defined on a generated Prisma Client. It may not currently have correct type definitions when packaged and distributed as a reusable extension.

Prisma Client extensions are currently in developer preview. This extension is provided as an example only. It is not intended to be used in production environments.

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
cd retry-transactions
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
