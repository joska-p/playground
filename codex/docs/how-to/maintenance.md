---
title: Project Maintenance
description: Clean build artifacts and reset your local environment.
---

# Project Maintenance

Two scripts keep the local environment clean and recover from corrupted states.

## `pnpm clean`

`pnpm clean` removes build artifacts and dependencies:

```
node_modules   .turbo   dist   .next   .astro
```

```bash
pnpm clean
```

The prompt asks for `CLEAN`; `--yes` skips it:

```bash
pnpm clean --yes
```

## `pnpm reset`

`pnpm reset` runs a full clean rebuild of the entire project, equivalent to:

```bash
pnpm clean --yes
pnpm install
pnpm format
pnpm lint-fix
pnpm check-types
pnpm build
```

```bash
pnpm reset
```

The reset fits these situations:

- New pulls hit type errors or missing modules
- A dependency update leaves the lockfile in a bad state
- Stale `turbo` caches cause incorrect incremental builds
- A from-scratch build check is due

## What Gets Removed

| Path            | Contents                          |
| --------------- | --------------------------------- |
| `node_modules/` | All installed dependencies        |
| `.turbo/`       | Turborepo incremental build cache |
| `dist/`         | Build output from packages        |
| `.next/`        | Next.js build cache               |
| `.astro/`       | Astro build cache                 |

Both scripts are defined in the root `package.json`.
