---
title: "Randomart"
description: "React UI for the random expression-tree art generator. Consumes [`@repo/randomart-engine`](../engines/randomart-engine/) which provides the grammar-driven AST engine, CPU evaluation, GLSL compilation, and PNG export."
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

## Package split

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

Vanilla Zustand store with selector hooks and action functions. On every config change (`seedText`, `maxDepth`, `enabledRuleIds`, `correlatedRGB`) a store subscriber auto-regenerates trees via `generateTrees()` from `@repo/randomart-engine`.

### State shape

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

### Action files

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

## Conventions

- **Named exports only** — no `export default`
- **No barrel files** — import directly from source paths
- **Zustand store** — unexported `createStore()`, getter hooks (`use*`), plain setter functions
- **React 19 compiler** — no manual `useMemo`/`useCallback`; the compiler handles stable references
- **`@repo/ui` components** for all UI
- **CSS tokens** — no hardcoded colors, spacing, or radius values

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

