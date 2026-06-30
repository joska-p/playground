# Package Review: `@repo/l-system` vs `@repo/l-system-engine`

## Verdict: They are correctly split — keep as two separate packages.

## What each package is

### `@repo/l-system-engine` — Pure rewriting engine

- **Zero runtime dependencies** — only dev tooling (eslint, typescript, vitest)
- Pure TypeScript: core rewriting iterator (`expand`, `steps`), rule factories (`deterministicRule`, `stochasticRule`, `contextSensitiveRule`, `parametricRule`), symbol helpers, seeded PRNG, grammar validation
- Single entry point (`. → ./src/engine.ts`) re-exporting all public API
- **Has its own test suite** — 38 tests in `engine.test.ts` covering all rule types, validation, `steps()` iterator, bracket handling, and edge cases
- Well-documented README with architecture diagram, design principles, and usage examples

### `@repo/l-system` — Interactive 3D demo app

- React + Three.js app (`@react-three/fiber`, `@react-three/drei`, `leva`, `zustand`)
- **Depends on** `@repo/l-system-engine` at `workspace:*`
- Contains:
  - **Turtle graphics interpreter** (`core/interpreter.ts`) — converts a `Word` into 3D line segments
  - **Scene renderer** (`components/Scene.tsx`) — Three.js `<lineSegments>` with Gruvbox coloring per depth
  - **UI controls** (`components/LSystemApp.tsx`) — grammar selector, iteration stepper, turtle params (angle, step length, line width)
  - **Grammar definitions** (`grammars.ts`) — 5 preset L-systems (Koch curve, fractal tree, dragon plant, parametric tree, stochastic tree)
- Exports `App` component and CSS styles
- Lazy-loaded by the playground at route `l-system`

## Cross-package boundary

`@repo/l-system-engine` is imported by `@repo/l-system` in 3 files:

| File                        | What it imports                          |
| --------------------------- | ---------------------------------------- |
| `grammars.ts`               | `Grammar` type, rule factories, `symbol` |
| `core/interpreter.ts`       | `Word` type                              |
| `components/LSystemApp.tsx` | `expand` function                        |

**`@repo/l-system-engine` is not consumed by any other package in the monorepo.** `@repo/l-system` is only consumed by `apps/playground`.

## Same pattern as all other engine/UI pairs

This matches every other engine split in the repo:

| Engine                | UI pair             | Runtime deps | Consumed outside pair? | Has tests?   |
| --------------------- | ------------------- | ------------ | ---------------------- | ------------ |
| `automa-engine`       | `automa`            | none         | No                     | No           |
| **`l-system-engine`** | **`l-system`**      | **none**     | **No**                 | **Yes (38)** |
| `palette-engine`      | `palette-generator` | `colorjs.io` | No                     | No           |
| `pixel-engine`        | `pixel`             | none         | No                     | No           |
| `randomart-engine`    | `randomart`         | `fast-png`   | No                     | No           |
| `sequence-engine`     | `sequence-renderer` | none         | No                     | No           |

All six pairs follow the same architecture: a pure/renderer-agnostic engine library consumed by a single React-based UI app. The l-system-engine is arguably the **cleanest example** of this pattern — it has the most thoroughly documented API surface and the only test suite among the engines.

## Why keep them separate

1. **Separation of concerns** — The engine does rewriting (pure data transformation). The UI does interpretation + rendering (impure, DOM/WebGL-bound). Mixing them would mean either the engine depends on Three.js (wrong) or the rendering code lives in a non-UI package (confusing).

2. **Testability** — The engine's 38 tests run in milliseconds with no browser, no DOM, no WebGL. Merging would make every test a React/Three.js integration test.

3. **Convention consistency** — The monorepo deliberately splits every project this way. Merging l-system would be inconsistent with the rest of the codebase.

## What could be improved

- **Name clarity**: `@repo/l-system-engine` is purely a rewriting engine. Its README already states this clearly, but a newcomer might expect it to include the turtle interpreter or rendering. Creating and documenting a secondary `@repo/l-system` package for the UI layer is the right structure.
- **No `l-system-engine` tests in CI?** The engine has tests that could be used as a CI gate, but nothing else in the repo required them.
