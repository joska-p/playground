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

Composable pixel-manipulation pipeline for the browser. Build image-processing
effects by chaining small, testable `PixelCallback` functions into a single
loop pass over the image data.

## Pipeline model

```
HTMLImageElement
       │
       ▼
imageElementToImageData()      ──►  ImageData
       │
       ├── pipe(grayscale(), brightness(1.3))   ──► transformed ImageData
       │
       └── fork(computeEnergy())                ──► derived ImageData
```

All transformations read from a source `ImageData` and produce a **new**
`ImageData` without mutating the original.

## Install

```bash
pnpm add @repo/image-manipulator
```

## Core primitives

| Export                             | Purpose                                      |
| ---------------------------------- | -------------------------------------------- |
| `imageElementToImageData(image)`   | Convert a loaded `<img>` into raw pixel data |
| `putImageData(canvas, imageData)`  | Render `ImageData` onto a `<canvas>`         |
| `getImageData(canvas)`             | Snapshot current canvas pixels               |
| `drawImageOnCanvas(canvas, image)` | Draw an `<img>` onto a canvas                |
| `pipe(...callbacks)`               | Compose callbacks into one transformation    |
| `fork(callback)`                   | Create an independent derived image          |
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

Callbacks are composed with `pipe`. They run **in a single pixel loop** — the
output of each callback feeds into the next per pixel:

```ts
import { pipe, fork } from "@repo/image-manipulator";
import { grayscale, brightness, computeEnergy } from "@repo/image-manipulator";
import { imageElementToImageData, putImageData } from "@repo/image-manipulator";

// 1. Load source
const source = imageElementToImageData(imgElement);

// 2. Sequential pipe (one pass)
const result = pipe(grayscale(), brightness(1.3))(source);

// 3. Fork for analysis (independent of the pipe)
const energy = fork(computeEnergy())(source);

// 4. Render
putImageData(canvasElement, result);
putImageData(energyCanvas, energy);
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

// Use it in a pipe
pipe(grayscale(), tint(30))(source);
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

Renders an `<input type="file">` and three canvases: original, pipeline output
(grayscale + brighten), and Sobel energy map.

## Hook

```ts
import { useImageUpload } from "@repo/image-manipulator";

const [imageSrc, handleUpload] = useImageUpload();

return <input type="file" accept="image/*" onChange={handleUpload} />;
```

Returns `[dataUrl: string | null, onChangeHandler]`.

---

_Part of @repo/playground_

