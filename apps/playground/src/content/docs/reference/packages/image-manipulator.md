---
title: "Image Manipulator"
description: "Fluent pixel-manipulation pipeline for the browser. Build image-processing effects by chaining small, testable `PixelCallback` functions into a single loop pass over the image data."
category: "reference"
tags:
  - reference
  - image-manipulator
order: 20
---

# @repo/image-manipulator

> Fluent pixel-manipulation pipeline for the browser. Build image-processing effects by chaining small, testable `PixelCallback` functions into a single loop pass over the image data.

## Quick Start

```bash
pnpm add @repo/image-manipulator
```

```ts
import { manipulate } from "@repo/image-manipulator";
import { grayscale, brightness } from "@repo/image-manipulator";
import { imageElementToImageData, putImageData } from "@repo/image-manipulator";

const source = imageElementToImageData(img);

const result = manipulate(source)
  .apply(grayscale())
  .apply(brightness(1.3))
  .toImageData();

putImageData(canvas, result);
```

## Pipeline Model

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

| Export / method                    | Purpose                                      |
| ---------------------------------- | -------------------------------------------- |
| `imageElementToImageData(image)`   | Convert a loaded `<img>` into raw pixel data |
| `putImageData(canvas, imageData)`  | Render `ImageData` onto a `<canvas>`         |
| `getImageData(canvas)`             | Snapshot current canvas pixels               |
| `drawImageOnCanvas(canvas, image)` | Draw an `<img>` onto a canvas                |
| `manipulate(imageData)`            | Create a fluent pipeline builder             |
| `── .apply(callback)`              | Add a manipulation step (returns `this`)     |
| `── .toImageData()`                | Execute all steps, return final `ImageData`  |
| `── .toArray()`                    | Execute step-by-step, return `[original, step1, …]` |
| `── .toCanvas(canvas)`             | Execute and write result to a canvas         |
| `iteratePixels(source, callbacks)` | Low-level loop primitive                     |

## Types

```ts
type RGBA = { r: number; g: number; b: number; a: number };

type PixelContext = {
  r; g; b; a: number;       // current pixel value (may be modified by earlier callbacks)
  x; y: number;              // pixel position
  index: number;             // byte offset in Uint8ClampedArray
  width; height: number;
  sourceData: Uint8ClampedArray; // original unmodified data (for neighbour reads)
};

type PixelCallback = (ctx: PixelContext) => RGBA;
```

## Manipulations

Built-in `PixelCallback` factories:

| Factory                   | Args                  | Description                              |
| ------------------------- | --------------------- | ---------------------------------------- |
| `grayscale()`             | —                     | Luminance-weighted `0.299R + 0.587G + 0.114B` |
| `brightness(factor)`      | `factor` (0–3)        | Multiply RGB by `factor`                 |
| `contrast(factor)`        | `factor` (0–3)        | Adjust contrast around midpoint 128      |
| `saturate(amount)`        | `amount` (0–3)        | Adjust saturation via luminance blend    |
| `sepia()`                 | —                     | Classic sepia tone matrix                |
| `invert()`                | —                     | `255 - channel` per component            |
| `threshold(threshold)`    | `threshold` (0–255)   | Binary black/white by luminance          |
| `energyMap()`             | —                     | Sobel gradient magnitude (edge detection)|

## Usage

### Creating a pipeline

Callbacks are chained with `manipulate`. They run **in a single pixel loop** —
the output of each callback feeds into the next per pixel:

```ts
import { manipulate } from "@repo/image-manipulator";
import { grayscale, brightness, energyMap } from "@repo/image-manipulator";
import { imageElementToImageData, putImageData } from "@repo/image-manipulator";

const source = imageElementToImageData(imgElement);

const result = manipulate(source)
  .apply(grayscale())
  .apply(brightness(1.3))
  .toImageData();

putImageData(canvasElement, result);
```

### Inspecting intermediate steps

Use `.toArray()` to get every step's output, including the original:

```ts
const [original, grayed, brightened] = manipulate(source)
  .apply(grayscale())
  .apply(brightness(1.3))
  .toArray();
```

## Custom Manipulations

A manipulation is just a factory that returns a `PixelCallback`:

```ts
import type { PixelCallback } from "@repo/image-manipulator";

const tint = (hue: number): PixelCallback =>
  ({ r, g, b, a }) => ({
    r: Math.min(255, r + hue),
    g,
    b: Math.max(0, b - hue),
    a,
  });

manipulate(source)
  .apply(grayscale())
  .apply(tint(30))
  .toImageData();
```

Use `sourceData` on `PixelContext` for neighbour-dependent effects
(blur, edge detection, etc.) — it always points to the original unmodified data
for the current pass.

## Workflow Presets

The built-in UI includes 9 pre-configured multi-step workflows.
Selecting a preset and clicking **Load Workflow** populates the workflow editor
with all steps and their tuned arguments.

| Preset           | Steps                                      |
| ---------------- | ------------------------------------------ |
| Vintage          | sepia → brightness(1.2) → contrast(0.8)   |
| Dramatic B&W     | grayscale → contrast(2.0)                  |
| Neon             | saturate(2.5) → brightness(1.2) → contrast(1.5) |
| Blueprint        | invert → threshold(200)                    |
| Soft Pastel      | saturate(1.1) → brightness(1.3) → contrast(0.7) |
| Dark & Moody     | brightness(0.5) → contrast(1.8) → saturate(0.6) |
| Overexposed      | brightness(2.2) → contrast(0.5)            |
| High Contrast    | contrast(2.5) → saturate(1.6)              |
| Edge Ink         | grayscale → energyMap                      |

Once loaded, steps can be reordered, removed, or tuned via sliders before executing.

## React Component

```tsx
import { ImageManipulator } from "@repo/image-manipulator";

function App() {
  return <ImageManipulator />;
}
```

Renders a file upload, a manipulation selector, a workflow builder with
preset support, and canvases showing the result of each pipeline step.

## Hook

```ts
import { useImageUpload } from "@repo/image-manipulator";

const [imageSrc, handleUpload] = useImageUpload();

return <input type="file" accept="image/*" onChange={handleUpload} />;
```

Returns `[dataUrl: string | null, onChangeHandler]`.

---

_Part of @repo/playground_

