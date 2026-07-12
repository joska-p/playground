---
title: "Randomart"
description: "A React window into expression-tree art — type a seed phrase, watch a mathematical landscape grow, and inspect the grammar that shaped it."
category: "reference"
tags:
  - reference
  - randomart
order: 20
---

---
title: 'Randomart'
coordinates: '/visuals/generative'
status: 'Active'
date_discovered: 2024-04-01
---

# @repo/randomart

---

## Essence

Randomart is the visible half of a two-package system. The engine
([`@repo/randomart-engine`](../randomart-engine/)) handles all the math —
grammar-driven AST generation, CPU evaluation, GLSL compilation, PNG export.
This package handles everything the human sees and touches: a WebGL canvas that
renders expression trees as fullscreen shaders, an inspector that peels back the
AST to show the formula and RNG history, and controls that let you reshape the
output in real time.

The interesting design tension is between the Zustand store and the WebGL
pipeline. The store is the source of truth — seed, depth, grammar toggles, RGB
mode — and every config change triggers a subscriber that calls `generateTrees()`
from the engine. The canvas reads those trees and compiles them into a GLSL
fragment shader via `compileToGLSL()`. Animation is a `requestAnimationFrame`
loop that writes `u_time` and `u_animSpeed` uniforms each frame, with the local
time throttled back to the store every 6 frames for UI display. The result is a
rendering system where the math lives in the engine, the state lives in the
store, and the GPU executes the bridge between them.

## Quick Launch

```bash
pnpm dev --filter @repo/playground
```

Or install the package into your own project:

```bash
pnpm add @repo/randomart
```

```tsx
import { RandomArtCanvas } from '@repo/randomart';

export default function Art() {
  return <RandomArtCanvas />;
}
```

## Field Notes

- **The Catalyst:** The desire to make expression-tree art interactive — not just
  a static render, but a living canvas where the seed, depth, and grammar rules
  are knobs you can turn while the art is still running. The engine existed
  first; this package was built to make it explorable.

- **Quirks & Anomalies:** The WebGL pipeline runs a `requestAnimationFrame` loop
  even when animation is paused — the shader still evaluates per-pixel, but
  `u_time` stays frozen. The inspector panel uses `nodeToTreeView()` and
  `nodeToMathString()` from the engine to render the AST as a collapsible tree
  and a mathematical formula, giving a dual view of the same structure. The
  store subscriber that regenerates trees on config change is a vanilla Zustand
  pattern, not a React effect — so tree generation happens outside the React
  render cycle, keeping re-renders fast.

- **Future Horizons:** A grammar rule editor that lets you author rules visually,
  multi-frame export for animation sequences, and a side-by-side comparison mode
  where two seeds render next to each other.

---

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│ @repo/randomart-engine (pure TS, no DOM)                  │
│  Grammar rules → Registry → buildTree()                   │
│  evaluateNode() / compileToGLSL() / renderTreesToBuffer() │
│  SeededRandom / animationRegistry / nodeToMathString      │
└──────────────┬────────────────────────────────────────────┘
               │ import
