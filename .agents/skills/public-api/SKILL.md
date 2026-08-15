---
name: public-api
description: Use when defining package exports in package.json, writing cross-package imports, naming files, or following function naming prefixes.
---

# Public API & naming

Sources: `apps/playground/src/content/docs/conventions/13-imports-exports.md` and `14-factory-creator-functions.md`.

## Exports

- Public API is declared in `package.json` `exports` — one subpath per public symbol or component group. Consumers import `@repo/<pkg>/<Subpath>`.
- Named exports only. No `export default`. Use `export type { ... }` for types.
- No `export *` wildcard re-exports.
- No root `index.ts` barrel (hurts tree-shaking, hides what's public).
- Per-group barrels OK for catalog packages — a small deliberate `index.ts` per category, tied 1:1 to an exports subpath. Skip barrels entirely in app/engine packages.
- Omit file extensions in import paths (the bundler resolves them).

## Naming

| Prefix      | Use for                                    | Example          |
| ----------- | ------------------------------------------ | ---------------- |
| `create*`   | Instantiate from config                    | `createRule`     |
| `define*`   | Build a type-safe config/definition object | `defineManip`    |
| `parse*`    | String → structured data                   | `parseRule`      |
| `build*`    | Assemble from existing parts               | `buildTree`      |
| `get*`/`use*` | Access existing data                     | `getCreature`, `useRows` |

Never `*Factory` / `factory*`.

## Filename casing

Follows the exported identifier: components PascalCase exact (`Button.tsx` → `Button`), hooks camelCase exact (`useRows.ts` → `useRows`), everything else kebab-case (`create-rule.ts` → `createRule`).
