# Perturbation Mandelbrot — Implementation Comparison & "Ultimate" Blueprint

Scope: `packages/fracture/src/components/PerturbationScene.tsx` (+ `core/perturbationOrbit.ts`, `core/createPerturbationPipeline.ts`, `core/mandelbrot-perturbation.frag`) vs `packages/mandelbrot/src/components/mandelbrot-viewer.tsx` (+ `lib/big-float.ts`, `lib/reference-orbit.ts`, `lib/reference-worker.ts`, `lib/mandelbrot/view.ts`, `lib/webgl/renderer.ts`, `lib/webgl/shaders.ts`).

Both implement the same idea — factor every pixel's orbit as `Z_n = X_n + δ_n` where `X_n` is a single high-precision _reference orbit_ computed once on the CPU and streamed to the GPU as an RG32F texture, and per-pixel deltas iterate cheaply on the GPU in emulated double precision ("double-single"). But they make opposite trade-offs in almost every dimension. This document compares them and recommends a merged architecture.

---

## 1. Side-by-side

| Concern                    | **fracture**                                                                                                | **mandelbrot**                                                                                                     | Better                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Center precision           | float64 (`MAX_ZOOM = 1e15` hard cap)                                                                        | BigFloat (BigInt fixed-point), arbitrary, `precisionForZoom = zoom + 52` bits                                      | mandelbrot                                                                              |
| Zoom convention            | linear magnification                                                                                        | log2 magnification                                                                                                 | mandelbrot (avoids float overflow, matches `precisionForZoom`)                          |
| Reference math             | float64 sync loop, cheap                                                                                    | BigInt loop, expensive                                                                                             | fracture is fast, mandelbrot is exact — combine                                         |
| Reference threading        | synchronous in `useFrame` on main thread                                                                    | nominally async, **but actually a main-thread loop** (`await Promise.resolve()` then sync BigInt) — no real worker | neither; needs a real worker                                                            |
| Recompute trigger          | every frame the float center/zoom changes (even 2px pans)                                                   | lazy: pointer-up/wheel/reset + drift threshold (`distPx > 0.35·h`, `                                               | Δzoom                                                                                   | > 2`, `iters > 1.3·refLength`) | mandelbrot                         |
| Superseded-result handling | n/a (synchronous)                                                                                           | token counter, discarded stale orbits                                                                              | mandelbrot                                                                              |
| Glitch strategy            | 2 reference orbits (center + ~2.5px diagonal) + Pauldelbrot test `                                          | Z                                                                                                                  | ² < 5e-4·                                                                               | X                              | ²` → secondary → clamp to interior | Zhuoran **rebasing** in-shader (` | full | ² <                  | δ                                             | ²`or past ref end →`δ = full`, restart index) | mandelbrot's rebasing is the primary fix; keep fracture's 2nd-ref fallback as a net |
| Exact Z reconstruction     | fetches `X_{i+1}` and builds `Z = X_{i+1} + dz`                                                             | builds `z = Zr + dz` from the _current_ texel                                                                      | fracture (fresher reference point)                                                      |
| Delta seeding              | **double-single**: `u_scale` split `(hi, lo)` via `splitDS`, delta = `ds_mul(scale, offset)`                | **plain float32**: `dc = p·uSpacing + uRefOffset` in one float                                                     | fracture (keeps DS precision all the way into `δc`)                                     |
| DS arithmetic              | `ds_add/ds_sub` full error-corrected, `ds_mul` split 8193, fast-path `cds_mul_Xn` for `2X·δ`                | compact `dsAdd/dsMul` two-product, split 4097                                                                      | unify — fracture's forms are more rigorous and faster for the dominant term             |
| Orbit texture layout       | 1×N, reused via `texSubImage2D` when width unchanged; trimmed to used length                                | fixed 2048×N padded, **always** `texImage2D` realloc                                                               | fixed-width (needed for >2048 orbits) + subImage reuse when dims match                  |
| Texture sizing             | texture resizes whenever iteration count changes                                                            | constant width, grows height                                                                                       | mandelbrot (fewer allocs)                                                               |
| Shader loop bound          | hardcoded `i < 4096` (latent truncation above cap)                                                          | `iter < 100000`, guarded by `uMaxIter`                                                                             | mandelbrot (raise fracture's bound when combining)                                      |
| Iteration budget           | `base + ln(zoom)·scale`, cap 1200 default, exposed sliders (base/octave/cap)                                | `min(60000, (256 + zoom·96)·budget/100)`, budget % slider                                                          | merge: budget-% UX + hard cap sized to GPU budget                                       |
| Escape / bailout           | ref & pixel bailout 65536                                                                                   | ref 1e12 (cheap float check), pixel 1024                                                                           | reference-big + pixel moderate is right; smooth coloring wants the bigger pixel bailout |
| Interior coloring          | continuous-potential from `minMod2` (smooth, tunable `interiorScale`)                                       | near-black tint constant                                                                                           | fracture                                                                                |
| Lighting                   | analytical normals from `dFdx/dFdy` of continuous-potential height + bump (sun angle, bump height, ambient) | distance-estimate normal from `z/der` + directional light + border glow rim                                        | both are complementary                                                                  |
| Border quality             | continuous-potential height (artistic relief)                                                               | true distance estimate (`                                                                                          | z                                                                                       | ·ln                            | z                                  | /                                 | z'   | `) — crisp filaments | mandelbrot for crispness, fracture for relief |
| Color                      | OKLCH in-shader, hue shift/frequency/chroma scale                                                           | OKLCH in-shader, freq/offset/chroma/baseL                                                                          | shared (mandelbrot's is self-contained, fracture's param set is richer)                 |
| Derivative                 | none (no DE)                                                                                                | tracked `der_{n+1} = 2·z·der + 1` for DE + normal                                                                  | mandelbrot                                                                              |
| GL context                 | `createWebGLContext` (shared infra)                                                                         | hand-rolled `canvas.getContext('webgl2', …)`                                                                       | fracture (shared, hardened)                                                             |
| Context-loss restore       | yes (`onContextRestored` → recompile + re-upload last orbits)                                               | no                                                                                                                 | fracture                                                                                |
| Resize                     | ResizeObserver + RAF                                                                                        | dpr recomputed per render                                                                                          | fracture (cheaper)                                                                      |
| View state                 | Zustand store, pan/zoom floats                                                                              | BigFloat `cx/cy` + `zoom`, pure helpers `panByPixels/zoomAtPixel`                                                  | mandelbrot's precision model                                                            |
| Interaction                | shared `usePanZoom` (zoom-to-cursor, `scalePanWithZoom`)                                                    | hand-rolled pointer/wheel                                                                                          | fracture's gestures, mandelbrot's math                                                  |
| Error UI                   | minimal                                                                                                     | full "WebGL2 unavailable" fallback card                                                                            | mandelbrot                                                                              |
| HUD                        | zoom readout only                                                                                           | zoom / re / im / iter / "ref computing" pulse                                                                      | mandelbrot                                                                              |
| Reset                      | canvas remount via key                                                                                      | reset button → `initialView()`                                                                                     | mandelbrot (cheaper)                                                                    |
| Code organization          | reuses `@repo/graphics` (quad pipeline, uniforms, transforms, frame loop)                                   | self-contained renderer class                                                                                      | shared core extracted to a package                                                      |

---

## 2. Where each one is wrong (that the other fixes)

**mandelbrot's weaknesses**

1. **The "worker" is fake.** `computeReferenceAsync` does `await Promise.resolve()` and then runs the full BigInt loop synchronously on the main thread. At the default formula that is up to 60 000 BigInt iterations — a multi-hundred-ms main-thread freeze per reference recompute, exactly at deep zoom where BigInt grows. The HUD pulses "ref" but the page still janks. This is the single biggest thing to fix in the merged version.
2. **Delta `δc` is seeded in plain float32** (`dcx = p.x*uSpacing + uRefOffset.x`), so the whole point of double-single is partially undone at the seed. Fracture splits the scale into `(hi, lo)` and computes the delta in DS. Rebasing masks some of the damage but not the per-iteration `+ dc` error.
3. **Texture reallocates on every reference** — no `texSubImage2D` reuse (fracture has this).
4. **No context-loss recovery.**
5. **Interior is a constant tint** and there is no continuous-potential interior, no per-frame incremental recompute for its own `Look` changes (only `maxIter` triggers reference recompute — look changes just re-render, which is right).

**fracture's weaknesses**

1. **Precision ceiling at `1e15`.** The center is a float64; its own doc comment admits BigInt is required to go deeper. Also `u_zoom` is a float32 uniform, so ~1e38 is a hard wall even if the CPU math improved.
2. **Synchronous, per-frame reference recompute.** Every frame that the float center changes (every drag frame) recomputes both orbits on the main thread. Cheap today only because iteration cap is 1200 and math is float64. It will not survive a BigInt reference or a 60k budget.
3. **No rebasing.** Glitch defense relies on two orbits + a threshold; the doc comment itself flags proper glitch handling as "future work". Glitched pixels are silently rendered as interior (visual noise).
4. **Hardcoded shader loop `i < 4096`** — a latent truncation once iteration caps are raised.
5. **No HUD, no error fallback, no reset affordance, no iteration budget slider** (only raw base/scale/cap sliders).

---

## 3. Recommended "ultimate" architecture

Target: arbitrarily deep zoom (BigFloat center), smooth 60fps interaction, no main-thread freezes, minimal glitches, crisp borders **and** artistic 3D relief, robust to context loss, reusable across the monorepo.

### 3.1 Precision & view model — from mandelbrot

- `View = { cx: BigFloat, cy: BigFloat, zoom: number }` where `zoom` is log2 magnification; `precisionForZoom(zoom) = max(64, ⌈zoom⌉ + 52)`; `reprecision`, `panByPixels`, `zoomAtPixel` as pure helpers (`lib/mandelbrot/view.ts`). `BASE_SPAN_Y = 3.0` matches fracture's `WORLD_SCALE`.
- `big-float.ts` (BigInt fixed-point, native, no deps) is the correct reference math engine. Keep it.

### 3.2 Reference compute — from mandelbrot, but make the worker real

- Keep `toRequest`/`computeReferenceAsync` + token-based superseding, and the drift-threshold lazy recompute policy (`maybeRecompute`: 0.35·h px, |Δzoom|>2, >1.3·refLength). This is the right call pattern.
- **Build an actual Web Worker** (Blob URL or Vite `?worker`) that runs the BigInt orbit loop, and make the main-thread path a _chunked_ progressive fallback so even without workers the UI never freezes. Expose a `computing` flag to the HUD.
- Reference layout: keep mandelbrot's _store-before-advance_ but adopt fracture's exactness where it matters: store `X₀`, and always append the escaping value so the shader can reconstruct `Z = X_{i+1} + δ` for the final step. Keep the `escaped` flag.

### 3.3 GPU delta loop — from fracture, upgraded with rebasing

- Extract ONE canonical GLSL DS library (fracture's `ds_add/ds_sub` full-error forms + split-8193 `ds_mul` + the `cds_mul_Xn` fast path for the dominant `2X·δ` term) into a shared shader include. Add `cdf`-style complex-DS helpers (mandelbrot's struct is nice).
- **Seed the delta in DS** (fracture's `splitDS(viewScale)` → `ds_mul(u_scale, uvOffset)`) so `δc` never collapses to float32.
- **Rebase (mandelbrot):** when `|Z+δ|² < |δ|²` or `m ≥ refCount − 1`, set `δ = Z_full`, restart reference index. This is the primary glitch killer and costs one extra `texelFetch` per iteration.
- **Secondary-orbit fallback (fracture):** keep the `computeSecondaryOrbit` (a few-pixels-off reference) and run it when the primary glitch test trips; use the Pauldelbrot `|Z|² < G·|X|²` test to _detect_ glitches even under rebasing (they are complementary — rebasing prevents most, the test catches residuals). If both fail, fall back to interior instead of noise.
- Reconstruct `Z = X_{i+1} + dz` when `i+1 < refIters` (fracture), else `Z = X_i + dz`.
- Raise the shader loop bound to `65536` and gate it with `uMaxIter` (mandelbrot's guard), never a magic constant.
- Track `der_{n+1} = 2·z·der_n + 1` for distance estimate (mandelbrot) _alongside_ the continuous-potential `minMod2` (fracture) — the shader then has both a true DE and a relief height.

### 3.4 Orbit texture — fixed-width + reuse

- Fixed 2048-wide RG32F, `height = ceil(n/2048)` (mandelbrot: keeps width stable for arbitrary orbit lengths, index via `i % w`, `i / w`).
- **Reuse via `texSubImage2D`** when `(width,height)` are unchanged and only realloc via `texImage2D` when they grow (fracture). Cache the last orbits for context-restore re-upload (fracture's `reinitialize`).

### 3.5 Shading & color — both

- **Exterior:** mandelbrot's distance estimate for crisp filaments + `rim = glow·exp(−dePx·1.4)` border glow; log-scaled smooth count.
- **Relief:** fracture's analytical normals (`dFdx/dFdy` of the potential height), sun/bump/ambient lighting. Since the shader already computes DE, use either normal source; keep both controllable.
- **Interior:** fracture's continuous-potential from `minMod2` with `interiorScale`, not a flat tint.
- OKLCH in-shader, full fracture parameter set (hue shift/frequency/chroma) + mandelbrot's `baseL`/`lightHeight`/`glow`.

### 3.6 React shell — fracture's infra + mandelbrot's UX

- Keep `createWebGLContext` (context-restore aware), `createQuadPipeline`, `standardUniforms`, ResizeObserver + RAF, and a `Runner` object that owns the pipeline and last orbits (fracture).
- Keep `usePanZoom` for gestures (zoom-to-cursor, `scalePanWithZoom`), but **route the resulting pan/zoom through mandelbrot's BigFloat helpers** — convert gesture deltas to BigFloat `cx/cy` via `panByPixels`/`zoomAtPixel` so deep-zoom stays exact. This is the one place the two models must meet; the fracture comment block about `WORLD_SCALE` vs view-scale pan normalization is exactly the bug class to watch.
- On every frame: read `panZoomRef`, only _compare_ against the last `View` (fracture pattern) but trigger the async reference recompute via the drift policy instead of a sync block.
- Add mandelbrot's HUD (zoom/re/im/iter + "ref" pulse), reset button, iteration **budget %** slider, and the "WebGL2 unavailable" fallback card.
- Keep the per-renderer param stores (fracture) if the ultimate renderer stays inside the fracture app, or hoist `big-float`/`reference-orbit`/`renderer` into a shared `@repo/mandelbrot-core` package so both apps can consume it.

---

## 4. Proposed module layout (merged)

```
packages/mandelbrot-core/            (new shared package)
  src/lib/big-float.ts               ← mandelbrot (unchanged)
  src/lib/reference-orbit.ts         ← mandelbrot, + escaped-value storage (fracture exactness)
  src/lib/reference-worker.ts        ← mandelbrot API, but REAL worker + chunked fallback
  src/lib/view.ts                    ← mandelbrot (BigFloat view + pan/zoom helpers)
  src/webgl/renderer.ts              ← fracture pipeline shape (context-restore, subImage reuse)
  src/webgl/shaders/ds.glsl          ← fracture DS ops + cds_mul_Xn fast path
  src/webgl/shaders/fractal.glsl     ← rebasing + glitch test + secondary fallback + DE + CP
  src/webgl/shaders/color.glsl       ← OKLCH
  src/components/PerturbationCanvas  ← fracture shell (usePanZoom + Runner) + async recompute
  src/components/Hud / ControlPanel  ← mandelbrot UX
```

---

## 5. Risks & open questions

1. **Worker bundling.** The repo's docs pattern (`.frag?raw`, blob workers) needs a decision: Vite `?worker` import vs Blob URL vs inline string. Verify the chosen one works in both apps' builds.
2. **Rebasing + reconstruction interaction.** Rebasing resets `δ = Z_full` at arbitrary indices; the "exact `X_{i+1}+δ`" reconstruction and the secondary-orbit fallback must agree on the reference index. Needs shader-level testing (this is the subtlest merge point).
3. **GPU iteration budget.** Deep zoom with 60k iterations is genuinely heavy on every pixel; a cap with a progress/quality trade-off (mandelbrot's 60k cap) should be paired with fracture's "iterations @ zoom" readout so users see the cost. The combined shader computes `texelFetch` twice per iteration (Z and rebase check) — measure before promising 60fps.
4. **float32 `u_zoom`/`u_scale` wall (~1e38).** Even with BigFloat centers, the GPU uniforms overflow past ~3.4e38. Going beyond ~1e38 requires a scaled/regioned perturbation scheme (or splitting scale in the existing DS pair, which helps only one more factor). Document as a known frontier; do not over-engineer now.
5. **Interior pixels past `referenceIterations`.** A reference that never escapes gives finite data; pixels still inside at the end can't be resolved (both implementations share this limit). More reference orbits or a full glitch-correction pass remain future work — the secondary orbit mitigates, doesn't solve.
6. **Mandlebrot's `maxIter`-driven reference recompute** (`useEffect` on `look.maxIter`) should be kept in the merged version — orbit length depends on budget.

---

## 6. Bottom line

- **Keep from mandelbrot:** BigFloat arbitrary-precision center + `precisionForZoom`, log2 zoom convention, lazy drift-based async reference recompute with token superseding, **Zhuoran rebasing**, distance-estimate + derivative lighting, 2048-wide padded texture, HUD, reset, error fallback, iteration-budget UX.
- **Keep from fracture:** double-single delta **seeding** and full-error DS arithmetic with the `2X·δ` fast path, exact `X_{i+1}+δ` reconstruction, secondary-orbit glitch fallback + Pauldelbrot detection, continuous-potential interior and analytical normals, shared GL infra (`createWebGLContext`/quad pipeline/`usePanZoom`), context-loss recovery, texture reuse via `texSubImage2D`.
- **Build new:** a real Web Worker (and chunked fallback) for the BigInt reference loop, a shared `@repo/mandelbrot-core` package, a unified GLSL DS/rebase/glitch library, and the BigFloat-view ↔ `usePanZoom` bridge that keeps deep zoom exact without dropping the shared interaction stack.

The two implementations are not competitors — each one holds exactly what the other is missing. The merged version is essentially: _mandelbrot's precision model and UX, driven by fracture's GPU/DS/rendering rigor and shared infra, with a genuinely background reference pipeline._
