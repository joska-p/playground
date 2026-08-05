---
title: "Pixelate2d Core"
description: "The backend-agnostic heart of Pixelate2D — curried drawing pipelines, a closure-based engine loop, an input poll store, and CPU + GPU render drivers behind one interface."
category: "reference"
tags:
  - reference
  - pixelate2d-core
order: 20
---


# @repo/pixelate2d-core

---

## Essence

Every drawing primitive is curried **Style → Geometry → Target → Driver** so
the API reads left-to-right and prefixes can be partially applied and reused:

```ts
import { runLoop, drawCircle, drawRect, drawText } from '@repo/pixelate2d-core';

const drawGoldNode = drawCircle('#ffd700')(8);

const stop = runLoop({ canvas, kind: 'cpu' })((driver, { input, camera }) => {
  driver.clear('#0a0a0c');
  drawGoldNode(input.getPointerWorldPos(camera))(driver);
  drawText('Pixelate2D')('#ffffff')(16)({ x: 20, y: 30 })(driver);
});
// stop() tears the loop down
```

`runLoop`, the drivers, the engine store, and the input store are all pure
closures — no React required. The React layer in `@repo/pixelate2d-react`
wraps this same core.

## Exports

```typescript
import { createEngine, runLoop, createEngineStore } from '@repo/pixelate2d-core';
import { createInputStore } from '@repo/pixelate2d-core';
import { createCpuDriver, createGpuDriver } from '@repo/pixelate2d-core';
import { drawCircle, drawRect, drawLine, drawText, fillPath, strokePath, withCamera } from '@repo/pixelate2d-core';
import { parseColor } from '@repo/pixelate2d-core';
import type { RenderDriver, FrameContext, FrameCallback } from '@repo/pixelate2d-core';
```

## The Driver Contract

```ts
clear(color)                                        // fill the whole frame
drawRectangle(style, rect, transform?)              // axis-aligned, or a full Mat2D
drawCircle(style, center, radius, transform?)
drawText(style, text, position, transform?)
drawPath(style, points, options?, transform?)       // fill + stroke, closed or open
```

Styles are **declared per call** — there is no global fill/stroke state. A
render callback written against `RenderDriver` runs unchanged on Canvas2D
(`createCpuDriver`) or WebGL2 (`createGpuDriver`). Both apply the current
`driver.camera` (world → screen), so pan/zoom happens at the driver boundary.

### GPU notes

- Filled/stroked primitives are batched into one dynamic vertex buffer and one
  draw call per frame; text is rasterized to an offscreen canvas and drawn as a
  textured quad (LRU-cached by `text|font`).
- Path fills use a triangle fan from the first point — convex polygons only.
  Concave fills are supported on the CPU driver.
- Context loss is handled: resources are rebuilt on `webglcontextrestored`.

## Field Notes

- **The loop is subscriber-based**: `engine.subscribe(fn)` runs callbacks each
  frame with no React involvement — this is what lets React render overlays at
  UI frequency while the canvas redraws at display frequency.
- `maxFps` throttling skips frames rather than sleeping; `deltaTime` is clamped
  to 100 ms so a tab-switch spike doesn't teleport a simulation.
- `wasKeyPressed`/`getPointerWorldPos` make the poll store feel like p5 while
  staying allocation-light for the loop.

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_

