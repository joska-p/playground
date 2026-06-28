# Package Review: `@repo/automa` vs `@repo/automa-engine`

## Verdict: They are correctly split — keep as two separate packages.

## What each package is

### `@repo/automa-engine` — Pure computation library
- **Zero runtime dependencies** — only dev tooling (eslint, typescript)
- Pure TypeScript: engine logic (`evolve`), grid creation/seeding, step runner, RNG, config constants, type definitions
- Exports multiple entry points: `.`, `./config`, `./grid`, `./types`, `./worker`, `./creature/*`, `./rules/*`
- Contains a standalone **web worker entry point** (`worker.ts`) — this is critical, a web worker must be a standalone module that can be loaded via `new Worker(...)` with no DOM/React dependencies
- No React, no Three.js, no UI code whatsoever

### `@repo/automa` — Vite application (the UI)
- **Depends on**: React, React Three Fiber, three.js, zustand, `@repo/automa-engine`, `@repo/ui`, `@repo/worker-pool`
- Contains: App component, Three.js canvas/scene, UI controls, shaders, Zustand stores, CSS styles
- Imports from `automa-engine` for: config constants, grid creation/seeding, types, rule registry, creature types, and loads the worker via `new Worker(new URL('@repo/automa-engine/worker', import.meta.url))`

## Why they should stay separate

1. **The web worker demands independence.** `worker.ts` is loaded as `new Worker(...)` — it must be a standalone module with no dependency on React, the DOM, or any browser API that isn't available in a worker context. If merged, the worker would pull in all of `automa`'s dependencies, breaking the worker boundary.

2. **Dependency isolation.** `automa-engine` has **zero** production dependencies. `automa` has React, Three.js, zustand, and several workspace packages. Merging them would force every consumer of the engine logic to pull in the entire React/Three.js dependency tree.

3. **Testability.** The engine can be unit-tested in isolation with no DOM, no web worker setup, no canvas — just `evolve(grid, rule) → grid`. If merged, running engine tests would require spinning up a full React/Three.js environment.

4. **Clear separation of concerns.** The boundary is clean: `automa-engine` is *what* the computation is, `automa` is *how it's rendered and controlled*. The engine doesn't know about React, Three.js, or UI state. It takes grids and rules in, returns grids out.

5. **Multiple consumers.** `automa-engine` exports 10 entry points, suggesting it's designed to be consumed in different contexts (main thread, web worker, potentially CLI or tests). The UI app is just one consumer.

## What the imports look like

```
automa (app)
  ├── @repo/automa-engine        (config, grid, types, rules/registry, creature/types, worker)
  ├── @repo/ui                   (UI components)
  ├── @repo/worker-pool          (worker orchestration)
  ├── react / react-dom
  ├── @react-three/fiber / drei
  ├── three
  └── zustand

automa-engine (library)
  └── (zero dependencies)
```

## Minor concern: config bleed

The `config.ts` in `automa-engine` contains both engine-relevant constants (`GRID_DEFAULT_ROWS`, `MAX_STATE_COUNT`) and **camera/framing constants** (`CAMERA_Z`, `CAMERA_FOV`, `CAMERA_NEAR`, `CAMERA_FAR`). These camera constants are only used by the UI (`AutomatonCanvas.tsx`, `useCameraFitter.ts`) and don't belong in the engine package. This is a minor leak — worth moving to `automa` if you care about a perfectly clean boundary, but not a reason to merge the packages.
