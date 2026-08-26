# @repo/mandelbrot — Pipeline / Workflow Review

This document explains **how** this app actually works: the data flow, the CPU↔GPU split,
and why the code is shaped the way it is. The first half is written for a junior dev
(no prior math or GPU knowledge assumed). The second half is a technical review with
concrete findings, sorted by importance.

---

## Part 1 — The pipeline, plain English

### 1.1 What the app is

An interactive Mandelbrot-set explorer. You drag to pan, scroll to zoom, and twiddle
sliders to change the colours and lighting. It zooms absurdly deep (millions of x) and
still renders crisply, in real time, in your browser.

The Mandelbrot set is defined by one dead-simple loop:

```
z = 0
repeat:
    z = z² + c
until |z| is big (the point "escapes")
```

`c` is a 2D coordinate (real + imaginary part). Every pixel on screen is one `c`, and the
"colour" is basically _how many loop iterations it took to escape_. That's the whole set.

### 1.2 The problem: you cannot naively do this at deep zoom

To colour one pixel you run that loop until it escapes — sometimes 1000s of iterations.
A full-screen render is millions of pixels, so the loop runs _billions_ of times. That's
fine on a GPU _if_ the math is fast.

But there's a second, sneakier problem: **float precision**. At high zoom the coordinate
values are tiny (like `0.000000000001`) and the difference between neighbouring pixels is
even tinier. Normal 32-bit floats can't tell those pixels apart, so you get blocky garbage
unless you use high-precision numbers — and high-precision numbers are slow.

### 1.3 The core trick: perturbation + a reference orbit

The app's whole design is an answer to one question:

> _Can we use slow high-precision math for ONE point, and fast float math for everything else?_

Yes. This is called **perturbation theory**, and it works like this:

1. Pick the centre of the screen. Iterate it with **BigInt-backed arbitrary precision**
   (slow, but only for this one point). Keep every single value `Z₀, Z₁, Z₂, …` it hits.
   This list is called the **reference orbit**.
2. For every other pixel `c`, don't iterate `z² + c` from scratch. Instead track only the
   tiny **difference** `δ` between the pixel and the reference:

    ```
    δ₀ = 0
    repeat:
        δ = 2·Z·δ + δ² + δc        (δc = c_pixel − c_reference)
    ```

    This recurrence is mathematically identical to the real one, but every value in it is
    **small** — so it fits in fast GPU floats, and stays accurate even at extreme zoom.

That split is the entire architecture of this app:

| Side    | What it does                             | Precision                       | Speed                       |
| ------- | ---------------------------------------- | ------------------------------- | --------------------------- |
| **CPU** | Iterate one point → reference orbit      | BigInt fixed-point              | slow but runs once per view |
| **GPU** | Iterate every pixel → only the small `δ` | float32 (+ double-single trick) | extremely fast              |

### 1.4 The pipeline, end to end

```
                     ┌──────────────────────────────┐
                     │        USER INPUT            │
                     │  drag = pan, wheel = zoom    │
                     └──────────────┬───────────────┘
                                    ▼
                     ┌──────────────────────────────┐
                     │   VIEW STATE  (view.ts)      │
                     │  BigFloat centre + zoom      │
                     │  stored in a ref, NOT state  │
                     └──────────────┬───────────────┘
                                    ▼
                     set a "dirty" flag  →  render loop wakes up
                                    │
              ┌─────────────────────┴─────────────────────┐
              ▼                                           ▼
  CPU side (slow, BigInt)                      GPU side (fast, per-frame)
  ┌──────────────────────────────┐        ┌───────────────────────────────────┐
  │ reference-orbit.ts           │        │ renderer.ts + shaders.ts          │
  │ iterate centre point,        │        │ uploads reference orbit as an     │
  │ store Z₀, Z₁, … as floats    │        │ RG32F texture (2 floats/texel),   │
  │              │               │        │ then for each frame:              │
  │              │               │        │  • full-screen triangle           │
  │              ▼               │        │  • fragment shader runs per pixel │
  │ uploaded to GPU texture      │───────▶│  • perturbation loop with         │
  │ (renderer.setReference)      │        │    double-single math + rebasing  │
  └──────────────────────────────┘        │  • smooth iteration count + DE    │
                                          │  • OKLCH colour → sRGB            │
                                          └───────────────────────────────────┘
```

