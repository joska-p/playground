# Playground — Repository Overview

> Overview document written from the repository **structure, package manifests and directory layout only** (no deep code audit). Its purpose is to give an external developer or an AI agent enough architectural context to advise on structure and cleanup. All claims are structural observations, not code-level findings.

---

## 1. Global structure & stack

A pnpm + Turborepo monorepo for **creative coding experiments**: generative art, data-viz and "visual toys". It is a personal lab ("recreational, always-evolving"), documented as a shared consciousness.

### Topology

```
playground/
├─ apps/
│  ├─ playground/     # Astro site — hosts every experiment + docs site
│  └─ storybook/      # Storybook instance — UI components & stories
├─ packages/          # 27+ workspace packages (engines, experiments, infra)
├─ drafts/            # exploratory notes, prompts, refactor inventories (non-code)
├─ codex/             # SSOT knowledge: docs/ (conventions, explanation, how-to)
│                     # + knowledge/inbox (rules, ideas, bugs, snippets)
├─ scripts/, turbo/, .devcontainer/
```

### Stack (from root manifest + catalog)

- **Monorepo**: pnpm `11.17` (catalog + overrides), Turborepo, typedoc base
- **Frontend**: Astro, **React 19** (Compiler-native memoization, `useSyncExternalStore`, `useEffectEvent`), Tailwind CSS 4, Storybook 10
- **Graphics**: `three` + `@react-three/fiber` + `@react-three/drei` (R3F), `p5`, `canvas`, WebGL/WebGPU shaders, `fast-png`
- **State**: `zustand` (ubiquitous, the "Bridge" layer)
- **Color**: `colorjs.io`
- **Tooling**: ESLint 10, TypeScript `~6`, Prettier (many plugins), Vitest 4 + Playwright, `tsx`
- Shared config lives in `@repo/config-eslint` and `@repo/config-typescript`

---

## 2. The shared mental model (repo-wide convention)

Every package follows one architecture, codified in `codex/docs/explanation/architecture.md`. Three jobs, always in order:

1. **Logic** — pure functions/data/rules; runs unchanged in Node, Worker or browser.
2. **Bridge** — Zustand. Holds values between renders, connects Logic to Screen. Store `create()` stays private; components reach it through **getter hooks** (`useSteps()`) and plain **setters** (`setSteps()`).
3. **Screen** — React components reading state via hooks and dispatching events.

Pluggable packages split Logic further into **Definition → Registry → Engine Core**. Standard component tree: `ErrorBoundary > Main (canvas/R3F/CSS Grid/SVG) + ControlPanel > sections`.

**This uniformity is both the biggest asset and the biggest duplication driver** (see §6).

---

## 3. Inventory of apps & experiments

Grouped by subject. **Maturity** is inferred from naming/structure (`*-next` = rewrite, engine-split = refactored, bare = older).

### 3.1 Apps (hosts)

| Package           | Role                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| `apps/playground` | Astro site; renders every package as a live page + hosts the docs site |
| `apps/storybook`  | Component/story playground                                             |

### 3.2 Random art — _text seed → abstract art_ ⚠️ highest duplication

| Package                 | Notes                                                                                                         | Maturity |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- | -------- |
| `randomart`             | legacy text→art, `useAnimationLoop`                                                                           | older    |
| `randomart-next`        | rewrite of the app                                                                                            | current  |
| `randomart-engine`      | legacy grammar→expression-tree→CPU buffer/WebGL shader compiler (`compile/format/grammar/random/render/tree`) | older    |
| `randomart-engine-next` | next-gen engine, subpath registries (operators, rules, behaviors, colorspaces)                                | current  |

### 3.3 Image manipulation & pixels ⚠️ overlap

| Package              | Notes                                                                                          | Maturity |
| -------------------- | ---------------------------------------------------------------------------------------------- | -------- |
| `pixel`              | "Interactive API docs" for the image pipeline w/ live examples (`processor/worker/react/docs`) | current  |
| `pixel-manipulator`  | actual manipulation tool (canvas + workers)                                                    | current  |
| `image-to-particles` | deconstruct images → physics particle systems                                                  | current  |

### 3.4 Math sequences & signals

