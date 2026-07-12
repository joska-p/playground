---
title: "Pixel Manipulator"
description: "A fluent pipeline that chains small, testable pixel transforms into a single loop pass — turning raw image data into something alive, one callback at a time."
category: "reference"
tags:
  - reference
  - pixel-manipulator
order: 20
---

---
title: 'Pixel Manipulator'
coordinates: '/visuals/pipelines'
status: 'Active'
date_discovered: 2024-01-15
---

# @repo/pixel-manipulator

---

## Essence

Pixel Manipulator is a browser-native image processing pipeline built on a
deceptively simple idea: describe your visual transforms as tiny functions, snap
them into a chain, and let a single pixel loop execute them all. Each step
receives the output of the previous one per pixel — no intermediate `ImageData`
allocations, no redundant traversals.

But it doesn't stop at the math. The package ships a complete React UI layer —
a component that renders the pipeline as a visual workflow, a hook for image
upload handling, and DOM helpers that bridge `<img>` elements to raw pixel data
and back. The manipulation core is pure and framework-agnostic; the React layer
is a convenience wrapper you can ignore entirely.

The result is a two-world package: a chainable pipeline engine for
programmatic use, and a ready-made interface for interactive experimentation.

## Quick Launch

```bash
pnpm dev --filter @repo/playground
```

Or install it into your own project:

```bash
pnpm add @repo/pixel-manipulator
```

```ts
import { manipulate } from '@repo/pixel-manipulator';
import { grayscale, brightness } from '@repo/pixel-manipulator';
import { imageElementToImageData, putImageData } from '@repo/pixel-manipulator';

const source = imageElementToImageData(img);

const result = manipulate(source).apply(grayscale()).apply(brightness(1.3)).toImageData();

putImageData(canvas, result);
```

## Field Notes

- **The Catalyst:** The realization that most browser image manipulation APIs
  force you into either a single monolithic filter call or a hand-rolled pixel
  loop with all the boilerplate that entails. What if building an image
  pipeline felt like composing a sentence — each verb a small, testable
  transformation, each chain a complete thought?

- **Quirks & Anomalies:** Every callback runs in a single pixel loop, so the
  output of one transform feeds directly into the next at the per-pixel level
  — there's no intermediate `ImageData` between steps. The `sourceData` field
  on `PixelContext` always points to the _original_ unmodified pixels, which
  means neighbour-dependent effects like blur and edge detection work correctly
  even mid-chain. This is a subtle but critical design choice: the pipeline
  is sequential in intent but the data it reads from is immutable.

- **Future Horizons:** Streaming pixel callbacks for video frame processing, a
  plugin registry where custom manipulations declare their metadata and
  parameter ranges, and GPU-accelerated pipeline execution via WebGPU compute
  shaders — all while keeping the same fluent `.apply()` surface.

---

## Pipeline Model

The flow is linear and explicit — raw pixels in, transformed pixels out, with
every intermediate stage observable:

```
HTMLImageElement
       │
       ▼
imageElementToImageData()      ──►  ImageData
       │
       └── manipulate(source)
              .apply(grayscale())
              .apply(brightness(1.3))
              .toImageData()          ──► transformed ImageData
```

All transformations read from a source `ImageData` and produce a **new**
`ImageData` without mutating the original.

## Core Primitives

| Export / method                    | Purpose                                             |
| ---------------------------------- | --------------------------------------------------- |
| `imageElementToImageData(image)`   | Convert a loaded `<img>` into raw pixel data        |
| `putImageData(canvas, imageData)`  | Render `ImageData` onto a `<canvas>`                |
| `getImageData(canvas)`             | Snapshot current canvas pixels                      |
| `drawImageOnCanvas(canvas, image)` | Draw an `<img>` onto a canvas                       |
| `manipulate(imageData)`            | Create a fluent pipeline builder                    |
| `── .apply(callback)`              | Add a manipulation step (returns `this`)            |
| `── .toImageData()`                | Execute all steps, return final `ImageData`         |
| `── .toArray()`                    | Execute step-by-step, return `[original, step1, …]` |
| `── .toCanvas(canvas)`             | Execute and write result to a canvas                |
| `iteratePixels(source, callbacks)` | Low-level loop primitive                            |

## Types

```ts
type RGBA = { r: number; g: number; b: number; a: number };

type PixelContext = {
  r;
  g;
  b;
  a: number; // current pixel value (may be modified by earlier callbacks)
  x;
  y: number; // pixel position
  index: number; // byte offset in Uint8ClampedArray
  width;
  height: number;
  sourceData: Uint8ClampedArray; // original unmodified data (for neighbour reads)
};

type PixelCallback = (ctx: PixelContext) => RGBA;
```

