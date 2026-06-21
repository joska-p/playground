---
title: "Randomart"
description: "GPU-accelerated random expression-tree art generator. Uses `@repo/randomart-engine` to build stochastic ASTs and renders them via WebGL fragment shaders."
category: "reference"
tags:
  - reference
  - randomart
order: 20
---

# @repo/randomart

## Quick Start

```bash
pnpm --filter @repo/randomart dev
```

## Architecture

```
@repo/randomart-engine
       │
       ▼
  generateTrees() → { treeR, treeG, treeB }
       │
       ▼
  compileToGLSL() → fragment shader source
       │
       ▼
  WebGL rendering (u_time, u_animSpeed uniforms)
       │
       ▼
  Animation loop — requestAnimationFrame → local time ref → uniform updates
```

GPU-only rendering. Trees are compiled to GLSL fragment shaders and evaluated per-pixel in parallel on the GPU. Animation is driven by a `requestAnimationFrame` loop that updates `u_time` and `u_animSpeed` uniforms each frame.

## Store (`src/stores/randomart/`)

Vanilla Zustand store with selector hooks and action functions.

### State shape

| Field                     | Type                         | Default                                         | Description                                                        |
| ------------------------- | ---------------------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| `seedText`                | `string`                     | `"De deux choses lune l'autre c'est le soleil"` | PRNG seed                                                          |
| `maxDepth`                | `number`                     | `6`                                             | Max tree depth                                                     |
| `enabledRuleIds`          | `string[]`                   | all rules                                       | Enabled grammar rules                                              |
| `treeR`, `treeG`, `treeB` | `ExpressionNode`             | generated                                       | Per-channel ASTs, auto-regenerated on config change                |
| `rngR`, `rngG`, `rngB`    | `SeededRandom`               | generated                                       | Per-channel PRNGs                                                  |
| `running`                 | `boolean`                    | `false`                                         | Animation state                                                    |
| `time`                    | `number`                     | `0`                                             | Current animation time                                             |
| `animationSpeed`          | `number`                     | `0.3`                                           | Animation speed multiplier                                         |
| `correlatedRGB`           | `boolean`                    | `false`                                         | Linked/split RGB — when on, all channels share one `vec3` tree     |
| `activeChannel`           | `'red' \| 'green' \| 'blue'` | `'red'`                                         | Inspector tab selection                                            |
| `activeAnimationBehaviorIds` | `string[]`                | `['hue-shift']`                                 | Enabled animation behavior IDs                                     |

### Action files

| File                  | Exports                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| `actions/config.ts`   | `setSeedText(text)`, `setMaxDepth(n)`, `toggleRule(id)`                 |
| `actions/display.ts`  | `setActiveChannel(ch)`, `setCorrelatedRGB(bool)`                        |
| `actions/animation.ts`| `toggleAnimationBehavior(id)`                                           |
| `actions/playback.ts` | `toggleRunning()`, `setRunning(bool)`, `setTime(n)`                     |

Actions set a config field; a Zustand `subscribe` listener auto-regenerates trees when config changes.

### Selectors (`stores/randomart/selectors.ts`)

| Selector                           | Returns                                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `useSeedText`                      | `string`                                                                                                      |
| `useMaxDepth`                      | `number`                                                                                                      |
| `useEnabledRuleIds`                | `string[]`                                                                                                    |
| `useCorrelatedRGB`                 | `boolean`                                                                                                     |
| `useActiveChannel`                 | `'red' \| 'green' \| 'blue'`                                                                                  |
| `useRunning`                       | `boolean`                                                                                                     |
| `useAnimationSpeed`                | `number`                                                                                                      |
| `useActiveAnimationBehaviorIds`    | `string[]`                                                                                                    |
| `useTreeR`, `useTreeG`, `useTreeB` | `ExpressionNode`                                                                                              |
| `useSelectedTree`                  | `ExpressionNode` — active channel only. When `correlatedRGB`, unwraps from `vec3.args[i]`                     |
| `useSelectedRng`                   | `SeededRandom` — active channel only                                                                          |

## Rendering Pipeline

1. `useWebGLRenderer` sets up WebGL context, vertex buffer, and fullscreen quad
2. On tree change: `compileToGLSL()` compiles the AST to a fragment shader, links the program, sets uniforms
3. When `running`: a `requestAnimationFrame` loop increments a **local `useRef(0)`** and writes `u_time` and `u_animSpeed` uniforms each frame
4. Store time is synced from the ref on pause, and vice versa on resume
5. Animation behaviors (hue-shift, zoom, ripple, etc.) are applied as GLSL post-processing in the shader

### Animation behaviors

15 built-in behaviors can be composed:

| Spatial             | Color              |
| ------------------- | ------------------ |
| zoom                | hue-shift          |
| ripple              | contrast-pulse     |
| rotate              | color-drift        |
| swirl               |                    |
| drift               |                    |
| expand              |                    |
| kaleidoscope        |                    |
| domain-warp         |                    |
| mirror-tile         |                    |
| tunnel              |                    |
| golden-wander       |                    |
| noise-crawl         |                    |

### Download

GPU canvas snapshot first (`.toBlob()`), with a sync CPU fallback via `@repo/randomart-engine/png` for headless or offscreen renders.

## Hooks

| Hook                   | Responsibility                                      |
| ---------------------- | --------------------------------------------------- |
| `useWebGLContext`      | GL context, canvas sizing, geometry buffer           |
| `useShaderProgram`     | Shader compilation, program lifecycle, uniform locs  |
| `useWebGLRenderer`     | Time tracking, animation loop, store sync            |
| `useAnimationLoop`     | Generic rAF loop with delta-time                     |

## UI Components

```
components/
  RandomArtCanvas.tsx     Top-level canvas (always WebGL)
  WebGLCanvas.tsx         WebGL canvas wrapper
  controls/
    Controls.tsx          Sidebar controls layout
    SeedInput.tsx         Seed text input
    MaxDepth.tsx          Tree depth slider
    AnimationSpeed.tsx    Animation speed slider
    AnimationToggle.tsx   Behavior toggle buttons
    GrammarList.tsx       Rule toggle badges
    CorrelatedToggle.tsx  Correlated RGB switch
    DownloadButton.tsx    PNG download
    PlaybackButton.tsx    Play/pause
    ResetTimeButton.tsx   Reset animation time
    ShuffleButton.tsx     Randomize seed
    TimeDisplay.tsx       Current time display
  inspector/
    FloatingInspector.tsx Inspector panel
    MathFormula.tsx       Math string view
    AstTreeView.tsx       Tree view
```

## Conventions

- **Named exports only** — no `export default`
- **Zustand store** — unexported `createStore()`, getter hooks (`use*`), plain setter functions
- **React 19 compiler** — no manual `useMemo`/`useCallback`
- **`@repo/ui` components** for all UI
- **CSS tokens** — no hardcoded colors, spacing, or radius values

## Common Pitfalls

### GLSL type correctness

When authoring `toGLSL()` on a new grammar rule, always use **float literals** (`1.0`, `0.0`) not integer literals (`1`, `0`). WebGL 1.0 (GLSL ES 1.0) does not perform implicit int→float conversion.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

