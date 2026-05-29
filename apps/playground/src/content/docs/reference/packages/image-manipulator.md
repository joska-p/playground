---
title: "Image Manipulator"
description: "Image Manipulator package"
category: "reference"
tags:
  - reference
  - image-manipulator
order: 20
---

# @repo/image-manipulator

Fluent pixel-manipulation pipeline for the browser. Build image-processing
effects by chaining small, testable `PixelCallback` functions into a single
loop pass over the image data.

## Pipeline model

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

## Install

```bash
pnpm add @repo/image-manipulator
```

## Core primitives

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

### Types

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

## Manipulations

Built-in `PixelCallback` factories:

- **`grayscale()`** — luminance-weighted `0.299R + 0.587G + 0.114B`
- **`brightness(factor)`** — multiply RGB by `factor` (>1 brightens, <1 darkens)
- **`computeEnergy()`** — Sobel gradient magnitude (edge detection / seam carving)

## Creating a pipeline

Callbacks are chained with `manipulate`. They run **in a single pixel loop** —
the output of each callback feeds into the next per pixel:

```ts
import { manipulate } from "@repo/image-manipulator";
import { grayscale, brightness, computeEnergy } from "@repo/image-manipulator";
import { imageElementToImageData, putImageData } from "@repo/image-manipulator";

// 1. Load source
const source = imageElementToImageData(imgElement);

// 2. Build and execute pipeline (one pass)
const result = manipulate(source)
  .apply(grayscale())
  .apply(brightness(1.3))
  .toImageData();

// 3. Render
putImageData(canvasElement, result);
```

### Inspecting intermediate steps

Use `.toArray()` to get every step's output, including the original:

```ts
const [original, grayed, brightened] = manipulate(source)
  .apply(grayscale())
  .apply(brightness(1.3))
  .toArray();

// original   = source (unmodified)
// grayed     = after grayscale()
// brightened = after brightness(1.3)
```

### Writing a custom manipulation

A manipulation is just a factory that returns a `PixelCallback`:

```ts
import type { PixelCallback } from "@repo/image-manipulator";

const tint =
  (hue: number): PixelCallback =>
  ({ r, g, b, a }) => ({
    r: Math.min(255, r + hue),
    g,
    b: Math.max(0, b - hue),
    a,
  });

// Use it in a pipeline
manipulate(source)
  .apply(grayscale())
  .apply(tint(30))
  .toImageData();
```

Use `sourceData` on `PixelContext` for neighbour-dependent effects (blur, edge
detection, etc.) — it always points to the original unmodified data for the
current pass.

## React component

```tsx
import { ImageManipulator } from "@repo/image-manipulator";

function App() {
  return <ImageManipulator />;
}
```

Renders a file upload, a manipulation selector, a workflow builder, and
canvases showing the result of each pipeline step.

## Hook

```ts
import { useImageUpload } from "@repo/image-manipulator";

const [imageSrc, handleUpload] = useImageUpload();

return <input type="file" accept="image/*" onChange={handleUpload} />;
```

Returns `[dataUrl: string | null, onChangeHandler]`.

---

_Part of @repo/playground_

