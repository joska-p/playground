---
title: "Import and Export Strategy"
description: "Subpath exports, barrel bans, and import rules across the monorepo."
category: "reference"
tags:
  - reference
order: 10
---

# Import and Export Strategy

This project uses subpath exports and explicit named exports to keep package APIs stable and the dependency graph clean.

---

## Core Rules

1. **Public API is `package.json` `exports`.** Each public component gets its own subpath — no root `index.ts` barrel.
2. **No barrel files** (`index.ts`). They cause circular dependencies, slow down the TypeScript server, and are hard to maintain.
3. **Named exports only.** Never use `export default`.
4. **No wildcard re-exports** (`export * from`). Always list identifiers explicitly.
5. **Filename must match the primary exported identifier** (case-sensitive).
6. **Use `export type { ... }`** for type-only exports to keep runtime bundles clean.

---

## Package Exports (`package.json`)

Every package declares its public API in the `exports` map — one subpath per public symbol:

```json
{
  "exports": {
    "./Button": "./src/components/button/Button.tsx",
    "./buttonVariants": "./src/components/button/buttonVariants.ts",
    "./Card": "./src/components/card/Card.tsx",
    "./Sidebar": "./src/components/widgets/sidebar/Sidebar.tsx",
    "./styles": "./src/styles/styles.css"
  }
}
```

**Rules:**

- Do not use `require` / `import` / `types` conditions when all three point to the same source — omit them entirely.
- The `./styles` subpath for CSS is the only exception to the symbol-per-subpath rule.
- Internal files not listed in `exports` are private by default — do not import them across packages.

---

## Consumer Imports

Import exactly what you need via the subpath:

```typescript
import { Button } from "@repo/ui/Button";
import { Card, CardHeader } from "@repo/ui/Card";
import type { ButtonProps } from "@repo/ui/Button";
```

Never reach into private paths:

```typescript
// ❌ Do not do this
import { Button } from "@repo/ui/src/components/button/Button";
```

---

## In-Code Exports

Named exports only. The exported identifier must match the filename exactly:

```typescript
// Button.tsx
export type ButtonProps = { ... };
export function Button({ ... }: ButtonProps) { ... }

// useResizeObserver.ts
export function useResizeObserver() { ... }

// buttonVariants.ts
export const buttonVariants = cva(...);
```

For type-only exports:

```typescript
export type { ButtonProps } from "./Button";
export type { BadgeVariant } from "./Badge";
```

---

## Internal Barrels

Barrels inside a package (e.g. aggregating multiple internal modules) are **discouraged**. If used, they must:

- Not be part of the package's public contract
- Avoid wildcard exports when ambiguity is likely
- Never appear in `package.json` `exports`

---

## PR Checklist

- [ ] New public symbols are added to `package.json` `exports`
- [ ] No `export *` in any source file
- [ ] No barrel (`index.ts`) files introduced
- [ ] Type-only symbols use `export type`
- [ ] Consumer imports use subpath pattern (`@repo/ui/Component`)
- [ ] Filename matches the exported identifier exactly
