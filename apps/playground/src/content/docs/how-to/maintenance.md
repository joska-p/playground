---
title: Project Maintenance
description: Clean build artifacts and reset your local environment.
tags:
  - how-to
featured: true
---

# Project Maintenance

Two scripts help keep your local environment clean and recover from corrupted states.

## `pnpm clean`

Removes build artifacts and dependencies:

```
node_modules   .turbo   dist   .next   .astro
```

```bash
pnpm clean
```

You will be prompted to type `CLEAN` to confirm. To skip the prompt:

```bash
pnpm clean --yes
```

## `pnpm reset`

Runs a full clean rebuild of the entire project. Equivalent to:

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

Use this when:

- You pull new changes and hit type errors or missing modules
- A dependency update leaves the lockfile in a bad state
- `turbo` caches are stale and causing incorrect incremental builds
- You want to verify the project builds from scratch

## What Gets Removed

| Path            | Contents                          |
| --------------- | --------------------------------- |
| `node_modules/` | All installed dependencies        |
| `.turbo/`       | Turborepo incremental build cache |
| `dist/`         | Build output from packages        |
| `.next/`        | Next.js build cache               |
| `.astro/`       | Astro build cache                 |

Both scripts are defined in the root `package.json`.
