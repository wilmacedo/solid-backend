# Proof of Concept of SOLID and more

Simple project to practice patterns like SOLID, TDD, Clean Arch and testing.

## Container

To properly test routes and E2E run

```bash
  docker compose up -d
```

## API Reference

#### Register a new user

```http
  POST /users
```

| Parameter  | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `name`     | `string` | **Required**. An name     |
| `email`    | `string` | **Required**. An email    |
| `password` | `string` | **Required**. An password |

## Running Tests

To run unit tests, run the following command

```bash
  pnpm run test
```

To run E2E tests, run pretest first

```bash
  pnpm run pretest:e2e
```

Run E2E tests

```bash
  pnpm run test:e2e
```
