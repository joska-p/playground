# Glaze — Session Handoff

_Read this first. It captures everything decided so far so the next session
doesn't re-derive it. Status: **`core/` (loop + coords), the doors (`cpu/` +
`gpu/`), and the shapes (`cpu/shapes/*` + `gpu/shapes/*`) are ported and green
(`check-types` + `lint` pass). S4 runtime-verified the GPU shapes against a real
WebGL2 context (storybook story + headless Chromium) and fixed a reserved-word
GLSL slip; added the package README + synced docs and a vitest unit suite. Next
up: step 6, the `react/*` layer.**_

> Session log:
> - **S2 — core/ + doors done.** All design decisions made live below in
>   [7. Session 2 log](#7-session-2-log--decisions-made). Don't re-litigate
>   them.
> - **S3 — shapes done.** See the shape decision in
>   [7. Session 2 log](#7-session-2-log--decisions-made) (appended there per
>   the handoff). Don't re-litigate.
> - **S4 — runtime verification, README/docs, tests done.** Log appended in
>   [7. Session 2 log](#7-session-2-log--decisions-made). Don't re-derive.

---

## 1. The mission

There are two overlapping graphics libs in this repo:

- **`@repo/graphics`** (~1 yr old, shader toolkit): author GLSL, fullscreen
  passes (`createQuadPipeline`), GPGPU, `createWebGLContext` (DPR/context-loss),
  `createFrameLoop`, React layer (`ShaderCanvas`, `usePanZoom`). Consumers:
  art-canvas, automa, randomart, randomart-next, fracture, automa-engine,
  storybook.
- **`@repo/pixelate2d-core/-math/-react`** (brand new, **untracked**):
  immediate-mode drawing engine — `RenderDriver` interface (`clear`,
  `drawRectangle`, `drawCircle`, `drawText`, `drawPath`) with a CPU (Canvas2D)
  and GPU (WebGL2 batched) backend, closure engine loop + input store, curried
  math lib. **No consumers** besides its own Vite example app.

`@repo/glaze` is a **new single package** that unifies both: p5-style drawing
immediacy **and** three.js-style shader freedom, in one coherent lib.

Thinking doc: `drafts/unified-graphics.md` (read it for the reasoning).

## 2. Decisions already made (do not re-litigate)

| # | Decision |
|---|---|
| D1 | **CPU/GPU is the first branch of the pipeline.** Both are first-class choices; CPU is NOT a fallback. **No god components/functions that do both.** |
| D2 | Two expression layers (assembly = draw calls, authorship = shaders) on **one shared foundation**. |
| D3 | **The lib's #1 job: kill coordinate-mapping pain** — pan, zoom, mouse-relative-to-canvas. "You never think about coordinate math again." |
| D4 | Audience = **the author, one person**. p5 for drawing + three.js for shaders = this lib. No compatibility debt for an imaginary audience. |
| D5 | **One package now**, split organically later (e.g. core/math/react) when it earns it. |
| — | **Duplicate over abstract.** CPU and GPU are different; honest duplication beats non-sensical abstractions. They share little beyond loop + coords. |
| — | **No barrel exports.** The front door is the `package.json` `exports` map (subpath per module), like `@repo/graphics`. |
| — | **A shader on the canvas and a shader on a circle are the same mechanism** (a "program" = fragment shader + uniforms, applied to a region). |
| — | **Built-in shapes are ported from `pixelate2d-core`** (`drawCircle`, `drawRect`, `drawLine`, `drawText`, `drawPath`). |
| — | Name: **`@repo/glaze`** (short, starts with "gl" — GL + paint glaze). |

## 3. The scaffold (created, verified)

`packages/glaze/` — created with `pnpm install` run; `check-types` and `lint`
both **pass** on the current tree (empty scaffold → then `core/` → then doors).

Filled as of S3: `core/createFrameLoop.ts`, `core/coords/*` (7 files),
`cpu/input.ts`, `cpu/createCpuDoor.ts`, `cpu/shapes/{types,paint,circle,rect,line,text,path}.ts`,
`gpu/shader/{compileProgram,setUniforms,createProgram}.ts`, `gpu/createGpuDoor.ts`,
`gpu/shapes/{color,circle,rect,line,text}.ts`. Still empty: `react/*`. All of
the above are wired into the `package.json` exports map (the front door);
`cpu/shapes/paint.ts` and `gpu/shapes/color.ts` are internal helpers and stay
unexported.

```
packages/glaze/
├── package.json          # subpath exports map = the front door (no barrels)
├── tsconfig.json         # extends @repo/config-typescript/node.json + lib DOM + jsx react-jsx
├── eslint.config.js      # standard createConfig(import.meta.dirname)
└── src/                  # ALL FILES EMPTY — no source code yet
    ├── core/                       # THE shared foundation (loop + coords only)
    │   ├── createFrameLoop.ts
    │   └── coords/
    │       ├── camera.ts
    │       ├── createScreenToCanvas.ts
    │       ├── createCanvasToNormalized.ts
    │       ├── createNormalizedToUv.ts
    │       ├── createWorldToScreen.ts
    │       └── createScreenToWorld.ts
    ├── cpu/                        # CPU DOOR — thin
    │   ├── createCpuDoor.ts
    │   ├── input.ts
    │   └── shapes/   circle.ts rect.ts line.ts text.ts path.ts
    ├── gpu/                        # GPU DOOR — shader machinery
    │   ├── createGpuDoor.ts
    │   ├── shader/   compileProgram.ts setUniforms.ts createProgram.ts
    │   └── shapes/   circle.ts rect.ts line.ts text.ts
    └── react/         FrameLoopProvider.tsx useFrame.ts useCamera.ts
                       CpuCanvas.tsx GpuCanvas.tsx
```

Design intent of the tree: `core/` = the only shared thing; `cpu/` + `gpu/`
are **sibling doors** (each owns loop/shapes/input, no shared abstraction);
on GPU, `shapes/` sits beside `shader/` so a shape reads as a `createProgram`
(same mechanism as a fullscreen pass); React is a separate door with
`CpuCanvas`/`GpuCanvas` kept apart.

## 4. Suggested next steps

> **Next session (S5): the `react/` layer (step 6) — the last empty scaffold.**
> The S3 GLSL was runtime-verified in S4 (see log below) and the 
> "compiled never against a real WebGL context" caveat is cleared, so no
> re-verification is required unless the shaders change.

1. **Port `core/` first** (it's the shared foundation): **DONE (S2).**
   - `createFrameLoop` ← `@repo/graphics/src/core/createFrameLoop.ts`
     (rAF subscribe/unsubscribe, delta time — matches graphics' clean version).
   - `coords/camera.ts` ← `@repo/pixelate2d-math/src/core/camera.ts`
     (`Camera = {x,y,zoom}`, `screen = world * zoom + (x,y)`, plus
     `screenToWorld`/`worldToScreen` — the pixelate2d camera model).
   - The transform factories ← graphics' `2d/transforms.ts` (curried
     `createScreenToCanvas` etc.). Nail down the exact space ladder once
     (screen → canvas → normalized → UV → NDC) — this is D3.
   - Decide naming/style: curried factories (graphics) vs curried `(a)(b)(c)`
     chains (pixelate2d). Pick one; the scaffold names assume the graphics
     style (`createXxx`). **PICKED: graphics style (`createXxx`).**
2. **Then the doors**: **DONE (S2).** `createCpuDoor` (thin — loop + camera +
   plain Canvas2D, maybe barely a framework), `createGpuDoor` (the
   shader/uniform machinery, where `createProgram` is the heart).
3. **Port shapes** from `pixelate2d-core` (CPU ones are nearly copy-paste).
   **DONE (S3).** See [7. Session 2 log](#7-session-2-log--decisions-made) for
   the shape-mechanism decision made on GPU.
4. **Add a README** following `apps/playground/src/content/docs/how-to/documenting-packages.md`,
   then run `pnpm --filter @repo/playground sync-package-docs` and add the
   friendly name to `PACKAGE_NAMES` in `scripts/sync-package-readmes.mjs`.
   **DONE (S4).** README written; `glaze: 'Glaze'` added; docs synced via
   `node ./scripts/sync-package-readmes.mjs`.
5. **Tests** via vitest (script already present); consider porting pixelate2d's
   test ideas for the drivers. **DONE (S4)** — 33 tests, see the log below.
6. **`react/*` layer** (last empty scaffold): `FrameLoopProvider.tsx`,
   `useFrame.ts`, `useCamera.ts`, `CpuCanvas.tsx`, `GpuCanvas.tsx`. Follow
   `@repo/graphics`' React layer (see `packages/graphics/src/react/`) and keep
   `CpuCanvas`/`GpuCanvas` apart (D1). After this, the package tree is complete.

## 5. Repo conventions (quick reference)

- Always run from repo root: `pnpm --filter @repo/<pkg> <cmd>`
  (`check-types`, `lint`, `lint-fix`, `test`, `clean`).
- Catalog deps (`catalog:` in package.json); workspace deps `workspace:*`.
- tsconfig extends `@repo/config-typescript/{node,app}.json`.
- eslint: `import createConfig from '@repo/config-eslint'; export default createConfig(import.meta.dirname);`
- No barrel exports; **named exports only**; no comments unless asked;
  factories not classes (`createX` returning plain object literals).
- docs live in package READMEs (source of truth), synced to the Astro site.

## 7. Session 2 log — decisions made

These were chosen live while porting `core/` + the doors. Treat as settled
like section 2; only revisit if a later step proves one wrong.

**Naming / style**
- Curried graphics-style factories (`createXxx(...) → (point) => point`), not
  pixelate2d `(a)(b)(c)` chains. `Point2D` type lives in
  `core/coords/camera.ts` (coords foundation) and is imported by the ladder
  files — the scaffold has no separate `vec2`/`types` file.
- Error prefix is `'Glaze: '`.

**core/**
- `createFrameLoop.ts` is a verbatim port of graphics' (time + delta in
  seconds, auto start on first subscriber, stop at zero).
- `camera.ts` = pixelate2d model minus `cameraMatrix` (no mat2d in glaze core):
  `Camera`, `defaultCamera()`, `screenToWorld`/`worldToScreen`. The
  `createWorldToScreen`/`createScreenToWorld` files are thin facades that
  delegate to those two — one canonical impl, ladder-uniform names.
- Space ladder (D3): screen → canvas → normalized → UV. `createNormalizedToUv`
  is a pure y-flip (`{x, 1-y}`), **not** NDC — `createNormalizedToWebGL`'s
  `*2-1` scaling was deliberately dropped; UV→NDC was not scaffolded.

**cpu/ door**
- `input.ts` holds the single `InputStore` (`createInputStore`, ported from
  pixelate2d engine). It's the **shared input store for BOTH doors** — the
  GPU door imports it from `../cpu/input` so `u_mouse` works. It lives under
  `cpu/` because the scaffold put it there; input is shared scaffolding, not a
  drawing abstraction, so the cross-door import is fine.
- `createCpuDoor` = loop + camera + `context` (raw Canvas2D) + input, plus two
  helpers: `applyCamera()` sets the Canvas2D transform so user draws in world
  coords; `clear(color)` does an identity-transform fill then restores.
  Resize (CSS size × dpr) happens every frame (cheap, idempotent). Rendering
  auto-starts on first `setDraw`/`subscribe` and stops when the last leaves.

**gpu/ door**
- `shader/compileProgram.ts` = port of graphics' `compileShaderProgram`
  (`Glaze:` prefix), incl. `FULLSCREEN_TRIANGLE`, `UniformEntry`/`UniformValue`.
- `shader/setUniforms.ts` = `setUniformValue` (type-dispatch, port),
  `setUniforms` (silently skips uniforms the shader doesn't declare — no DEV
  warning), `createStandardUniformValues(width, height, dpr, mouse)` →
  `u_resolution` (device px) / `u_aspect` / `u_mouse` (pointer normalized to
  canvas then y-flipped to UV, like graphics' `createShaderUniformBuilder`).
- `shader/createProgram.ts` = the heart: a fullscreen "program" (fragment +
  uniforms). `render()` draws the fullscreen triangle; texture-unit counter
  resets **per render**, not per `setUniforms` call (matches graphics).
  `reinitialize()` recompiles from stored sources; `destroyed` guard so the
  door's context-restore loop skips freed programs.
- `createGpuDoor` = WebGL2 context (alpha/premultipliedAlpha true, antialias
  false — graphics defaults), dpr + resize, context-loss handling
  (preventDefault; on restore re-apply blend/viewport and recompile tracked
  programs), core loop, `createProgram`, `renderProgram(program)` (auto-applies
  standard uniforms from canvas size + `input.pointer`, then renders),
  `clear(r,g,b,a)`, `setDraw`/`subscribe`, `destroy`.
- Doors have similar shapes (`setDraw`/`subscribe`/`camera`/`destroy`) but
  deliberately **no shared interface** (D1 — sibling doors, no god abstraction).

**Next step (step 3): shapes.** CPU ones are near copy-paste from
`pixelate2d-core/src/drivers/cpu.ts` (plain Canvas2D helpers that assume the
door's world-space transform). GPU ones should read as a `createProgram`
(per D2: a shape = a tiny pre-written program) — decide whether that means
porting pixelate2d's batched `drivers/gpu.ts` tessellation verbatim or writing
per-shape programs; the door's `createProgram`/`renderProgram` is the surface.
**DONE (S3) — decision below.**

**S3 — shapes: each shape is a `createProgram`, not a batched renderer.**

- **Picked: per-shape programs** over porting pixelate2d's batched
  `drivers/gpu.ts` verbatim. The batched driver is a second renderer with its
  own VAO/buffer/program lifecycle that would sit *beside* `createProgram`
  (not on it) — it reintroduces the fixed-renderer model D2's "a draw call is
  a tiny pre-written shader" was meant to dissolve. Per-shape programs keep
  `createGpuDoor.createProgram`/`renderProgram` as the **one** rendering
  surface, so the uniform story holds at every level and the "wobble the
  circle with your own shader" story (unified-graphics §8) is free. Cost:
  each shape is a fullscreen pass (no batching) — fine for an author tool
  (D4).
- **Mechanics.** Each shape fragment shader derives the fragment's *world*
  position from `vUv` + the standard uniforms, then runs an SDF test with
  ~2-device-px anti-aliased edges. `renderProgram` now also applies
  `u_camera` (vec3: CSS-px offset x/y + zoom) and `u_dpr` beside
  `u_resolution`/`u_aspect`/`u_mouse` — shapes draw in world space through the
  same surface as fullscreen passes; screen-space shaders ignore the two new
  uniforms (backward compatible).
- **Door surface.** `createGpuDoor` gained `drawCircle`/`drawRect`/
  `drawLine`/`drawText` (p5 immediacy, pixelate2d-style style objects).
  Each lazily compiles its shape program through the internal `createProgram`
  (so it joins the context-restore recompile set) and renders through
  `renderProgram`. Text is rasterized to an offscreen canvas and drawn as a
  textured quad (ported `getTextTexture`; 128-entry cache, cleared on context
  restore). Shape modules export their fragment sources (`circleFragmentSource`
  etc.) + uniform builders, so an author can copy or extend a shape as a
  program.
- **CPU shapes** (`cpu/shapes/{circle,rect,line,text,path}.ts`) are plain
  Canvas2D helpers drawing in the door's world-space transform — near
  copy-paste from `drivers/cpu.ts`, minus the `transform`/`camera` args the
  door already owns. Shared types + `beginShape`/`paintShape` live in
  `cpu/shapes/{types,paint}.ts`; GPU imports the types cross-door (same
  precedent as `input`). `line` is new (no pixelate2d equivalent): strokes
  two points with `stroke ?? fill ?? black`.

**S4 — runtime verification, README/docs, unit tests.**
(Don't re-derive; re-run only if the shaders change.)

- **Runtime-verified the GPU shapes against a real WebGL2 context** (the
  "subtle GLSL slip" caveat from [4. Suggested next steps](#4-suggested-next-steps)).
  No browser in the devcontainer, so: `apps/storybook` gained a
  `@repo/glaze` devDep + `stories/glaze/GpuShapes.stories.tsx` — a story
  (`id glaze-gpushapes--shapes`) that renders all four shapes and, inside the
  frame callback, `readPixels`-samples each one and stashes the results on
  `window.__glazeGpu`. It was driven with Playwright chromium (cached at
  `~/.cache/ms-playwright/chromium-1228`) against the storybook dev server
  under Xvfb — **SwiftShader ANGLE needs an X display** (headless shells have
  no WebGL; full chromium `--use-angle=swiftshader --enable-unsafe-swiftshader`
  fails with `xcb_connect` without `DISPLAY`). All four shapes pass: exact
  colors read back at the sampled pixels (circle `#e11d48`, rect `#16a34a`,
  line `#3b82f6`), text >20 glyph pixels.
- **Found & fixed one real GLSL slip: `half` is a reserved GLSL ES 3.00
  keyword** — `float half` in `gpu/shapes/{circle,rect}.ts` (AA edge) was
  renamed to `strokeHalf`. Would have failed at runtime compile only.
- **README + docs**: `packages/glaze/README.md` written per
  `documenting-packages.md`; `glaze: 'Glaze'` added to `PACKAGE_NAMES` in
  `scripts/sync-package-readmes.mjs`; `node ./scripts/sync-package-readmes.mjs`
  regenerated `apps/playground/src/content/docs/reference/packages/glaze.md`
  (sync is a root-level script — `pnpm --filter @repo/playground
  sync-package-docs` has no such script; use `pnpm sync-package-docs`).
- **Tests**: vitest (happy-dom env via `vitest.config.js`, mirroring
  `@repo/graphics`). 33 unit tests: `createFrameLoop`, coords ladder + camera,
  `createInputStore`, `parseColor`/`colorArray`, and the shape uniform
  builders. `check-types` + `lint` green for both `@repo/glaze` and
  `@repo/storybook`. Gotcha: strict config means
  `Record<string, UniformValue>` returns must be read with bracket access
  (`uniforms['u_stroke']`), not dot access.
- **Still empty: `react/*` (step 6).** Re-verification recipe lives in
  `apps/storybook/src/stories/glaze/` (story + pixel-probe helper); a scratch
  runner was `/tmp/opencode/glaze-verify.mjs`.

## 8. Git state (uncommitted)

- `packages/glaze/` — untracked (new).
- `packages/pixelate2d-{core,math,react}/` — untracked (new, source of ports).
- `drafts/pixelate2d` + `drafts/unified-graphics.md` — untracked working docs.
- `pnpm-lock.yaml` modified by the glaze install.
- (Unrelated: modified mandelbrot files + root tsconfig.json — leave alone.)
