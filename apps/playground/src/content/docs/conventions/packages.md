---
title: Packages
description: Package structure, public API, imports/exports, and naming conventions.
tags:
    - conventions
    - reference
---

# Packages

## Directory layout

**Guideline.** Every package tends toward this layout inside `src/`:

| Directory     | Purpose                                                                                 | Example                       |
| ------------- | --------------------------------------------------------------------------------------- | ----------------------------- |
| `core/`       | Pure domain logic, algorithms, types. No React, no side effects.                        | `core/grid.ts`, `core/rules/` |
| `components/` | React components. One file per component.                                               | `components/Button.tsx`       |
| `stores/`     | Zustand stores, each in its own domain subdirectory.                                    | `stores/simulation/`          |
| `hooks/`      | React hooks.                                                                            | `hooks/useResizeObserver.ts`  |
| `utils/`      | Pure helper functions.                                                                  | `utils/cn.ts`                 |
| `lib/`        | Third-party wrappers or initialization code (rare, only when wrapping an external lib). | `lib/variants/`               |

- **Do** keep `core/` for code that could run in any context — no React, no DOM, no store imports.
- **Do** use `data/` for **static data files only** (JSON, images), never for code modules.
- **Do** use `lib/` only when wrapping a third-party library. Most packages should not have `lib/`.
- **Don't** leave top-level files in `src/` — everything belongs in a subdirectory.
- **Do** split `core/` into a subdirectory when it grows beyond ~200 lines.

## Public API

- **Do** declare public API in `package.json` `exports` — one subpath per public symbol or per component group.
- **Don't** use `export default` — named exports only.
- **Don't** use wildcard re-exports (`export * from`) — list identifiers explicitly.
- **Do** use `export type { ... }` for type-only exports.
- **Do** import via subpath: `import { Button } from "@repo/ui/Button"`.
- **Don't** require file extensions in import paths (bundler resolves them).

```json
// ✅ Good — explicit subpath exports
{
    "./Button": {
        "types": "./src/components/Button.ts",
        "default": "./src/components/Button.tsx"
    }
}

// ❌ Bad — root barrel
{
    ".": "./src/index.ts"
}
```

### Scoped barrels (exception)

Per-group barrels are fine for catalog packages (e.g. a UI library grouping components by category). Each barrel must be tied 1:1 to a `package.json` exports subpath — not a catch-all.

```json
// ✅ Good — scoped barrel per category
{
    "./navigation": {
        "types": "./src/components/navigation/index.ts",
        "default": "./src/components/navigation/index.ts"
    }
}
```

For most app and engine packages, skip barrels entirely: import each file by its own path.

## Naming

### Function prefixes

Use a consistent prefix that describes what the function does:

| Prefix          | When to use                                    | Example                                  |
| --------------- | ---------------------------------------------- | ---------------------------------------- |
| `create*`       | Instantiate a new object/value from config     | `createRule`, `createGrid`, `createIcon` |
| `define*`       | Build a type-safe config/definition object     | `defineManip`, `defineGrammarRule`       |
| `parse*`        | Convert a string into structured data          | `parseRule`, `parseGraph`                |
| `build*`        | Assemble a result from multiple existing parts | `buildTree`, `buildOutput`               |
| `get*` / `use*` | Access existing data (no creation)             | `getCreature`, `useRows`                 |

- **Don't** use `*Factory` or `factory*` naming — prefer the verb-first prefix.

### Filename casing

- **React Components** → PascalCase exact match: `Button.tsx` exports `Button`
- **Hooks** → camelCase exact match: `useSomething.ts` exports `useSomething`
- **Everything else** → kebab-case derived from the identifier: `create-rule.ts` exports `createRule`
