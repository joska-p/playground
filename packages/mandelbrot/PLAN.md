# @repo/mandelbrot — Driving Plan

This document drives the project: what we're building, how it's structured, and the
ordered work. It consolidates `REVIEW.md` (how the current code works + what's wrong)
and `REPORT-perturbation-ultimate.md` (the mandelbrot ↔ fracture comparison + merged
blueprint) into one actionable plan. Read those for depth; read this for direction.

---

## 1. Vision

`@repo/mandelbrot` becomes a **bespoke framework for exploring the Mandelbrot set**: one
app shell over a set of shared building blocks — BigFloat view math, a reference-orbit
pipeline, a double-single GLSL library, orbit textures, and a per-renderer store factory —
that hosts **multiple independent visualizers** you can switch between.

Two consequences that shape everything:

- **The app is a framework, not a single renderer.** Different implementations of the same
  fractal sit side by side in one registry (see §3), exactly so you can compare them.
- **The stack is the monorepo's, not bespoke.** The hand-rolled WebGL `renderer.ts` is
  deleted; rendering moves onto `@repo/glaze` (`GpuCanvas` + per-frame `uniforms`, which
  already accepts raw `WebGLTexture` values as uniforms — see `setUniforms.ts:19`). The
  BigInt reference-orbit compute moves onto `@repo/worker-pool`. fracture stays untouched
  as the experimental sibling; only its ideas and visualizers migrate.

## 2. State of the code today

### What already works (keep)

- **BigFloat arbitrary-precision center** (`big-float.ts`, BigInt fixed-point, no deps) +
  log2-magnification zoom + `precisionForZoom = ⌈zoom⌉ + 52` bits (`view.ts`).
- **Perturbation + rebasing + DE + OKLCH shader** (`shaders.ts`) — mathematically correct,
  rebasing is exact here, reference escape radius `1e12` vs per-pixel `1024` is a legit trick.
- **Lazy reference recompute** with drift thresholds (`0.35h` px, `Δzoom > 2`, `> 1.3×`
  orbit length), a token guard against superseded orbits, and a clamped iteration budget.
- **Correctness details**: DPR cap 2, `preventDefault` on wheel, pointer capture,
  Strict-Mode-safe init, context handled.

### What's wrong (fix)

1. **The worker is fake.** `reference-worker.ts` does `await Promise.resolve()` then runs
   the BigInt loop synchronously on the main thread — a multi-hundred-ms freeze at deep
   zoom. This is the single biggest gap.
2. **Broken export**: `package.json` `exports["./styles"]` points at `styles.css`; the
   file is `global.css`.
3. **Duplicated** `toNumber` (`toNum` in the viewer re-implements `big-float.ts:toNumber`).
4. **Dead code**: `formatCoord` (view.ts), `scale2`, `cmp`, `magSq`, `_TWO` (big-float.ts),
   the `escaped` flag thread.
5. **Layering**: `LookState` lives in `control-panel.tsx`; move the look model to a lib.
6. **Repo-convention clash**: manual `useCallback`s trigger React-Compiler warnings; drop them.
7. **45 ESLint errors** (mostly `--fix`-able; interface→type and `void`-prefix manual).
8. **Stale README** ("Scaffolded demo showcasing Zustand + Zod").

## 3. Renderer registry

Each renderer is a self-contained module — `{ component, store, shader }` — with its own
view and params. **No shared zoom/pan state across renderers**; if a unified view is ever
wanted, a shared store can wrap the same helpers later.

| # | Renderer | Source | Precision | Needs reference? | Ships in |
| - | -------- | ------ | --------- | ---------------- | -------- |
| 1 | **Classic** | fracture `OriginalScene` | float32 escape-time | no | Phase 3 |
| 2 | **Double-split** | fracture `DoubleSplitScene` | double-single, no reference | no | Phase 3 |
| 3 | **Perturbation** | fracture `PerturbationScene` | ref orbit + DS, float64 center | yes | Phase 3 |
| 4 | **Reference/DE** | current mandelbrot renderer | BigFloat ref + rebase + DE + OKLCH | yes | Phase 2 |
| 5 | **Ultimate** | merge of #4 ↑ fracture's rigor | BigFloat ref + DS seeding + rebase + CP + secondary orbit + analytical normals | yes | Phase 4 |

Renderers 1–3 clamp to their precision ceiling (Classic ~1e1, Double-split ~1e4,
Perturbation ~1e15); 4–5 go arbitrarily deep.

## 4. Architecture (inside `packages/mandelbrot`)

```
src/framework/                  ← pure building blocks, NO shared state
  big-float.ts                  ← current, unchanged
  view.ts                       ← current BigFloat view helpers (pure)
  look.ts                       ← LookState model (from REVIEW 2.2#5)
  reference/
    orbit.ts                    ← BigInt orbit compute, dependency-free (worker payload)
    worker.ts                   ← @repo/worker-pool adapter (factory + serialize/deserialize)
    policy.ts                   ← drift thresholds + token superseding (app-owned)
  runtime/orbit-textures.ts     ← fixed 2048-wide RG32F, texSubImage2D reuse, context-restore re-upload
  shaders/
    ds.glsl                     ← unified double-single library (fracture's forms)
    perturbation.glsl           ← perturbation + rebase + glitch + DE + CP
    color.glsl                  ← OKLCH
  stores/createRendererStore.ts ← per-renderer view + params factory
src/renderers/                  ← the 5 registry entries, one module each
src/shell/                      ← thin: renderer switcher + shared chrome
src/components/                 ← current control-panel.tsx, hud.tsx (migrate to shell/)
```

Framework layering: data (`big-float`, `view`, `look`) → reference pipeline → shaders →
stores → renderers → shell. Each level depends only on the one below.

## 5. Locked decisions

- **Framework lives inside `@repo/mandelbrot`** (`src/framework/`), extractable later if a
  second consumer appears. No new package now.
- **Per-renderer stores.** Each visualizer owns its view + params independently; no unified
  zoom/pan correlation.
- **App owns policy, pool owns dispatch.** Token superseding + drift thresholds stay at the
  app layer; `@repo/worker-pool` only dispatches and queues. No cancellation feature added
  to worker-pool.
- **Worker bundling**: Vite module worker (`new Worker(new URL('./…', import.meta.url),
  { type: 'module' })`) behind `WorkerPool.workerFactory`; `MockWorkerPool` in tests.
- **glaze replaces the bespoke renderer.** Reference orbit uploads as a raw `WebGLTexture`
  uniform (glaze auto-assigns texture units). Context-loss re-upload handled via glaze's
  `webglcontextrestored` listener + a re-upload hook (fracture's pattern).
- **`1e38` float32 uniform wall** is a documented frontier, not engineered now.
- **fracture stays as-is.** Only its visualizers and shader ideas migrate.
- **Ultimate is a Phase-4 milestone**, a distinct 5th renderer — not a replacement.

## 6. Phases

### Phase 0 — Housekeeping
- Fix `exports["./styles"]` → `./src/styles/global.css`.
- Import `toNumber` instead of `toNum`; delete dead exports and the `escaped` thread.
- Move `LookState`/`DEFAULT_LOOK`/`lookToParams` → `framework/look.ts`; panel becomes a pure view.
- Drop manual `useCallback`s (React Compiler).
- `lint-fix` + manual interface→type and `void`-prefixed promise passes (REVIEW 2.3).
- Refresh `README.md`; keep `REVIEW.md`/`REPORT` as references.

*Done when:* `pnpm --filter @repo/mandelbrot lint` and `check-types` are clean.

### Phase 1 — Real worker
- Move `computeReferenceOrbit` + `big-float.ts` behind a module worker entry.
- Wire through `@repo/worker-pool`: `serialize` sends the view request, `deserialize`
  returns the `Float32Array` orbit (transferable).
- Keep drift policy + token superseding in `reference/policy.ts`.
- Chunked main-thread fallback (no workers) so the UI never freezes.
- HUD "ref" pulse driven by the real in-flight flag.

*Done when:* deep-zoom reference recompute never blocks the main thread; test uses
`MockWorkerPool`.

### Phase 2 — Glaze shell (Reference/DE)
- Delete `renderer.ts`; render through `GpuCanvas` + per-frame `uniforms`, porting the
  texture/uniform plumbing (pattern: `packages/fracture/.../PerturbationScene.tsx:109-209`).
- Orbit texture via raw `WebGLTexture` uniform; `texSubImage2D` reuse when dims match;
  re-upload last orbit on `webglcontextrestored`.
- `FrameLoopProvider`/`useFrame` for the HUD; `@repo/ui/control-panel` for the sliders.
- The current viewer becomes the **Reference/DE** registry entry (component + store + shader).
- Keep the BigFloat view math; only translate at the canvas boundary.

*Done when:* Reference/DE renders identically to today, with context-loss recovery.

### Phase 3 — The framework + the 4 renderers
- Extract `framework/` (view, reference pipeline, orbit textures, DS/color shaders,
  `createRendererStore`).
- Migrate fracture's three visualizers as independent renderers with their own stores
  (Classic, Double-split, Perturbation), zoom-clamped to their ceilings.
- Shell: renderer switcher + shared chrome (HUD, reset, error card, budget slider per
  renderer where it applies).

*Done when:* all 4 renderers switchable in one app; per-renderer params persist on switch.

### Phase 4 — Ultimate (5th renderer)
- Unify `ds.glsl` (fracture's full-error `ds_add/ds_sub`, split-8193 `ds_mul`,
  `2X·δ` fast path) with the existing `df32` complex-DS struct.
- Merge Reference/DE with fracture's rigor: DS delta **seeding**, exact `X_{i+1}+δ`
  reconstruction, secondary-orbit + Pauldelbrot glitch fallback, continuous-potential
  interior, analytical normals.
- **Spike first:** the rebasing ↔ reconstruction interaction (REPORT §5.2 — the two must
  agree on the reference index).
- Raise shader loop bound to 65536, gated by `uMaxIter` (never a magic constant).

*Done when:* glitch-free renders deeper than Reference/DE alone at the same zoom, with
interior relief and crisp filaments.

### Phase 5 — Polish & tests
- Per-renderer HUD/reset/error/budget; measure deep-zoom perf at 60k budget (shader does
  two `texelFetch`s per iteration).
- vitest: view math, BigFloat round-trips, orbit compute via `MockWorkerPool`.

## 7. Risks & disposition (from REPORT §5)

| Risk | Disposition |
| ---- | ----------- |
| Worker bundling strategy | **Decided** — Vite module worker + `@repo/worker-pool` (§5). |
| Rebasing ↔ reconstruction interaction | **Spike in Phase 4**; shader-level testing, subtlest merge point. |
| GPU iteration budget / 60fps | **Measure in Phase 5**; keep 60k cap + budget slider. |
| `1e38` float32 uniform wall | **Documented frontier**; DS pair buys one extra factor only. |
| Interior past reference iterations | **Mitigated** by secondary orbit, not solved; future work. |
| `maxIter`-driven reference recompute | **Keep** in Reference/DE and Ultimate stores. |

## 8. Non-goals

- No unified zoom/pan across renderers (unless requested later).
- No fracture convergence or `@repo/mandelbrot-core` extraction yet.
- No zoom beyond the `1e38` uniform wall.
- No streaming/observable workers (`@repo/worker-pool` explicitly doesn't do this).
- No new dependency beyond `@repo/glaze` and `@repo/worker-pool`.
