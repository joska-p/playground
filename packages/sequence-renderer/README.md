# @repo/sequence-renderer

> Interactive canvas renderer for mathematical sequences — Recamán, Fibonacci, and more.

## Quick Start

```bash
pnpm add @repo/sequence-renderer
```

```tsx
import { App } from '@repo/sequence-renderer';

export default function MyViz() {
  return <App />;
}
```

Import styles:

```tsx
import '@repo/sequence-renderer/styles';
```

## Core Architecture

Generation and visualization are decoupled into two independent pipelines:

1. **Rules** — Pure functions that define a sequence term-by-term (`src/core/rules/`)
2. **Engine** — Generates the full sequence array from a rule + step count (`src/core/engine.ts`)
3. **Visual Layers** — Composable drawing units that render onto a `<canvas>` (`src/core/visualizations/layers/`)
4. **Store** — Zustand state that wires everything together (`src/stores/sequence/store.ts`)

## Available Sequences

| Sequence       | Rule                       | Description           |
| :------------- | :------------------------- | :-------------------- |
| **Recamán**    | Jump back by n if possible | Classic visualization |
| **Fibonacci**  | F(n) = F(n-1) + F(n-2)     | Golden ratio          |
| **Primes**     | Prime numbers only         | Prime visualization   |
| **Triangular** | 1, 3, 6, 10, 15…           | Triangle numbers      |

## Visualization System

Visualizations are composed of **layers** bundled into **presets**.

### Layers

Each layer is a plain `VisualLayer` object (no factory needed):

```typescript
import type { VisualLayer } from '../types';

const myLayer: VisualLayer = {
  id: 'my-layer',
  name: 'My Layer',
  description: 'What it draws',
  category: 'drawing', // 'cosmetic' | 'drawing'
  defaults: { lineWidth: 1, alpha: 0.8 },
  params: {
    lineWidth: {
      label: 'Line Width',
      type: 'number',
      min: 0.5,
      max: 5,
      step: 0.5
    },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    color: { label: 'Color', type: 'color' }
  },
  draw: (ctx, data, params, layout) => {
    // ctx: CanvasRenderingContext2D
    // data: number[]           — the full sequence
    // params: resolved defaults merged with user overrides
    // layout: { minVal, maxVal, valueScale, offsetX, offsetY }
  }
};
```

Available layers in `src/core/visualizations/layers/`:

| Layer                | Category   | What it draws                                  |
| :------------------- | :--------- | :--------------------------------------------- |
| `drawBaseline`       | `cosmetic` | Horizontal line at y=0 from minVal to maxVal   |
| `drawPlottedNumbers` | `cosmetic` | Dots at each unique sequence value             |
| `drawRecamanArcs`    | `drawing`  | Semicircle arcs between consecutive values     |
| `drawFactorWaves`    | `drawing`  | Per-value sine waves radiating from each point |

### Rendering Pipeline

`src/core/visualizations/render.ts` — `render(canvas, data, layerEntries, viewport?)`

1. **Layout** — `computeLayout()` computes a uniform `valueScale` that fits both horizontal (95% width) and vertical (85% height) constraints, plus centering offsets.
2. **Viewport transform** — If viewport is enabled, applies `ctx.translate(panX, panY).scale(zoom, zoom)` for zoom/pan.
3. **Layer draw** — Iterates `layerEntries`, skipping disabled ones, merging `defaults` with user params, and calling each layer's `draw()`.

### CanvasLayout

| Field        | Description                                     |
| :----------- | :---------------------------------------------- |
| `minVal`     | Minimum value in the sequence                   |
| `maxVal`     | Maximum value in the sequence                   |
| `valueScale` | Uniform pixels-per-unit (same for x and y)      |
| `offsetX`    | Canvas-space x‑coordinate where value 0 maps to |
| `offsetY`    | Canvas-space y‑coordinate where y=0 maps to     |

### CanvasViewport (Zoom & Pan)

The viewport applies a uniform canvas transform on top of the auto-layout:

| Field     | Default | Description                           |
| :-------- | :------ | :------------------------------------ |
| `zoom`    | `1`     | Uniform scale factor (0.1–5)          |
| `panX`    | `0`     | Horizontal shift in canvas pixels     |
| `panY`    | `0`     | Vertical shift in canvas pixels       |
| `enabled` | `false` | Toggles the viewport transform on/off |

Enable via:

- **Mouse wheel** — zooms centered on cursor position
- **Click-drag** — pans the canvas
- **Viewport panel** — UI toggles + sliders for zoom, panX, panY

### Presets

Presets bundle a layer stack into a named, shareable configuration.

```typescript
type PresetRecord = {
  id: string;
  name: string;
  layers: LayerConfigEntry[]; // { layerId, enabled, params }
  isBuiltIn: boolean;
};
```

Built-in presets (`src/core/visualizations/presets.ts`):

| Preset       | Layers                                    |
| :----------- | :---------------------------------------- |
| Recamán Walk | baseline + plotted-numbers + recaman-arcs |
| Front Wave   | baseline + plotted-numbers + factor-waves |

Custom presets are persisted to `localStorage` and appear in the preset selector.

