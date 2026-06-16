# @repo/randomart

> Random expression-tree art generator. Uses the engine pattern: pluggable grammar definitions, registry-driven tree builder, Zustand store, and React presentation layer.

## Quick Start

```bash
pnpm --filter @repo/randomart dev
```

## Architecture

Three-layer unidirectional flow:

```
Grammar Definitions (core/grammar/rules/)
    │
    ▼
Registry (core/grammar/registry.ts) — Map<id, GrammarRule>
    │
    ▼
Engine Core (core/engine.ts) — buildTree(), evaluateNode()
    │
    ▼
Zustand Store (stores/randomart/) — unexported, getter hooks + setter functions
    │
    ▼
Presentation Layer (components/) — React, Sidebar layout, Canvas 2D
```

### Core Domain (`src/core/`)

- **`types.ts`** — `ExpressionNode` type (ruleId + args + optional constantValue)
- **`SeededRandom.ts`** — Deterministic PRNG with choice history tracking
- **`engine.ts`** — `buildTree()` and `evaluateNode()` driven by the grammar registry
- **`renderer.ts`** — `renderPixelBuffer()` and `renderPixelMapAsBase64()` (server-safe PNG export)
- **`treePrinter.ts`** — `nodeToMathString()` and `nodeToTreeView()` for AST inspection

### Grammar System (`src/core/grammar/`)

Each operator/terminal is a pluggable `GrammarRule` definition created via `defineGrammarRule()` and registered in a `Map`. Adding a new operator:

1. Create a rule file in `rules/` using `defineGrammarRule()`
2. Register it in `registry.ts`
3. The UI auto-discovers it via `getAllRules()`

### Store (`src/stores/randomart/`)

Vanilla Zustand store with selector hooks and setter functions (conventions doc pattern):

| File                            | Purpose                                                                |
| ------------------------------- | ---------------------------------------------------------------------- |
| `store.ts`                      | `createStore()` — never imported by components                         |
| `actions.ts`                    | `setSeedText()`, `setActiveChannel()`, `setMaxDepth()`, `regenerate()` |
| `selectors/useSeedText.ts`      | Hook to read seed text                                                 |
| `selectors/useActiveChannel.ts` | Hook to read active channel                                            |
| `selectors/useMaxDepth.ts`      | Hook to read max depth                                                 |
| `selectors/useTrees.ts`         | Hook to read expression trees                                          |
| `selectors/useRngInstances.ts`  | Hook to read PRNG instances                                            |

### Exports

| Subpath                    | Target                                  |
| -------------------------- | --------------------------------------- |
| `.`                        | `App.tsx` — for DynamicProjectApp       |
| `./Demo`                   | `Demo.tsx` — wrapped with ErrorBoundary |
| `./renderPixelMapAsBase64` | `renderer.ts` — for Hero.astro SSR      |
| `./styles`                 | `global.css`                            |

## Conventions

This package follows [project conventions](../../CONVENTIONS.md):

- **Named exports only** — no `export default`
- **No barrel files** — import directly from source paths
- **Zustand store** — unexported `createStore()`, getter hooks (`use*`), plain setter functions
- **`@repo/ui` components** for all UI
- **CSS tokens** — no hardcoded colors, spacing, or radius values

---

_Part of the [Creative Playground](https://jpotin.gitlab.io/playground)_
