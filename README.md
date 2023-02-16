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
| [`audit-log-context`](audit-log-context)       | Provides the current user's ID as context to Postgres audit log triggers                    |
| [`callback-free-itx`](callback-free-itx)       | Adds a method to start interactive transactions without callbacks                           |
| [`computed-fields`](computed-fields)           | Adds virtual / computed fields to result objects                                            |
| [`input-transformation`](input-transformation) | Transforms the input arguments passed to Prisma Client queries to filter the result set     |
| [`input-validation`](input-validation)         | Runs custom validation logic on input arguments passed to mutation methods                  |
| [`instance-methods`](instance-methods)         | Adds Active Record-like methods like `save()` and `delete()` to result objects              |
| [`json-field-types`](json-field-types)         | Uses strongly-typed runtime parsing for data stored in JSON columns                         |
| [`model-filters`](model-filters)               | Adds reusable filters that can composed into complex `where` conditions for a model         |
| [`obfuscated-fields`](obfuscated-fields)       | Prevents sensitive data (e.g. `password` fields) from being included in results             |
| [`query-logging`](query-logging)               | Wraps Prisma Client queries with simple query timing and logging                            |
| [`readonly-client`](readonly-client)           | Creates a client that only allows read operations                                           |
| [`retry-transactions`](retry-transactions)     | Adds a retry mechanism to transactions with exponential backoff and jitter                  |
| [`row-level-security`](row-level-security)     | Uses Postgres row-level security policies to isolate data a multi-tenant application        |
| [`static-methods`](static-methods)             | Adds custom query methods to Prisma Client models                                           |
| [`transformed-fields`](transformed-fields)     | Demonstrates how to use result extensions to transform query results and add i18n to an app |
