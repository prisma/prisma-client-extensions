# Prisma Client Extension - Query Logging

This example shows how to use Prisma Client extensions to perform similar tasks as [middleware](https://www.prisma.io/docs/concepts/components/prisma-client/middleware). In this example, a `query` extension tracks the time it takes to fulfill each query, and logs the results along with the query and arguments themselves.

This technique could be used to perform generic logging, emit events, track usage, etc.

## Caveats

> **NOTE**: The [OpenTelemetry tracing](https://www.prisma.io/docs/concepts/components/prisma-client/opentelemetry-tracing) and [Metrics](https://www.prisma.io/docs/concepts/components/prisma-client/metrics) features (currently in developer preview) can provide detailed insights into performance and how Prisma interacts with the database. This example shows how to use Prisma Client extensions to perform actions before or after queries, and is not a fully-featured logging / tracing solution.

Prisma Client extensions are currently in developer preview. This extension is provided as an example only. It is not intended to be used in production environments.

Please read [the documentation on `query` extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions/query) for more information.

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
cd examples/query-logging
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