Concretely, a frame looks like this:

1. **You move the mouse.** The viewer mutates the view (centre + zoom) in a ref and sets
   a `dirty` flag. No React re-render — this is a canvas app, state lives in refs.
2. **The `requestAnimationFrame` loop** notices `dirty` is true, snaps the canvas size to
   the device-pixel-ratio, computes a few numbers (pixel spacing, the offset from the
   reference point, the iteration budget), and calls `renderer.render(...)`.
3. **The GPU draws one full-screen triangle.** For every pixel, the fragment shader runs
   the perturbation loop above, plus:
    - **Rebasing** — every so often it "re-locks" the delta back onto the reference so tiny
      float errors never accumulate into glitchy blobs (a well-known Mandelbrot trick).
    - **The derivative** `dz/dc` — gives a _distance estimate_ (the crisp glowing border)
      and a _surface normal_ (the embossed 3-D lighting).
    - **Colouring** — a smooth (fractional) iteration count is mapped through OKLCH
      (perceptual colour) entirely inside the shader, then converted to sRGB.
4. **The reference is not recomputed every frame.** Only when you've moved "far" from the
   last reference point (see 1.6).

### 1.5 File-by-file map

| File                                   | Role in the pipeline                                                                                                                                                          |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/main.tsx`                         | Bootstraps React, renders `<App/>` into `#root`.                                                                                                                              |
| `src/App.tsx`                          | Wraps the viewer in a shared `ErrorBoundary`.                                                                                                                                 |
| `src/components/mandelbrot-viewer.tsx` | **The orchestrator.** Owns the canvas, the view state, the render loop, pointer/wheel input, the reference bookkeeping, and the HUD state. Everything is wired together here. |
| `src/components/control-panel.tsx`     | The slider UI. Produces a `LookState` (colour/lighting knobs).                                                                                                                |
| `src/components/hud.tsx`               | The readout (zoom, coordinates, iteration count, "computing" dot).                                                                                                            |
| `src/lib/big-float.ts`                 | Arbitrary-precision numbers as `BigInt` fixed-point (`m / 2^prec`). Pure, dependency-free.                                                                                    |
| `src/lib/mandelbrot/view.ts`           | Camera math: `zoom` is **log₂ magnification**, pixel spacing derived from zoom + canvas height, pan/zoom-about-cursor in BigFloat.                                            |
| `src/lib/reference-orbit.ts`           | CPU: iterates the centre point with BigFloat, stores the orbit as a `Float32Array`.                                                                                           |
| `src/lib/reference-worker.ts`          | Wraps the orbit compute in an async API + serialization (`toRequest`). **See finding 2.2 — despite the name, it is NOT a Web Worker.**                                        |
| `src/lib/webgl/renderer.ts`            | Owns the WebGL2 context, the full-screen triangle, the reference texture, and all uniform plumbing. Pure rendering.                                                           |
| `src/lib/webgl/shaders.ts`             | The actual per-pixel math: perturbation, double-single arithmetic, rebasing, distance estimate, lighting, OKLCH colouring.                                                    |

### 1.6 When does the slow CPU work happen?

The reference orbit only gets recomputed when the current one stops being useful. After
panning/zooming, the viewer asks: _"how far are we from the last reference point, and does
the zoom now demand more iterations than the stored orbit provides?"_ It recomputes if
any of:

- the reference point has drifted more than **~35% of the screen height** away,
- the zoom level changed by more than **2× (log₂)**,
- the iteration budget now needs **> 1.3×** the iterations the stored orbit has.

A token/`computing` guard ensures two orbits are never computed at once, and a stale result
(one that was superseded mid-flight) is discarded. This is the "sweet spot" that keeps
interactions smooth while staying accurate.

---

## Part 2 — Technical review

### 2.1 Architecture — what's good

- **The perturbation design is correct and idiomatic.** Rebasing is mathematically exact
  here (pixel and reference share the same `c`, so `δ := full value, m := 0` is valid), and
  the shader's double-single (`df32`) arithmetic with a Dekker split is the right tool for
  the accuracy job. The reference escape radius (`1e12`) deliberately differs from the
  per-pixel bailout (`1024`) — that's a legitimate trick to make one reference cover more
  of the screen.
