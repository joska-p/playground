# Package Review: `@repo/pixel-engine` vs `@repo/pixel` vs `@repo/pixel-manipulator`

## Verdict: All three are correctly separate — keep as three independent packages.

Three clean architectural layers: **engine → API → app.** Each serves a distinct purpose and consumers.

---

## What each package is

### `@repo/pixel-engine` — Pure computation library

- **Zero production dependencies** — only dev tooling (eslint, typescript)
- Pure TypeScript: pipeline runner (`pipeline-runner.ts`), step dispatcher, fusion scheduler, neighborhood tiling, buffer manager, registry, types, manipulation factories
- Ships the actual manipulation definitions (`manipulations/pixel/`, `manipulations/neighborhood/`, `manipulations/whole/`)
- No React, no DOM (beyond `ImageData`, a web API), no UI of any kind
- Exports 9 separate entry points for tree-shakeable consumption

### `@repo/pixel` — Reusable API surface + demo showcase

- **Depends on**: `@repo/pixel-engine`, `@repo/worker-pool`, `@repo/ui`, React
- Exports the `pixel` API object (`pixel.run()`, `pixel.manipulations`) — wraps the engine in a `WorkerPool` with serialization/deserialization
- Contains a `pipeline-worker.ts` entry point (loaded via `new Worker(...)`) that imports `@repo/pixel-engine/pipeline-runner` and `@repo/pixel-engine/manipulations/manifest`
- Ships React hooks (`usePixel`) and a `TryItOut` demo component
- Has its own App entry point, own styles, own demo pages — acts as both distributable API and interactive catalog

### `@repo/pixel-manipulator` — Full application

- **Depends on**: `@repo/pixel`, `@repo/ui`, zustand, React
- Full app with workflow management (add/remove/reorder manipulation steps), output card grid with zoom/download, image source selection, state persistence
- Uses `@repo/pixel` to run manipulations — does not import from `pixel-engine` directly
- Is the concrete end-user application

---

## Why `pixel-engine` and `pixel` should stay separate

The relationship is identical to the already-reviewed `automa-engine` / `automa` split — same pattern, same reasoning.

1. **The web worker demands independence.** `pipeline-worker.ts` is loaded as `new Worker(...)` — it must be a standalone module with no dependency on React, the DOM, or any browser API unavailable in a worker context. If merged, the worker would pull in React/UI dependencies, breaking the worker boundary. The worker currently imports only from `pixel-engine` (pure computation) — that's correct.

2. **Dependency isolation.** `pixel-engine` has **zero** production dependencies. `pixel` has React, worker-pool, and `@repo/ui`. Merging them would force every consumer of the engine logic to pull in the entire React dependency tree.

3. **Testability.** The engine (pipeline runner, fusion scheduler, neighborhood tiling) can be unit-tested in isolation with no DOM, no web worker setup, no React. If merged, engine tests would require a React/UI environment.

4. **Clear separation of concerns.** The boundary is clean: `pixel-engine` is _what the computation is_, `pixel` is _how it's exposed to the application_ (via workers + a clean API). The engine doesn't know about workers, React, or UI state. It takes `ImageData` and steps in, returns `ImageData` out.

5. **Multiple consumers.** `pixel-engine` exports 9 entry points — it's designed to be consumed in different contexts: main thread (via `pixel`), web worker (`pipeline-worker.ts`), and potentially CLI or headless environments. The `pixel` package is just one consumer.

## Why `pixel` and `pixel-manipulator` should stay separate

1. **Reusability.** `pixel` provides a reusable API (`pixel.run()`, `usePixel` hook) that any application could consume. `pixel-manipulator` is a specific application built on it. If someone wanted to build a different manipulation UI (e.g., a CLI tool, a batch processor, a different app), they'd reuse `pixel` without importing `pixel-manipulator`.

2. **Different concerns.** `pixel` is about the API boundary — worker pool management, serialization, hook ergonomics. `pixel-manipulator` is about the user experience — workflow state management (zustand), output rendering, download/zoom interactions. These evolve independently.

3. **Dependency weight.** `pixel-manipulator` pulls in zustand for complex state management that `pixel` doesn't need. Merging them would saddle `pixel`'s consumers with zustand whether they use it or not.

---

## What the dependency graph looks like

```
pixel-manipulator (app)
  ├── @repo/pixel              (API: run(), hooks, TryItOut demo)
  │     ├── @repo/pixel-engine     (pipeline, types, manipulations)
  │     ├── @repo/worker-pool
  │     ├── @repo/ui
  │     └── react / react-dom
  ├── @repo/ui
  ├── zustand
  └── react / react-dom

pixel-engine (library — zero production deps)
  └── (nothing)
```

## Minor concern: `@repo/pixel` is a hybrid package

`@repo/pixel` straddles two roles: it's both a **distributable API library** (the `pixel.run()` / `usePixel` surface that other apps consume) **and a demo application** (its own `App.tsx`, `main.tsx`, demo pages, styles). This is not inherently wrong — it's a common pattern for SDK-style packages — but if the demo gets large, consider either:

- Splitting demo components into `pixel-manipulator` (and having `pixel` be pure API), or
- Re-exporting the `TryItOut` demo from `pixel-manipulator` with `pixel` staying lean.

As it stands, the current size is fine. Worth watching as the demo grows.
