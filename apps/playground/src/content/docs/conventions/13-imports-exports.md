---
title: Imports & Exports
description: Public API via package.json exports, named exports only, and the no-root-barrel rule.
tags:
  - conventions
  - reference
---

# Imports & Exports

## Contents

- [Rule](#rule)
- [No root barrel](#no-root-barrel)
- [Scoped, per-group barrels are fine](#scoped-per-group-barrels-are-fine)

## Rule

**Rule**, with an explicit exception for component-catalog packages.

- Public API is declared in `package.json` `exports` — one subpath per public symbol or per component group.
- Named exports only — no `export default`.
- No wildcard re-exports (`export * from`). List identifiers explicitly.
- Use `export type { ... }` for type-only exports.
- Consumers import via subpath: `import { Button } from "@repo/ui/Button"`.
- In **bundle mode** (Vite, webpack, etc.), file extensions are not required in import paths. Omit `.ts` / `.tsx` extensions when the bundler resolves them automatically.

## No root barrel

A single `index.ts` re-exporting the entire package is
banned everywhere. It defeats the point of subpath exports (bundlers can't
tree-shake a catch-all barrel as well) and makes it unclear what's actually
public API.

## Scoped, per-group barrels are fine

This is fine for packages organized as a catalog
of many small components — a UI library grouping components into
categories, for example:

```json
{
  "./navigation": {
    "types": "./src/components/navigation/index.ts",
    "default": "./src/components/navigation/index.ts"
  },
  "./feedback": {
    "types": "./src/components/feedback/index.ts",
    "default": "./src/components/feedback/index.ts"
  }
}
```

Here each `index.ts` is a small, deliberate barrel for _one category_, tied
1:1 to a `package.json` exports subpath — not a catch-all. That's different
in kind from a root barrel, not just in size.

For most app and engine packages — a single cohesive purpose rather than a
growing catalog — skip barrels entirely: import each file's export by its
own path.