| Package             | Notes                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `sequence-engine`   | pure rule-based generator + persistence abstraction (engine extracted)                     |
| `sequence-renderer` | visualization (Recamán, Fibonacci) w/ pluggable renderers; modules incl. Fourier epicycles |
| `oeis-signal`       | personal composable signal package for integer sequences (core/middle/viz)                 |

### 3.5 Fractals

| Package      | Notes                                                             |
| ------------ | ----------------------------------------------------------------- |
| `mandelbrot` | deep-zoom explorer, perturbation theory + BigInt reference orbits |
| `fracture`   | interactive WebGL fractal                                         |

### 3.6 Cellular automata

| Package     | Notes                                                                        |
| ----------- | ---------------------------------------------------------------------------- |
| `automa`    | Conway's Game of Life — Web Worker stepping, editable grid, R3F orthographic |
| `real-life` | GPU continuous automaton, smooth growth/decay fields (shaders/)              |

### 3.7 L-systems

| Package           | Notes                                                                          |
| ----------------- | ------------------------------------------------------------------------------ |
| `l-system-engine` | grammar-agnostic rewriting engine (deterministic/stochastic/context-sensitive) |
| `l-system`        | 3D visualizer with interactive turtle graphics                                 |

### 3.8 3D / rendering

| Package       | Notes                                                                      |
| ------------- | -------------------------------------------------------------------------- |
| `three-stage` | 3D stage for rendering/animating objects                                   |
| `smith-tutte` | engine + components (no description)                                       |
| `art-canvas`  | "art" in canvas via shaders + logarithms (assembly/modules/shaders/stores) |

### 3.9 Drawing framework

| Package | Notes                                                                                                                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `glaze` | **2D drawing immediacy + WebGL shader canvas framework** — state-buffer simulations, gestures; split `core/cpu/gpu/react`. This is the repo's homegrown attempt to standardize canvas + render loop. |

### 3.10 Other subjects

| Package                 | Notes                                                                          |
| ----------------------- | ------------------------------------------------------------------------------ |
| `palette-engine`        | color spaces + harmony rules (OKLab/OKLCh/HSL/sRGB) — pure engine              |
| `palette-generator`     | higher-level scheme generator                                                  |
| `mosaic-maker`          | CSS-Grid procedural mosaics from palettes                                      |
| `graph-viz`             | interactive graph, click/search/filter by community                            |
| `radu-machine-learning` | ML visualizations (decision boundaries, distributions, student model training) |
| `tlc`                   | **UI component kit** (primitives/layout/lib) — closest thing to a `@repo/ui`   |

### 3.11 Shared infrastructure

| Package             | Role                                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| `worker-pool`       | Web Worker concurrency: pooling, queuing, Transferable buffers, teardown |
| `config-eslint`     | shared ESLint config                                                     |
| `config-typescript` | shared tsconfig baselines                                                |
| `workshop`          | experiments/kit/stores — scratch space                                   |

---

## 4. Internal mini-frameworks & abstractions

The repo has quietly produced several "homegrown frameworks":

- **`glaze`** — a canvas+WebGL render framework (surface, frame loop, clock store, state-buffer simulation, gesture handling, GPU/CPU paths). The most ambitious abstraction.
- **The Definition → Registry → Engine pattern** — repeated in `randomart-engine(-next)`, `sequence-engine`, `palette-engine`, `l-system-engine`. Engine-split packages (`*-engine`) are the mature form of an app's logic extracted for reuse.
- **Zustand Bridge pattern** — `store` (private) + `actions.ts` / `selectors/`, getter-hook/setter split, enforced repo-wide.
- **`worker-pool`** — shared concurrency layer used by pixel/automa-style packages.
- **`tlc`** — de-facto UI primitive library.
- **Control-panel GUI** — described in docs as `@repo/ui/control-panel`, intended as shared GUI.

---

## 5. Readiness / maturity heat-map

| Tier                            | Packages                                                                                                                   | Signal                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **Current / maintained**        | `randomart-next`, `randomart-engine-next`, `glaze`, `pixel`, `real-life`, `automa`, `worker-pool`                          | rewritten or actively structured |
| **Engine-extracted (reusable)** | `sequence-engine`, `palette-engine`, `l-system-engine`                                                                     | clean Logic split                |
| **Legacy / superseded**         | `randomart`, `randomart-engine`                                                                                            | superseded by `-next` twins      |
| **Older experiments**           | `mandelbrot`, `fracture`, `three-stage`, `smith-tutte`, `art-canvas`, `graph-viz`, `radu-machine-learning`, `mosaic-maker` | pre-`*-engine` shape             |
| **Scratch / infra**             | `workshop`, `config-*`                                                                                                     | support, not experiments         |