### Scaling Algorithm

`src/core/visualizations/scale.ts`:

- `maxAbsInterval(data)` — Largest absolute difference between consecutive values (used for vertical constraint)
- `linearScale(canvasWidth, maxDataValue, padding?)` — Standalone scale helper (not used internally, available for custom layers)

## State & Store

Single zustand store with selector hooks:

```typescript
const sequenceRule = useSequenceRule(); // Current SequenceRule
const steps = useSequenceSteps(); // Step count
const sequence = useSequenceSequence(); // Generated number array
const layers = useLayersConfig(); // LayerConfigEntry[]
const basePresetId = useBasePresetId(); // Active preset or null
const viewport = useViewport(); // CanvasViewport
```

| Mutation                                     | Effect                                   |
| :------------------------------------------- | :--------------------------------------- |
| `setSequenceRule({ sequenceRule })`          | Change rule, clamp steps, regenerate     |
| `setSequenceSteps({ steps })`                | Change step count, regenerate            |
| `loadPreset(presetId)`                       | Replace layer stack with preset's config |
| `saveCurrentPreset(name)`                    | Persist current layers to localStorage   |
| `toggleLayer(layerId)`                       | Enable/disable a layer                   |
| `addLayer(layerId)`                          | Append a new layer with defaults         |
| `removeLayer(layerId)`                       | Remove a layer (guards last enabled)     |
| `moveLayerUp(layerId)`                       | Move layer up in draw order              |
| `moveLayerDown(layerId)`                     | Move layer down in draw order            |
| `updateLayerParams(layerId, params)`         | Merge param overrides for a layer        |
| `setViewport({ zoom, panX, panY, enabled })` | Update viewport state                    |

## Data Flow

```
User changes → Store updates → Engine regenerates sequence → Canvas re-renders
                                  ↓
                            Layer draw loop
                                  ↓
                         computeLayout() → viewport transform → per-layer draw()
```

## How to Add a New Sequence

1. Create a rule file in `src/core/rules/`:

```typescript
import { createRule } from './create-rule';

export const myRule = createRule({
  id: 'my-rule',
  name: 'My Rule',
  description: 'What it does',
  maxSteps: 500,
  getNext: ({ index, current, sequence, seen }) => {
    // return next value
  }
});
```

2. Register in `src/core/rules/registry.ts`:

```typescript
import { myRule } from './myRule';
rules.set(myRule.id, myRule);
```

The rule automatically appears in the sequence selector dropdown.

## How to Add a New Layer

Create a file in `src/core/visualizations/layers/`:

```typescript
import type { VisualLayer } from '../types';

const drawMyFeature: VisualLayer = {
  id: 'my-feature',
  name: 'My Feature',
  description: 'What it draws',
  category: 'drawing',
  defaults: { lineWidth: 2, radius: 5 },
  params: {
    lineWidth: {
      label: 'Line Width',
      type: 'number',
      min: 0.5,
      max: 5,
      step: 0.5
    },
    radius: { label: 'Radius', type: 'number', min: 1, max: 20, step: 1 }
  },
  draw: (ctx, data, params, layout) => {
    const { lineWidth, radius } = params as Record<string, unknown>;
    const { valueScale, offsetX, offsetY } = layout;

    ctx.save();
    ctx.lineWidth = lineWidth as number;
    data.forEach((val) => {
      const x = offsetX + val * valueScale;
      ctx.beginPath();
      ctx.arc(x, offsetY, radius as number, 0, 2 * Math.PI);
      ctx.stroke();
    });
    ctx.restore();
  }
};

export { drawMyFeature };
```

Then register it in `src/core/visualizations/layers/registry.ts`:

```typescript
import { drawMyFeature } from './drawMyFeature';
// add to the `layers` array
```

The layer automatically appears in the "Add Layer" dropdown in the UI.

## Layout Values Explained

The `computeLayout()` function in `render.ts` produces these values for every render pass:

| Value             | How it's computed                                                              |
| :---------------- | :----------------------------------------------------------------------------- |
| `valueScale`      | `Math.min(horizontalScale, verticalScale)` — whichever constraint is tighter   |
| `horizontalScale` | `(canvasWidth * 0.95) / dataRange` — fits the full min→max span in 95% width   |
| `verticalScale`   | `(canvasHeight * 0.85) / maxAbsInterval` — fits the largest step in 85% height |
| `offsetX`         | Pans so `minVal` aligns with the left padding margin                           |
| `offsetY`         | `canvasHeight / 2` — vertical center                                           |

## Component Tree

```
App
  ErrorBoundary
    Sidebar (right panel)
      Sidebar.Main
        SequenceDisplay            — <canvas> with mouse wheel zoom + drag pan
      Sidebar.Panel
        Controls
          SequenceSelector         — Dropdown: Recamán, Fibonacci, Primes, Triangular
          Slider "Steps"           — Step count (2 … rule's maxSteps)
          Select "Visualization"   — Built-in + custom presets
          LayerStackEditor         — Add/remove/reorder layers, toggle per-layer params
          ViewportControls         — Zoom/Pan toggle + sliders
```

---

_Part of @repo/playground_
