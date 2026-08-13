---
title: gpu/batch/ShapeBatcher
package: "@repo/glaze"
kind: module
module: gpu/batch/ShapeBatcher
---

## Modules

- [\<internal\>](@repo.glaze.gpu.batch.ShapeBatcher.<internal>.md)

## Classes

### ShapeBatcher

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:84](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L84)

Batches every shape into one dynamic vertex buffer and a single draw call per flush — the
pixelate2d approach ported to glaze. Shapes are tessellated on the CPU (position + RGBA per
vertex) and drawn through one shared program with a single `u_projection` uniform, instead of a
fullscreen fragment pass per shape.

#### Constructors

##### Constructor

> **new ShapeBatcher**(`options`): [`ShapeBatcher`](#shapebatcher)

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:97](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L97)

###### Parameters

###### options

[`ShapeBatcherOptions`](#shapebatcheroptions)

###### Returns

[`ShapeBatcher`](#shapebatcher)

#### Methods

##### destroy()

> **destroy**(): `void`

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:187](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L187)

###### Returns

`void`

##### drawCircle()

> **drawCircle**(`center`, `radius`, `style`): `void`

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:104](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L104)

###### Parameters

###### center

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### radius

`number`

###### style

[`DrawStyle`](@repo.glaze.cpu.shapes.types.md#drawstyle)

###### Returns

`void`

##### drawLine()

> **drawLine**(`a`, `b`, `style`): `void`

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:136](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L136)

###### Parameters

###### a

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### b

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### style

[`DrawStyle`](@repo.glaze.cpu.shapes.types.md#drawstyle)

###### Returns

`void`

##### drawRect()

> **drawRect**(`rect`, `style`): `void`

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:121](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L121)

###### Parameters

###### rect

[`Rect`](@repo.glaze.cpu.shapes.types.md#rect)

###### style

[`DrawStyle`](@repo.glaze.cpu.shapes.types.md#drawstyle)

###### Returns

`void`

##### flush()

> **flush**(): `void`

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:144](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L144)

###### Returns

`void`

##### reinitialize()

> **reinitialize**(): `void`

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:182](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L182)

###### Returns

`void`

## Interfaces

### ShapeBatcherOptions

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:39](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L39)

#### Properties

##### camera

> **camera**: [`Camera`](@repo.glaze.core.Camera.md#camera)

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:41](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L41)

##### getViewport

> **getViewport**: () => `object`

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:42](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L42)

###### Returns

`object`

###### height

> **height**: `number`

###### width

> **width**: `number`

##### gl

> **gl**: [`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext)

Defined in: [packages/glaze/src/gpu/batch/ShapeBatcher.ts:40](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/ShapeBatcher.ts#L40)
