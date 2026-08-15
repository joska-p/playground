---
name: package-shape
description: Use when designing a new package, organizing src/ directories, structuring data flow, or deciding where logic, state, and components belong.
---

# Package shape

Source: `apps/playground/src/content/docs/explanation/architecture.md` and `explanation/engine-patterns.md`.
A map, not a checklist — deviating is fine if the package README notes why.

## src/ directories

| Dir          | Role                                                                  |
| ------------ | --------------------------------------------------------------------- |
| `core/`      | Pure logic — no React, no DOM, no store imports. Runs anywhere.       |
| `components/`| React components, one file per component.                             |
| `stores/`    | Zustand stores, each domain in its own subdirectory.                  |
| `hooks/`     | React hooks.                                                          |
| `utils/`     | Default home for pure helpers.                                        |
| `lib/`       | Third-party wrappers only (initialization, adapter). Rarely used.     |
| `data/`      | Static data files only (JSON, images) — never code.                   |

- No top-level files in `src/`.
- A `core/` domain past ~200 lines → split into a subdirectory (`core/parser/`).

## The three jobs — data flows one way

- **Logic** — pure functions/data. Never imports React, never reads the store.
- **Bridge** — Zustand. Holds state between renders. Doesn't compute, doesn't fetch.
- **Screen** — React components. Reads via getter hooks, dispatches via setters. Never computes a result itself — even trivial ones.

Events: Screen → Bridge → Logic, results flow back Logic → Bridge → Screen. Never backwards.

A Bridge earns its place only when state is read from more than one place or must persist between renders. One-shot transforms: call Logic from the Screen directly.

## Pluggable behavior → definition/registry split

Trigger: "how do I add a new *kind* of X" (a rule, a tile shape, a manipulation).

- **Definitions** — plain data or factory functions, keyed by id, serializable (worker-safe).
- **Registry** — how the UI finds definitions. Pick by need: `Map` for fetch-by-id, array for list-all, facade for a few definitions.
- **Engine Core** — pure processor that consumes a definition.

Execution default: pure sync function. Tick loop / worker pool only when the problem demands it.
