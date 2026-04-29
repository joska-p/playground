---
title: "Import and Export Strategy"
description: "Explicit rules for package APIs, barrels, and imports across the monorepo."
tags:
  - reference
---

# Import and Export Strategy

This project uses strict import/export rules to keep package APIs explicit and stable.

## Core Rules

1. Package public entrypoints (`packages/*/src/index.ts`) must use explicit named exports.
2. Do not use `export *` in package public entrypoints.
3. Use `export type { ... }` for type-only exports.
4. Keep ESM path suffixes (`.js`) in re-export paths.
5. Import from package roots (`@repo/ui`) in consumers, not deep private paths.

## Why

- Prevent accidental API growth
- Reduce export name collisions
- Make reviews and refactors safer
- Keep package contracts readable

## Public Entrypoint Pattern

```ts
// packages/ui/src/index.ts
export { Button } from "./components/button/Button.js";
export { buttonVariants } from "./components/button/buttonVariants.js";
export type { BadgeProps, BadgeVariant } from "./components/badge/Badge.js";
```

Avoid:

```ts
// Do not use this in package public APIs
export * from "./components/button/Button.js";
```

## Type Exports

Use explicit type exports so runtime bundles stay clean and API intent is obvious.

```ts
export type { SidebarProps } from "./components/widgets/sidebar/Sidebar.js";
export type { BadgeVariant } from "./components/badge/Badge.js";
```

## Consumer Imports

Preferred:

```ts
import { Card, CardHeader, CardTitle } from "@repo/ui";
import type { BadgeVariant } from "@repo/ui";
```

Not preferred in app/package code:

```ts
import { Card } from "@repo/ui/src/components/card/Card";
```

## Internal Barrels

Internal barrels are allowed when they improve local module structure, but:

- they are not public package contract files
- they should still avoid broad wildcard exports when ambiguity is likely

## PR Checklist

- [ ] No `export *` in package public entrypoint files
- [ ] New public symbols are explicitly exported
- [ ] Type-only symbols use `export type`
- [ ] Consumer imports remain package-root based (`@repo/<pkg>`)