- **State management is appropriate for a canvas app.** Mutable view state lives in refs,
  React state only for UI ("computing" dot, HUD, look). There's no needless re-rendering
  per frame, and the rAF loop early-returns unless `dirty` — cheap when idle.
- **Correctness details are handled:** DPR capped at 2, `preventDefault` on wheel (with
  `passive: false`), pointer capture, Strict-Mode-safe init effect (renderer disposed on
  cleanup), superseded-reference token guard, iteration budget clamped by stored orbit
  length.

### 2.2 Findings, in priority order

**1. The "worker" is not a worker — it runs on the main thread.**
`reference-worker.ts`'s header claims the compute is run off-thread from a Blob URL. It
isn't. `computeReferenceAsync` does `await Promise.resolve()` and then calls
`computeReferenceOrbit(...)` **synchronously on the main thread**. A deep zoom needs a
~60k-iteration BigInt loop, which can freeze the UI (scroll, panel, HUD all stutter), and
the "computing" indicator only helps because it paints _before_ the block.
Fix: actually use a worker — `computeReferenceOrbit` + `big-float.ts` are dependency-free
(native `BigInt`), so a module worker (`new Worker(new URL('./reference-worker-impl.ts',
import.meta.url), { type: 'module' })`) is straightforward — or, if the sync main-thread
fallback is intentional, rename the module and fix the doc comment.

**2. `package.json` exports a styles path that doesn't exist.**
`exports["./styles"]` points at `./src/styles/styles.css`, but the file is `global.css`.
Any consumer importing `@repo/mandelbrot/styles` breaks.

