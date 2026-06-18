---
description: Build all packages or a specific package with Turborepo
argument-hint: "[package-name]"
---
Build all packages or a specific package.

## All packages

```bash
pnpm build
```

## Single package

```bash
pnpm --filter @repo/${1:-playground} build
```

If there are type errors, run `pnpm check-types` and fix them before reporting success.
