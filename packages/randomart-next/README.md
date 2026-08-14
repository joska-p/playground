# @repo/randomart-next

> The next-generation face of expression-tree art — pick a grammar preset, tune
> operators, behaviors, and color space, and watch a seed grow into a fullscreen
> shader. Includes a built-in CPU/GPU gallery to eyeball the engine.

---

## Essence

RandomArt (Andrej Bauer, 1999) turns meaningless strings — SSH fingerprints,
passwords, hashes — into images humans can compare at a glance. RandomArt-next
is the UI half of a two-package system: the math lives in
[`@repo/randomart-engine-next`](/discoveries/randomart-engine-next/), which
grows three per-channel expression trees from a seed and compiles them to GLSL.
This package is everything you see and touch — the canvas, the controls, and the
inspector.

It's the sibling of [`@repo/randomart`](/discoveries/randomart/), the original
UI over the first-generation engine. "Next" doesn't rewrite the canvas; it
rethinks the seams. The store never calls the engine directly — every config
change flows through a thin adapter that translates store state into engine
options: a selected **rule preset** (classic, paper, flow, …), an optional
operator override, a depth band, and a correlated-RGB flag. The engine answers
with fresh trees; the WebGL renderer recompiles the shader.

Two modes share one app:

- **Play** — a fullscreen shader canvas, an inspector that peels the AST into a
  tree view and math formula, and a control panel that reshapes the output live.
- **Test** — the _Operator CPU/GPU Compare_ gallery: every operator the engine
  registers renders side-by-side on CPU and GPU (GPU via
  `@repo/glaze/react/GpuCanvas`). A visual catalogue and a smoke test in one
  screen.

## Quick Launch

```bash
pnpm dev --filter @repo/playground
```

Or install it into your own project:

```bash
pnpm add @repo/randomart-next
```

```tsx
import { App } from '@repo/randomart-next/randomart-next';

export default function Art() {
    return <App />;
}
```

## Field Notes

- **The adapter is the seam.** The store, hooks, and components stay blind to
  engine internals; swapping the engine behind the adapter is a one-file change.
- **Presets over toggles.** The original randomart toggled grammar rules on and
  off; "next" starts from curated rule presets and offers operator-level
  overrides as the escape hatch.
- **Behaviors and color space come from the engine.** `activeBehaviorIds` and
  `colorSpace` (`srgb`, `oklch`, `oklab`, `hsl`) are plain store fields handed
  straight to `compileToShader`.
- **A seed is a recipe.** Export and import the seed, rule, depth band, time,
  and behaviors as JSON to reproduce an image exactly — trees are recomputed on
  import, never stored.
- **Test mode is free documentation.** Because every operator defines both CPU
  `evaluate` and GPU `toGLSL`, the gallery is a constant visual check that the
  two runtimes stay in lockstep.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
