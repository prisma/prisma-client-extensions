<div align="center">
  <h1>Prisma Client Extension Examples</h1>
</div>

This repository contains a number of examples of [Prisma Client extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions).

## Caveats

Prisma Client extensions are currently in developer preview. The extensions in this repo are provided as examples only, and without warranty. They are not
intended to be used in production environments.

## Examples

| Example                                                 | Description                                                                                 |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| [`audit-log-context`](examples/audit-log-context)       | Provides the current user's ID as context to Postgres audit log triggers                    |
| [`computed-fields`](examples/computed-fields)           | Adds virtual / computed fields to result objects                                            |
| [`custom-methods`](examples/custom-methods)             | Adds custom query methods to Prisma Client models                                           |
| [`input-transformation`](examples/input-transformation) | Transforms the input arguments passed to Prisma Client queries to filter the result set     |
| [`input-validation`](examples/input-validation)         | Runs custom validation logic on input arguments passed to mutation methods                  |
| [`json-field-types`](examples/json-field-types)         | Uses strongly-typed runtime parsing for data stored in JSON columns                         |
| [`model-methods`](examples/model-methods)               | Adds Active Record-like methods like `save()` and `delete()` to result objects              |
| [`obfuscated-fields`](examples/obfuscated-fields)       | Prevents sensitive data (e.g. `password` fields) from being included in results             |
| [`query-logging`](examples/query-logging)               | Wraps Prisma Client queries with simple query timing and logging                            |
| [`retry-transactions`](examples/retry-transactions)     | Adds a retry mechanism to transactions with exponential backoff and jitter                  |
| [`row-level-security`](examples/row-level-security)     | Uses Postgres row-level security policies to isolate data a multi-tenant application        |
| [`transformed-fields`](examples/transformed-fields)     | Demonstrates how to use result extensions to transform query results and add i18n to an app |
