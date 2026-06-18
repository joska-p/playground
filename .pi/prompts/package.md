---
description: Work with a specific monorepo package
argument-hint: "<package-name> [task...]"
---
Work on a specific package in the monorepo.

Package: @repo/${1:?package name is required}
Target directory: ./packages/${1}

## Commands

```bash
# Build just this package
pnpm --filter @repo/$1 build

# Lint
pnpm --filter @repo/$1 lint

# Type-check
pnpm --filter @repo/$1 check-types
```

## Conventions

Before modifying source code, read `./apps/playground/src/content/docs/explanation/conventions.md` and apply only the relevant rules.

Package src/ structure:
- `core/` — Pure domain logic, algorithms, types. No React, no side effects.
- `components/` — React components. One file per component.
- `stores/` — Zustand stores, each in its own domain subdirectory.
- `hooks/` — React hooks.
- `utils/` — Pure helper functions.
- `lib/` — Third-party wrappers (rare).
- `data/` — Static data files only (JSON, images, etc.).

If the task involves multiple packages, run commands from the repo root.
