# Graphics Migration Plan: `@repo/graphics` + `@repo/pixelate2d-*` → `@repo/glaze`

Goal: migrate every consumer of `@repo/graphics` and the `@repo/pixelate2d-*`
suite onto `@repo/glaze`, then delete the two old libs.

## Consumer inventory (by refactor complexity, smallest first)

| # | Consumer | Footprint | Complexity |
|---|----------|-----------|------------|
| 1 | `@repo/pixelate2d-{core,math,react}` | zero consumers — only self-imports | delete, no refactor |
| 2 | `apps/storybook` | dead dep, zero imports | remove dep |
| 3 | `@repo/randomart-next` | 1 file (`CanvasGPU.tsx`), `ShaderCanvas` + `FrameLoopProvider` | near drop-in |
| 4 | `@repo/randomart` | 1 file (`ValueCanvasGPU.tsx`), same + `time="uTime"` | near drop-in |
| 5 | `@repo/fracture` | 6 files; easy (ShaderCanvas ×2, provider, `Point2D`) + hard (raw WebGL quad pipeline) | real work |

## Decisions (recorded)

- **Fracture pipeline approach**: DEFERRED — review `createPerturbationPipeline.ts`
  + `PerturbationScene.tsx` first, then present options (reimplement on glaze
  runtime vs. add glaze exports).
- **Zero-cost items**: do both upfront (delete pixelate2d suite, drop storybook dep).

## Phase status

- [x] **Phase 0a** — `apps/storybook`: remove `@repo/graphics` from `package.json` (dead dep)
- [x] **Phase 0b** — delete `@repo/pixelate2d-{core,math,react}`; remove reference docs
      `apps/playground/src/content/docs/reference/packages/pixelate2d-{core,math}.md`,
      root `tsconfig.json` project references; refresh lockfile (no yml mentions existed)
- [ ] **Phase 1a** — `@repo/randomart-next`: swap to `@repo/glaze/react/GpuCanvas`, drop
      `FrameLoopProvider`, remove `@repo/graphics` dep
- [ ] **Phase 1b** — `@repo/randomart`: same swap + `uTime` uniform handling, remove
      `@repo/graphics` dep
- [ ] **Phase 2** — `@repo/fracture`: review pipeline code, decide approach, migrate
- [ ] **Phase 3** — delete `@repo/graphics`; prune `graphics.md` reference doc;
      update `scripts/sync-package-readmes.mjs` `PACKAGE_NAMES`; repo-wide check

## Verification

Per package: `pnpm --filter @repo/<pkg> check-types` and `pnpm --filter @repo/<pkg> lint`.
Repo-wide after Phase 3: `pnpm check-types && pnpm lint`.

## Key API mappings

| `@repo/graphics` | `@repo/glaze` | Notes |
|---|---|---|
| `ShaderCanvas` (`2d/react/ShaderCanvas`) | `react/GpuCanvas` | GpuCanvas owns its frame loop + interaction |
| `FrameLoopProvider` / `useFrame` | `react/FrameLoopProvider` / `react/useFrame` | often not needed — GpuCanvas self-driven |
| `usePanZoom` | `react/useCanvasInteraction` | built into GpuCanvas via `pan`/`zoom` props |
| `time="uTime"` | `uniforms: (ctx) => ({ uTime: ctx.time })` | glaze auto-sets `u_time` (lowercase) |
| `transforms` / `Point2D` | `core/coords/*` | verify export parity during migration |
| `createQuadPipeline` / `createWebGLContext` / `applyStandardUniforms` | (none today) | Phase 2 decision point |
