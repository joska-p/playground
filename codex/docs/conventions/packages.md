---
title: Packages
description: Package structure, public API, imports/exports, and naming conventions.
tags:
    - conventions
    - reference
---

# Packages

## Directory layout

Every package tends toward this layout inside `src/`:

| Directory     | Purpose                                                        | Example                       |
| ------------- | -------------------------------------------------------------- | ----------------------------- |
| `core/`       | Pure domain logic, algorithms, types. Portable to any context. | `core/grid.ts`, `core/rules/` |
| `components/` | React components. One file per component.                      | `components/Button.tsx`       |
| `stores/`     | Zustand stores, each in its own domain subdirectory.           | `stores/simulation/`          |
| `hooks/`      | React hooks.                                                   | `hooks/useResizeObserver.ts`  |
| `utils/`      | Pure helper functions.                                         | `utils/cn.ts`                 |
| `lib/`        | Third-party wrappers or initialization code.                   | `lib/variants/`               |

`core/` runs anywhere: pure logic, free of React, DOM, and store imports. It splits into a subdirectory past roughly 200 lines. `data/` holds static files such as JSON and images. `lib/` appears around a third-party wrapper, and most packages live without it. Everything sits in a directory under `src/`; loose files gather into the directory that owns them.

## Public API

`package.json` `exports` declares the public contract, one subpath per public symbol or per component group:

```json
{
    "./Button": {
        "types": "./src/components/Button.ts",
        "default": "./src/components/Button.tsx"
    }
}
```

Named exports carry the contract: every identifier crosses a package boundary through an explicit name, and type-only exports travel as `export type { ... }`. Imports go through subpaths, `import { Button } from "@repo/ui/Button"`, with extensions left to the bundler.

Catalog packages group their surface into scoped barrels, each barrel tied one-to-one to an `exports` subpath:

```json
{
    "./navigation": {
        "types": "./src/components/navigation/index.ts",
        "default": "./src/components/navigation/index.ts"
    }
}
```

App and engine packages import each file by its own path.

## Naming

### Function prefixes

A function's prefix describes its operation:

| Prefix          | Operation                                      | Example                                  |
| --------------- | ---------------------------------------------- | ---------------------------------------- |
| `create*`       | Instantiate a new object/value from config     | `createRule`, `createGrid`, `createIcon` |
| `define*`       | Build a type-safe config/definition object     | `defineManip`, `defineGrammarRule`       |
| `parse*`        | Convert a string into structured data          | `parseRule`, `parseGraph`                |
| `build*`        | Assemble a result from multiple existing parts | `buildTree`, `buildOutput`               |
| `get*` / `use*` | Access existing data                           | `getCreature`, `useRows`                 |

The verb leads; the noun follows. A name reads as an action on the domain.

### Filename casing

Filenames mirror their exports:

- React Components → PascalCase exact match: `Button.tsx` exports `Button`
- Hooks → camelCase exact match: `useSomething.ts` exports `useSomething`
- Everything else → kebab-case derived from the identifier: `create-rule.ts` exports `createRule`
