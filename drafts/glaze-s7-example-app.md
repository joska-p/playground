# Glaze S7 — Example App in the Lib (session prompt)

Copy the block below into a fresh session. It is the canonical S7 task.

---

## Task (S7): serve a Vite example app from `@repo/glaze`

**Read first:** `/workspaces/playground/drafts/glaze-handoff.md` (canonical source
of truth — status header + S2–S6 logs are current; don't re-derive sections 1–2
or the logs; repo conventions are in section 5). S6 wrote storybook stories for
the react/* layer and **dropped them** as unreliable in this devcontainer (see
the S6 log for why). The new, user-approved plan: **an example app served from
the lib itself** (`packages/glaze/example/`), which both demos and runtime-verifies
the react layer without Storybook.

### What to build

A Vite + React app inside the lib that showcases the primary use cases of
`@repo/glaze`'s react layer (CpuCanvas/GpuCanvas, and FrameLoopProvider/useCamera/
useFrame). Two modes, two API entry points — same brief S6 had:

1. **Surface Painting Mode** — the canvas as a strict visual drawing area.
   Declarative: `onFrame` prop paints a fixed scene. Do it on both backends to
   show "pick CPU or GPU based on complexity" (D1 — first-class choice, not a
   fallback): a `CpuCanvas` sketch and a `GpuCanvas` sketch of the same scene
   (e.g. the S4 scene: dark bg + circle/rect/line/text).
2. **Programmatic Rendering Mode** — the canvas as an engine that executes
   render functions. Imperative: grab the live door via `onDoor`, drive it with
   the hooks (`useFrame` clock, `useCamera` caller-owned camera) and core engine
   functions (`createProgram`/`renderProgram` for a custom fullscreen shader on
   GPU; imperative `clear`/`drawCircle`/... on CPU, e.g. an orbiting/animating
   sketch).

A small app shell (tabs or side-by-side panels) switching between these demos is
fine. Add a badge/caption per demo naming the mode + backend (like the S6
stories' overlays).

### Reference pattern (use it, don't reinvent)

`packages/pixelate2d-react/` is the established in-repo example-app shape:
`package.json` with `dev`/`build`/`preview` scripts, `index.html`,
`vite.config.ts` (`@vitejs/plugin-react` + `@rolldown/plugin-babel` with
`reactCompilerPreset`), `tsconfig.app.json` + `tsconfig.node.json`, app source in
`src/`. Glaze imports resolve straight through the package `exports` map
(`@repo/glaze/react/CpuCanvas` → `./src/react/CpuCanvas.tsx`), so Vite serves the
TS source directly.

Decisions to make (flag them, don't silently guess):
- Nested `example/` dir vs. standalone sibling package. **Recommended: nested
  `packages/glaze/example/`** (keeps D5 "one package now" and "serve an example
  app in the lib"). If you nest it, keep the lib's `tsc -b` (`check-types`)
  from compiling the example: exclude `example/` from the lib tsconfig include
  and give the example its own app/node tsconfigs + a `check-types` script.
  The example package.json should get the `vite`/`@vitejs/plugin-react`/
  `@rolldown/plugin-babel`/`babel-plugin-react-compiler`/`@types/...` devDeps
  (all `catalog:`).
- Tailwind or not (pixelate2d-react uses it; inline styles worked fine in the
  dropped stories — either is acceptable).
- What to do with the S4 proof files (`apps/storybook/src/stories/glaze/`
  `GpuShapes.stories.tsx` + `gpuShapes.ts`). Recommended: move/copy the
  pixel-probe logic into the example app as a headless self-test and either keep
  or delete the S4 story (it's the S4 runtime record; do not delete silently).

### Runtime proof (the whole point — Storybook is NOT the vehicle)

Each demo should self-verify by sampling pixels after a few frames, the S4 way:
- **GPU:** `door.gl.readPixels(...)` at known coords (the S4 `verifyGpuShapes`
  in `apps/storybook/src/stories/glaze/gpuShapes.ts` is the reference; reuse or
  copy it). Animated shader: sample the same point at two far-apart frames and
  assert the color changed (proves the loop + uniform advance).
- **CPU:** `door.context.getImageData(...)` at known coords after a few frames;
  for the animated sketch, assert a moving object's pixel is the expected color
  at frame N and has moved by frame N+16.
- Stash results on `window.__glazeProof` (or render a pass/fail strip in-app) so
  a script or a human can confirm without devtools spelunking.

Verification (run from repo root, per AGENTS.md):
- `pnpm --filter @repo/glaze check-types` + `lint` (and the example's own
  check-types if you added one).
- `pnpm --filter @repo/glaze test` — must stay **50/50** (add no lib tests).
- Runtime: `pnpm --filter @repo/glaze dev` (or the example's dev script) then
  drive it with Playwright under the **known-good S4 recipe**: cached
  `chromium-1228` at `~/.cache/ms-playwright/chromium-1228`, needs an X display
  (`xvfb-run -a`), args `--use-angle=swiftshader --enable-unsafe-swiftshader
  --no-sandbox`. Read `window.__glazeProof` and assert all checks pass. (S6's
  mistake to avoid: `run-story-tests` via the storybook MCP hangs and Playwright
  needs `xvfb-run -a`, not a pre-set `DISPLAY`.)

### Handoff

When done: update `drafts/glaze-handoff.md` — status header ("Only open item")
+ append an **S7 log entry** in section 7 (same pattern as S5/S6), then stop for
review.