**3. Duplicated number conversion.** `mandelbrot-viewer.tsx` re-implements
`big-float.ts:toNumber` as a private `toNum` (the comment even says "without importing
toNumber twice"). The two functions are equivalent — just import `toNumber`.

**4. Dead code.** `formatCoord` (view.ts), and `scale2`, `cmp`, `magSq`, `_TWO`
(big-float.ts) are exported but never used anywhere. The `escaped` flag is computed and
threaded through `OrbitResult` but never consumed by the viewer. Trim them once the
migration lands.

**5. Data-model layering.** `LookState` (the shared config type) lives in the component
`control-panel.tsx` and is consumed by the viewer; `DEFAULT_LOOK`/`lookToParams` live in
the viewer. For a demo this is fine, but if the viewer is meant to be reusable, move the
look model to `src/lib/mandelbrot/look.ts` and have the panel be a pure view of it.

**6. Redundant manual memoization (repo convention clash).** This repo runs the React
Compiler (`babel-plugin-react-compiler` in `vite.config.ts`) and AGENTS.md says _no
`useMemo`/`useCallback` needed_. The imported code's `useCallback`s trigger
`react-hooks/preserve-manual-memoization` warnings. The `useRef`/`useEffect` patterns are
fine (they're doing real imperative work); just drop the memoization wrappers.

### 2.3 The ESLint errors, categorized

45 problems (44 errors + 1 warning) — all from the shared strict config
(`@repo/config-eslint`: `strictTypeChecked` + `stylisticTypeChecked`), not logic bugs.
Roughly, by rule:

| Rule                            | Count | What to do                                                                               |
| ------------------------------- | ----- | ---------------------------------------------------------------------------------------- |
| `consistent-type-definitions`   | 12    | `interface` → `type` (mechanical, `--fix` won't rename; easy manual pass)                |
| `no-confusing-void-expression`  | 11    | mostly `void`-returning callbacks / arrow bodies (e.g. the shader event handlers)        |
| `restrict-template-expressions` | 5     | numbers / `null` in template literals (`formatMagnification`, GLSL log strings)          |
| `no-floating-promises`          | 4     | un-awaited `requestReference(...)` calls — prefix with `void` (lines 268, 273 in viewer) |
| `restrict-plus-operands`        | 2     | `"..." + log` where `log: string \| null` — `String(log ?? '')`                          |
| `prefer-const`                  | 2     | `let` → `const`                                                                          |
| `no-unnecessary-condition`      | 2     | `if (!tex)`/`if (!program)` after DOM-lib-typed non-null returns — dead guards           |
| misc                            | 4     | unused var, `import type`, `react-refresh`, `exhaustive-deps`                            |

Most are `--fix`-able (`lint-fix`); the interface→type pass and the `void`-prefixed promise
calls are the manual ones.

### 2.4 Migration to `@repo/ui` and `@repo/graphics`

What's already adopted: `@repo/ui/feedback` (ErrorBoundary) and `@repo/ui/data-entry`
(Button). What the imported code still hand-rolls, and what the shared libs offer instead:

| Hand-rolled here                                          | Provided by the monorepo                                                     | Migration note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ControlPanel` + `SliderRow` (control-panel.tsx)          | `@repo/ui/control-panel` (`ControlPanel`, `ControlRow`, `ControlSection`, …) | Drop-in-ish; keeps the same `LookState` shape.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| WebGL context creation (renderer.ts:39)                   | `@repo/graphics/core/createWebGLContext`                                     | Same concerns (high-performance, antialias off, context-lost handling).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Full-screen triangle + program build (renderer.ts:49–129) | `@repo/graphics/core/createQuadPipeline` + `compileShaderProgram`            | Direct match.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| rAF frame loop (viewer.tsx:120)                           | `@repo/graphics/2d/react/FrameLoopContext` (`useFrame`)                      | Direct match.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Pointer/wheel pan-zoom (viewer.tsx:169–251)               | `@repo/graphics/2d/react/usePanZoom`                                         | **Careful:** `usePanZoom` works in normalized float pixel space. This app's pan/zoom is BigFloat-precision because zoom can exceed float resolution. If you swap, you must keep the _view math_ in `view.ts` and only translate at the boundary — the graphics lib's pan-zoom model isn't deep-zoom-safe as-is.                                                                                                                                                                                                                                                                                                                                                                                     |
| Shader running + resize (renderer.ts)                     | `@repo/graphics/2d/react/ShaderCanvas` / `useShaderRunner`                   | **Not a drop-in.** `ShaderCanvas` assumes standard uniforms (`u_time`, `u_mouse`, pan/zoom) and a simple fragment shader. This app needs a **reference RG32F texture** re-uploaded on each recompute, custom uniforms (`uRef`, `uRefWidth`, `uRefCount`, `uRefOffset`, `uSpacing`, `uMaxIter` + look uniforms), a DPR-aware canvas, and an iteration cap tied to the reference length. Realistic path: keep `shaders.ts` (it's the intellectual core), build the pipeline with the _lower-level_ `createShaderRunner`/`createQuadPipeline` + `useFrame`, and either extend the graphics lib to support custom textures/uniforms, or keep the bespoke `MandelbrotRenderer` for the texture plumbing. |

Suggested order of work: **(1)** fix the worker question (2.2) and the styles export (2.2),
**(2)** run `lint-fix` + the manual interface→type and `void` passes (2.3),
**(3)** swap the control panel to `@repo/ui/control-panel`,
**(4)** decide the graphics-lib path in 2.4 deliberately — don't swap the renderer as a
mechanical exercise, the reference-texture pipeline is the part that doesn't fit the
abstraction.

### 2.5 Minor nits

- `setReference` allocates a padded `Float32Array` per recompute — fine at this scale.
- On mount, `requestReference` runs twice (once in the init effect, once via the
  `maxIter` effect) — one redundant orbit at startup.
- Resize is a `window` listener, not a `ResizeObserver` — correct today because the canvas
  is full-viewport, but it breaks if the container ever isn't.
- `toNum`/`reprecision` run per-frame in the loop — cheap BigInt shifts, no concern.
- No tests exist for this package (no `test` script), while sibling packages use vitest.
  The view math (`view.ts`) and BigFloat round-trips are the highest-value things to cover
  once the import settles.

**Bottom line:** the pipeline — BigFloat reference orbit on the CPU, perturbation +
rebasing + DE + OKLCH on the GPU, with a lazy recompute trigger — is genuinely good and
correct. The churn is integration: the code was written against a different toolchain
(no strict type-checked ESLint, manual memoization, its own WebGL boilerplate), and the one
real architectural gap is that the promised worker doesn't exist yet.
