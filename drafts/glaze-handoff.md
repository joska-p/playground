# Glaze — Session Handoff

_Read this first. It captures everything decided so far so the next session
doesn't re-derive it. Status: **`core/` (loop + coords) and the doors
(`cpu/` + `gpu/`) are ported and green (`check-types` + `lint` pass). Next
step: port shapes.**_

> Session log:
> - **S2 — core/ + doors done.** All design decisions made live below in
>   [7. Session 2 log](#7-session-2-log--decisions-made). Don't re-litigate
>   them.

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
both **pass on the empty skeleton**.

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

1. **Port `core/` first** (it's the shared foundation):
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
     style (`createXxx`).
2. **Then the doors**: `createCpuDoor` (thin — loop + camera + plain Canvas2D,
   maybe barely a framework), `createGpuDoor` (the shader/uniform machinery,
   where `createProgram` is the heart).
3. **Port shapes** from `pixelate2d-core` (CPU ones are nearly copy-paste).
4. **Add a README** following `apps/playground/src/content/docs/how-to/documenting-packages.md`,
   then run `pnpm --filter @repo/playground sync-package-docs` and add the
   friendly name to `PACKAGE_NAMES` in `scripts/sync-package-readmes.mjs`.
5. **Tests** via vitest (script already present); consider porting pixelate2d's
   test ideas for the drivers.

## 5. Repo conventions (quick reference)

- Always run from repo root: `pnpm --filter @repo/<pkg> <cmd>`
  (`check-types`, `lint`, `lint-fix`, `test`, `clean`).
- Catalog deps (`catalog:` in package.json); workspace deps `workspace:*`.
- tsconfig extends `@repo/config-typescript/{node,app}.json`.
- eslint: `import createConfig from '@repo/config-eslint'; export default createConfig(import.meta.dirname);`
- No barrel exports; **named exports only**; no comments unless asked;
  factories not classes (`createX` returning plain object literals).
- docs live in package READMEs (source of truth), synced to the Astro site.

## 6. Git state (uncommitted)

- `packages/glaze/` — untracked (new).
- `packages/pixelate2d-{core,math,react}/` — untracked (new, source of ports).
- `drafts/pixelate2d` + `drafts/unified-graphics.md` — untracked working docs.
- `pnpm-lock.yaml` modified by the glaze install.
- (Unrelated: modified mandelbrot files + root tsconfig.json — leave alone.)