┌──────────────▼──────────────────────────────────────┐
│ @repo/randomart (React UI)                          │
│                                                     │
│  Zustand Store (store/selectors/actions)            │
│       │ config change → auto-regenerates trees      │
│       │                         via generateTrees() │
│       ▼                                             │
│  Hooks                                              │
│   useWebGLRenderer → context + shader + animation   │
│   useCanvasSize / useAnimationLoop                  │
│       │                                             │
│       ▼                                             │
│  Components                                         │
│   RandomArtCanvas → WebGLCanvas                     │
│   FloatingInspector + Controls                      │
└─────────────────────────────────────────────────────┘
```

## Package Split

| Concern                                        | Package                  |
| ---------------------------------------------- | ------------------------ |
| Core types (`ExpressionNode`, `GrammarRule`)   | `@repo/randomart-engine` |
| Grammar rules (19 built-in operators)          | `@repo/randomart-engine` |
| Tree building / evaluation / GLSL compilation  | `@repo/randomart-engine` |
| PRNG (`SeededRandom`)                          | `@repo/randomart-engine` |
| Animation behaviors                            | `@repo/randomart-engine` |
| CPU pixel-buffer rendering                     | `@repo/randomart-engine` |
| PNG export                                     | `@repo/randomart-engine` |
| Zustand store & selectors                      | `@repo/randomart`        |
| WebGL rendering hooks                          | `@repo/randomart`        |
| React components (canvas, inspector, controls) | `@repo/randomart`        |

## Store (`src/stores/randomart/`)

Vanilla Zustand store with selector hooks and action functions. On every config
change (`seedText`, `maxDepth`, `enabledRuleIds`, `correlatedRGB`) a store
subscriber auto-regenerates trees via `generateTrees()` from
`@repo/randomart-engine`.

### State Shape

| Field                        | Type                         | Default                                         | Description                                         |
| ---------------------------- | ---------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| `seedText`                   | `string`                     | `"De deux choses lune l'autre c'est le soleil"` | PRNG seed                                           |
| `maxDepth`                   | `number`                     | `6`                                             | Max tree depth                                      |
| `enabledRuleIds`             | `string[]`                   | all rules                                       | Enabled grammar rules                               |
| `treeR`, `treeG`, `treeB`    | `ExpressionNode`             | generated                                       | Per-channel ASTs, auto-regenerated on config change |
| `rngR`, `rngG`, `rngB`       | `SeededRandom`               | generated                                       | Per-channel PRNGs                                   |
| `running`                    | `boolean`                    | `false`                                         | Animation state                                     |
| `time`                       | `number`                     | `0`                                             | Current animation time                              |
| `animationSpeed`             | `number`                     | `0.3`                                           | Time-based hue rotation speed                       |
| `renderMode`                 | `'glsl' \| 'canvas'`         | `'glsl'`                                        | GPU or CPU render                                   |
| `correlatedRGB`              | `boolean`                    | `false`                                         | Linked/split RGB                                    |
| `activeChannel`              | `'red' \| 'green' \| 'blue'` | `'red'`                                         | Inspector tab selection                             |
| `activeAnimationBehaviorIds` | `string[]`                   | `[]`                                            | Enabled animation behaviors                         |

### Action Files

| File                   | Exports                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| `actions/config.ts`    | `setSeedText(text)`, `setMaxDepth(n)`, `toggleRule(id)`, `setAnimationSpeed(n)` |
| `actions/display.ts`   | `setActiveChannel(ch)`, `setCorrelatedRGB(bool)`                                |
| `actions/animation.ts` | `toggleAnimationBehavior(id)`                                                   |
| `actions/playback.ts`  | `toggleRunning()`, `setTime(n)`                                                 |

### Selectors (`stores/randomart/selectors.ts`)

All selectors in a single file. Each is a thin `useStore` wrapper.

| Selector                           | Returns                                |
| ---------------------------------- | -------------------------------------- |
| `useSeedText`                      | `string`                               |
| `useMaxDepth`                      | `number`                               |
| `useEnabledRuleIds`                | `string[]`                             |
| `useCorrelatedRGB`                 | `boolean`                              |
| `useActiveChannel`                 | `'red' \| 'green' \| 'blue'`           |
| `useRunning`                       | `boolean`                              |
| `useTime`                          | `number`                               |
| `useAnimationSpeed`                | `number`                               |
| `useTreeR`, `useTreeG`, `useTreeB` | `ExpressionNode`                       |
| `useRngR`, `useRngG`, `useRngB`    | `SeededRandom`                         |
| `useSelectedTree`                  | `ExpressionNode` — active channel only |
| `useSelectedRng`                   | `SeededRandom` — active channel only   |
| `useActiveAnimationBehaviorIds`    | `string[]`                             |

## Hooks (`src/hooks/`)

| Hook               | Role                                                                               |
| ------------------ | ---------------------------------------------------------------------------------- |
| `useWebGLContext`  | Creates/manages WebGL `RenderingContext` and fullscreen quad geometry              |
| `useShaderProgram` | Compiles GLSL from trees via `compileToGLSL()`, manages program lifecycle          |
| `useAnimationLoop` | Generic `requestAnimationFrame` loop with delta callback                           |
| `useCanvasSize`    | Computes logical + bitmap size from container, accounting for `devicePixelRatio`   |
| `useWebGLRenderer` | Orchestrator: wires context, shader, time tracking, and uniform updates each frame |

The GPU render pipeline:

1. `useWebGLRenderer` sets up WebGL context, vertex buffer, and fullscreen quad
2. On tree change: compiles the AST to a GLSL fragment shader via `compileToGLSL()`, links the program, sets uniforms (`u_time`, `u_animSpeed`, `u_resolution`), and draws
3. When `running`: a `requestAnimationFrame` loop increments a local `useRef(0)` and writes `u_time` and `u_animSpeed` uniforms each frame
4. Every 6 frames the local time is throttled to the store for UI display (`TimeDisplay`)
5. On `running` start, the local ref syncs from store time
6. Fragment shader evaluates the expression per-pixel in parallel on the GPU and applies active animation behaviors

## Components (`src/components/`)

| Component         | Role                                                |
| ----------------- | --------------------------------------------------- |
| `RandomArtCanvas` | Reads trees from store, renders via `<WebGLCanvas>` |
| `WebGLCanvas`     | `<canvas>` shell that mounts `useWebGLRenderer`     |

### Inspector (`components/inspector/`)

| Component           | Role                                        |
| ------------------- | ------------------------------------------- |
| `FloatingInspector` | Toggle button + positioned dialog overlay   |
| `InspectorPanel`    | Composes all inspector sub-panels           |
| `ChannelTabs`       | R/G/B channel selector                      |
| `AstTreeView`       | AST tree view via `nodeToTreeView()`        |
| `ChoiceHistory`     | RNG choice history for the selected channel |
| `MathFormula`       | Math formula via `nodeToMathString()`       |
| `SeedInfo`          | Initial hash and grammar step count         |

### Controls (`components/controls/`)

| Component          | Role                                 |
| ------------------ | ------------------------------------ |
| `Controls`         | 3-column grid composing all controls |
| `SeedInput`        | Text input for seed phrase           |
| `ShuffleButton`    | Randomizes seed                      |
| `MaxDepth`         | Number input (1-10)                  |
| `CorrelatedToggle` | Toggle correlated RGB mode           |
| `AnimationToggle`  | Toggle animation behaviors           |
| `AnimationSpeed`   | Slider (0-2)                         |
| `PlaybackButton`   | Play/Pause                           |
| `ResetTimeButton`  | Reset time to 0                      |
| `TimeDisplay`      | Read-only current time               |
| `DownloadButton`   | Download PNG                         |
| `GrammarList`      | Toggleable grammar rule badges       |

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

