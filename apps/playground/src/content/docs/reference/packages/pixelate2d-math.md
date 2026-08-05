---
title: "Pixelate2d Math"
description: "Pure, curried math for 2D creative coding — vectors, affine transforms, and a pan/zoom camera model with zero DOM, zero React, zero side effects."
category: "reference"
tags:
  - reference
  - pixelate2d-math
order: 20
---


# @repo/pixelate2d-math

---

## Essence

The math layer of the [Pixelate2D](../../pixelate2d-core/) stack. Everything is
a plain object (`{ x, y }`, `{ a, b, c, d, tx, ty }`) so values can cross
worker and GPU boundaries. Functions are curried for left-to-right reading:

```ts
const p = addVec({ x: 1, y: 2 })({ x: 3, y: 4 }); // { x: 4, y: 6 }
const rotated = apply2d(rotation2d(Math.PI / 2))({ x: 1, y: 0 });
```

## Exports

```typescript
import {
  vec, addVec, subVec, mulVec, lenVec, distVec, normVec, dotVec, lerpVec,
  identity2d, mat2d, translation2d, rotation2d, scaling2d, compose2d,
  multiply2d, apply2d, invert2d, toMat3,
  defaultCamera, cameraMatrix, screenToWorld, worldToScreen,
  clamp, lerp, pointInRect, pointInCircle, rectsOverlap,
  type Vec2, type Size, type Rect, type Circle, type Mat2D, type Camera,
} from '@repo/pixelate2d-math';
```

## The Camera Model

One model shared by every driver: `screen = world * zoom + (x, y)`. The GPU
driver composes `cameraMatrix()` into its projection; the CPU driver bakes it
into the Canvas2D transform; `screenToWorld`/`worldToScreen` handle both
directions for input picking.

## Notes

- `compose2d(...matrices)` applies the rightmost argument first — read the list
  in the order transforms should fire.
- `toMat3` returns a GL column-major 9-tuple ready for `uniformMatrix3fv`.
- `invert2d` returns the identity for singular matrices rather than `NaN`s.

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_

