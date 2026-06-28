# Package Review: `@repo/randomart` vs `@repo/randomart-engine`

## Verdict: **Keep separate** — well-motivated split.

The two packages have a clean seam. Merging them would erase a real architectural boundary without meaningful benefit.

---

## What each owns

| Concern                                               | `randomart-engine` | `randomart` |
| ----------------------------------------------------- | ------------------ | ----------- |
| Core types (`ExpressionNode`, `GrammarRule`)          | ✅                 |             |
| 19 grammar rules + registry                           | ✅                 |             |
| Tree building / evaluation / GLSL compilation         | ✅                 |             |
| `SeededRandom` PRNG                                   | ✅                 |             |
| Animation behaviors (15 built-in)                     | ✅                 |             |
| CPU pixel-buffer rendering                            | ✅                 |             |
| PNG export                                            | ✅                 |             |
| AST formatting (`nodeToMathString`, `nodeToTreeView`) | ✅                 |             |
| Zustand store, selectors, actions                     |                    | ✅          |
| WebGL hooks (context, shader, animation loop)         |                    | ✅          |
| React components (canvas, inspector, controls)        |                    | ✅          |

**`randomart-engine`** is a pure TypeScript library: no DOM, no framework, no React. It could be imported from a Node script, a Deno CLI, or a different web framework without changing a line.

**`randomart`** is a React + Vite application layer built _on top of_ the engine. It imports the engine as a dependency.

## The dependency chain

```
randomart-engine  (zero dependencies except fast-png for export)
       │
       ▼
    randomart  (React + Zustand + Vite)
```

The direction is one-way. No circular dependency, no leaky abstraction.

## Consumers (besides randomart)

Only **one** other package lists `@repo/randomart-engine`: `@repo/sequence-engine`. But it has **zero imports** from it in source — the dependency is likely stale. Real-world consumers: just `randomart`.

## Why separate — the good reasons

1. **Different dependency profiles.** The engine pulls in nothing (just `fast-png`). The UI pulls in React, React DOM, Zustand, Vite, Tailwind, Babel, eslint configs. Merging them would force engine consumers to transitively download a React toolchain they don't need.

2. **Testability & CI.** The engine can be typechecked and linted in isolation — no DOM, no jsdom setup, no browser polyfills. Faster CI feedback for engine changes.

3. **Reusability seam.** If someone wanted to write a CLI that generates randomart PNGs headlessly (e.g., as a screensaver generator), they'd import only the engine. No React overhead.

4. **Publishing boundary.** The engine could be published to npm independently. The UI package is tied to this monorepo's React setup.

5. **Cognitive load.** The engine's internals (recursive tree walking, GLSL codegen) are dense. The UI's internals (Zustand subscriptions, WebGL lifecycle, React re-renders) are a different kind of dense. Keeping them separate means you never have to hold both in your head at once.

## Why merge — the arguments (and why they're weak here)

| Argument                                         | Counter                                                                                                                                  |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| "Only one real consumer"                         | True now, but a headless API surface is a cheap option. Splitting later is expensive.                                                    |
| "Two packages = two tsconfigs, two lint configs" | Turborepo handles this trivially; the overhead is close to zero.                                                                         |
| "Coordinated changes need cross-package PRs"     | The engine API is stable (types + pure functions). Nearly all UI changes touch only `randomart`. Cross-package PRs are rare in practice. |

## What could be improved

- **`sequence-engine`** has `@repo/randomart-engine` as a dependency with zero imports. Remove it.
- The engine has **no tests**. The biggest argument for merging would be "we want to add tests but the package boundary makes it harder" — but that's not a boundary problem, it's a missing-tests problem.
- No `build` step in either package's scripts (just `lint` and `check-types`). Fine for a monorepo, but if you ever wanted to publish the engine, you'd need an `exports` map that points to compiled output rather than raw TS source.

## Bottom line

Keep the split. It's a textbook example of the **deep module** pattern: the engine hides complexity behind a small API surface, and the UI layer is a separate concern that depends on it. Merging them would increase coupling, increase dependency weight, and remove a clean seam for zero runtime benefit.