## Built-in Manipulations

Each factory returns a `PixelCallback` — a small, composable function that
knows how to transform one pixel:

| Factory                | Args                | Description                                   |
| ---------------------- | ------------------- | --------------------------------------------- |
| `grayscale()`          | —                   | Luminance-weighted `0.299R + 0.587G + 0.114B` |
| `brightness(factor)`   | `factor` (0–3)      | Multiply RGB by `factor`                      |
| `contrast(factor)`     | `factor` (0–3)      | Adjust contrast around midpoint 128           |
| `saturate(amount)`     | `amount` (0–3)      | Adjust saturation via luminance blend         |
| `sepia()`              | —                   | Classic sepia tone matrix                     |
| `invert()`             | —                   | `255 - channel` per component                 |
| `threshold(threshold)` | `threshold` (0–255) | Binary black/white by luminance               |
| `energyMap()`          | —                   | Sobel gradient magnitude (edge detection)     |

## Composing a Pipeline

Callbacks chain with `manipulate`. They run **in a single pixel loop** —
the output of each callback feeds into the next per pixel:

```ts
import { manipulate } from '@repo/pixel-manipulator';
import { grayscale, brightness, energyMap } from '@repo/pixel-manipulator';
import { imageElementToImageData, putImageData } from '@repo/pixel-manipulator';

const source = imageElementToImageData(imgElement);

const result = manipulate(source).apply(grayscale()).apply(brightness(1.3)).toImageData();

putImageData(canvasElement, result);
```

### Inspecting intermediate steps

Use `.toArray()` to get every step's output, including the original — useful
for debugging or building a visual history of the pipeline:

```ts
const [original, grayed, brightened] = manipulate(source)
  .apply(grayscale())
  .apply(brightness(1.3))
  .toArray();
```

## Authoring Custom Manipulations

A manipulation is just a factory that returns a `PixelCallback`. The pattern
is deliberately minimal — you describe what happens to one pixel, and the
pipeline handles the rest:

```ts
import type { PixelCallback } from '@repo/pixel-manipulator';

const tint =
  (hue: number): PixelCallback =>
  ({ r, g, b, a }) => ({
    r: Math.min(255, r + hue),
    g,
    b: Math.max(0, b - hue),
    a
  });

manipulate(source).apply(grayscale()).apply(tint(30)).toImageData();
```

For neighbour-dependent effects (blur, edge detection), use `sourceData` on
`PixelContext` — it always points to the original unmodified data for the
current pass, giving you a stable reference even mid-chain.

## Workflow Presets

The built-in UI ships 9 pre-configured multi-step workflows. Selecting a
preset and clicking **Load Workflow** populates the workflow editor with all
steps and their tuned arguments — a quick way to see the pipeline in action
without wiring anything up manually:

| Preset        | Steps                                           |
| ------------- | ----------------------------------------------- |
| Vintage       | sepia → brightness(1.2) → contrast(0.8)         |
| Dramatic B&W  | grayscale → contrast(2.0)                       |
| Neon          | saturate(2.5) → brightness(1.2) → contrast(1.5) |
| Blueprint     | invert → threshold(200)                         |
| Soft Pastel   | saturate(1.1) → brightness(1.3) → contrast(0.7) |
| Dark & Moody  | brightness(0.5) → contrast(1.8) → saturate(0.6) |
| Overexposed   | brightness(2.2) → contrast(0.5)                 |
| High Contrast | contrast(2.5) → saturate(1.6)                   |
| Edge Ink      | grayscale → energyMap                           |

Once loaded, steps can be reordered, removed, or tuned via sliders before
executing.

## React Component

The package ships a self-contained React component that renders the full
manipulation interface — file upload, manipulation selector, workflow builder
with preset support, and canvases showing the result of each pipeline step:

```tsx
import { ImageManipulator } from '@repo/pixel-manipulator';

function App() {
  return <ImageManipulator />;
}
```

## Hook

For cases where you need the upload logic without the full UI, the
`useImageUpload` hook decouples image selection from rendering:

```ts
import { useImageUpload } from "@repo/pixel-manipulator";

const [imageSrc, handleUpload] = useImageUpload();

return <input type="file" accept="image/*" onChange={handleUpload} />;
```

Returns `[dataUrl: string | null, onChangeHandler]`.

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_

