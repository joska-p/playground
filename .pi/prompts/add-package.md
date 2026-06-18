---
description: Scaffold a new package in the monorepo
argument-hint: "<package-name> [description]"
---
Create a new package in the monorepo.

Package name: @repo/${1:?package name is required}
Description: ${2:-}
Directory: ./packages/$1

## Steps

1. Run `pnpm --filter @repo/$1 ...` to scaffold if using turbo gen, or create manually.
2. Create the standard `src/` structure:
   - `src/core/` — Pure domain logic, no React, no side effects
   - `src/components/` — React components (if needed)
   - `src/stores/` — Zustand stores (if needed)
   - `src/hooks/` — React hooks (if needed)
   - `src/utils/` — Helper functions
   - `src/data/` — Static data files (JSON, images)
3. Write a `README.md` following the template in `./apps/playground/src/content/docs/how-to/documenting-packages.md`
4. Add the package to any relevant workspace configurations.