---

## 6. Redundancies & mutualization candidates

### 6.1 Obvious duplicates (same subject, two generations)

- **`randomart` / `randomart-next`** and **`randomart-engine` / `randomart-engine-next`** — two full generations of app + engine coexisting. Candidates for removal or unification under the `-next` line.
- **`pixel` / `pixel-manipulator`** — overlapping image-pipeline scope (one is "docs+examples", the other the tool; unclear boundary, worth one package or a clean split).

### 6.2 Repeated infra _within_ render packages (mutualization targets)

The doc's standard component tree plus the render packages reproduce the same scaffolding everywhere, with no shared home:

- **Render / animation loop** — `FrameLoop`, `useAnimationLoop` (present in `glaze`, `randomart`, `randomart-next`, `sequence-renderer`, `image-to-particles`), `raf` scheduling, frame-token/end-frame contracts, clock/stepping (`glaze/src/react/clockStore`).
- **Canvas setup / surface** — `setupCanvas`-style init + resize + DPR handling duplicated across `glaze`, `image-to-particles`, `sequence-renderer`, `art-canvas`, `mandelbrot`, `fracture`, `real-life`.
- **GPU/CPU picking parity** — a known cross-cutting concern (see `codex/knowledge/inbox/rule_gpu-cpu-picking-parity`).
- **Control-panel GUI** — referenced as `@repo/ui/control-panel` in docs but **no `ui` package exists**; `tlc` looks like the real home. Doc ↔ code drift.
- **Zustand store scaffolding** — the `store`/`actions`/`selectors` layout is copy-pasted per package (`conventions/state` documents it; a codegen/scaffold would remove the duplication).
- **Shader handling / GLSL** — shader collections scattered (`real-life/shaders`, `glaze/gpu`, `art-canvas/shaders`, `fracture`).

### 6.3 Natural grouping of a shared package

The strongest candidates for a single shared runtime package (or 2):

1. **`@repo/render-core`** — render loop, clock/RAF + stepping, canvas surface/setup/resize/DPR, frame-end contract, GPU/CPU picking. Absorbs what `glaze` started but currently only `glaze` owns.
2. **`@repo/ui` (or formalize `tlc`)** — control-panel GUI + primitives, replacing the `@repo/ui/control-panel` doc reference.
3. Keep **`worker-pool`** as the concurrency brick; fold image-manipulation reuse of it into a documented contract.

### 6.4 Doc / reality drift worth fixing

- Docs reference `@repo/ui/control-panel` and `@repo/pixel-engine` / `@repo/sequence-engine` in the README; the packages dir has **no `ui` and no `pixel-engine`** (only `pixel`, `pixel-manipulator`, `sequence-engine` exists). README package table is stale.

---

## 7. Recommendations (at-a-glance)

1. **Collapse the two generations**: retire `randomart` + `randomart-engine`, keep `-next` twins. Resolve `pixel`/`pixel-manipulator` boundary.
2. **Extract `@repo/render-core`** from the repeated loop/canvas/clock/picking scaffolding (garden the `glaze` experiment into the shared brick).
3. **Formalize the UI package** (`@repo/ui` from `tlc`) and update the `@repo/ui/control-panel` doc references.
4. **Scaffold the Zustand store layout** (`turbo gen` already exists for packages) to stop copy-pasting the Bridge skeleton.
5. **Refresh README package table** and `codex/docs/explanation/architecture.md` to match the real package inventory.
6. **Triage `drafts/` + `workshop`** into kept ideas vs. archive.

---

## Appendix — Legend / how this was built

- Sources: `apps/*`, `packages/*/package.json` (descriptions), `packages/*/src` subdirectory layout, `pnpm-workspace.yaml` catalog, root `package.json`, `codex/docs/explanation/architecture.md`.
- No source files were read; maturity is inferred from structure/naming only.
- The SSOT (single source of truth) for conventions lives in `codex/docs/` and `codex/knowledge/inbox/`.
