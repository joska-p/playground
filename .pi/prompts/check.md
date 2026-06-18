---
description: Run lint, type-check, and optionally build
argument-hint: "[package-name]"
---
Run the full quality check pipeline.

## All packages

```bash
pnpm lint
pnpm check-types
pnpm build
```

## Single package

```bash
pnpm --filter @repo/${1:-playground} lint
pnpm --filter @repo/${1:-playground} check-types
pnpm --filter @repo/${1:-playground} build
```

Stop on first failure. Report which step failed and why.
