# Grammar Test Bench refactor

## New dependency

The GPU renderer uses react-three-fiber + three.js:

```
pnpm add three @react-three/fiber
pnpm add -D @types/three
```

## File map

```
test-mode/
├── TestMode.tsx                 entry point (unchanged)
├── TestModeControls.tsx         composes the 4 control sections below
├── store.ts                     zustand store (+ new `renderMode` field)
├── controls/
│   ├── SearchSection.tsx        query + category filter
│   ├── SeedSection.tsx          global seed + reroll
│   ├── RenderSection.tsx        renderer picker (CPU/GPU/Compare), resolution, animate
│   └── ConfigSection.tsx        global t slider + arg preset
├── hooks/
│   ├── useAnimationLoop.ts      generic rAF loop (drives the `t` clock)
│   └── useFilteredRules.ts      category/query filtering
├── lib/
│   ├── evalHelpers.ts           buildPreviewNode, arg-name conventions
│   ├── colormap.ts              value→RGB (CPU) + matching GLSL source (GPU)
│   └── renderModes.ts           RENDER_MODE_OPTIONS
├── glsl/
│   └── buildValueShader.ts      wraps rule.toGLSL() into a full fragment shader
└── grammar/
    ├── GrammarTestBench.tsx     top-level grid + detail panel wiring
    ├── SpecimenCard.tsx
    ├── DetailPanel.tsx
    ├── canvas/
    │   ├── RuleCanvas.tsx       switches CPU / GPU / side-by-side compare
    │   ├── ValueCanvasCPU.tsx   original Canvas2D per-pixel evaluator
    │   └── ValueCanvasGPU.tsx   r3f canvas running the rule as a fragment shader
    └── ui/
        ├── Corners.tsx
        └── Badge.tsx
```

`derived.ts` (the coordinate/terminal rules) was left untouched per request — it's
reference material, and `ValueCanvasGPU` calls `rule.toGLSL()` on it as-is.

## How CPU vs GPU comparison works

- **CPU**: same as before — `ValueCanvasCPU` walks every pixel, calls
  `rule.evaluate(...)` in JS, and paints a `Uint8ClampedArray` onto a 2D canvas.
- **GPU**: `buildValueShader.ts` takes the _same_ rule, calls `rule.toGLSL(['x','y','t'], node)`
  to get its raw GLSL expression, and drops it into a full-screen shader that
  declares `p`, `x`, `y`, and an animated `t` uniform, then applies the exact
  same colormap (`colormapGLSL()` is templated from the same constants as
  `valueToRGB`) so the two outputs are visually comparable.
- **Renderer** control in `RenderSection` switches all cards/detail view between
  `cpu`, `gpu`, and `compare` (both, side by side) via `store.renderMode`.

## Known limitations worth knowing about

- **Shader compile errors aren't caught synchronously.** WebGL logs bad GLSL
  to the console via the driver rather than throwing a catchable JS
  exception, so `ValueCanvasGPU`'s error UI only catches failures from
  `rule.toGLSL()` itself (e.g. a rule that doesn't implement GLSL output),
  not malformed GLSL that compiles-but-errors at runtime. If you want full
  coverage, `renderer.getContext().getShaderInfoLog(...)` on the compiled
  program is the way to get it, but adds real complexity for likely little
  benefit on a test bench.
- **`resolution` only affects the CPU canvas.** The GPU canvas renders at
  its actual CSS pixel size (`dpr={[1, 1]}`), so the control is disabled
  in `gpu` mode.
- Also fixed a small pre-existing bug: `ValueCanvasCPU`'s catch block used to
  `console.log` render errors without ever setting the `error` state, so the
  red error overlay never appeared. It now does.
