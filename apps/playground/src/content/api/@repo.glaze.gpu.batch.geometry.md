---
title: gpu/batch/geometry
package: "@repo/glaze"
kind: module
module: gpu/batch/geometry
---

## Type Aliases

### Mat3

> **Mat3** = readonly \[`number`, `number`, `number`, `number`, `number`, `number`, `number`, `number`, `number`\]

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L7)

GL 3x3 matrix in column-major order (element `i` = row `i % 3`, column `i / 3`), fed straight
into `uniformMatrix3fv`.

## Functions

### cameraMatrix()

> **cameraMatrix**(`camera`): [`Mat3`](#mat3)

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L46)

World → screen (CSS px, y-down): `screen = world * zoom + camera.xy`.

#### Parameters

##### camera

[`Camera`](@repo.glaze.core.Camera.md#camera)

The current view transform.

#### Returns

[`Mat3`](#mat3)

The column-major camera transform.

***

### capSegments()

> **capSegments**(`width`, `zoom`): `number`

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:99](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L99)

Tessellation of a line cap scales with its screen width (width × zoom), clamped to 4..32.

#### Parameters

##### width

`number`

Line width in world units.

##### zoom

`number`

Current camera zoom.

#### Returns

`number`

The number of cap segments.

***

### circleFillVertices()

> **circleFillVertices**(`radius`, `zoom`): `number`

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:121](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L121)

#### Parameters

##### radius

`number`

##### zoom

`number`

#### Returns

`number`

***

### circleRing()

> **circleRing**(`cx`, `cy`, `radius`, `segments`): [`Point2D`](@repo.glaze.core.Camera.md#point2d)[]

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:112](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L112)

`segments` points around the ring, starting at angle 0 (positive x).

#### Parameters

##### cx

`number`

Ring center x.

##### cy

`number`

Ring center y.

##### radius

`number`

Ring radius.

##### segments

`number`

Number of vertices.

#### Returns

[`Point2D`](@repo.glaze.core.Camera.md#point2d)[]

Ring vertices in world coordinates.

***

### circleSegments()

> **circleSegments**(`radius`, `zoom`): `number`

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:88](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L88)

Tessellation of a circle scales with its screen size (radius × zoom), clamped to 12..128.

#### Parameters

##### radius

`number`

Circle radius in world units.

##### zoom

`number`

Current camera zoom.

#### Returns

`number`

The number of ring segments.

***

### circleStrokeVertices()

> **circleStrokeVertices**(`radius`, `zoom`): `number`

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:125](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L125)

#### Parameters

##### radius

`number`

##### zoom

`number`

#### Returns

`number`

***

### lineVertices()

> **lineVertices**(`width`, `zoom`): `number`

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:144](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L144)

Center quad plus two rounded caps.

#### Parameters

##### width

`number`

Line width in world units.

##### zoom

`number`

Current camera zoom.

#### Returns

`number`

The vertex count for a line at the given screen width.

***

### multiplyMat3()

> **multiplyMat3**(`a`, `b`): [`Mat3`](#mat3)

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:19](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L19)

#### Parameters

##### a

[`Mat3`](#mat3)

##### b

[`Mat3`](#mat3)

#### Returns

[`Mat3`](#mat3)

***

### projectionFor()

> **projectionFor**(`camera`, `width`, `height`): [`Mat3`](#mat3)

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:69](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L69)

World → NDC for a single batched draw call, composing `viewportMatrix` after `cameraMatrix`.

#### Parameters

##### camera

[`Camera`](@repo.glaze.core.Camera.md#camera)

The current view transform.

##### width

`number`

Viewport width in CSS px.

##### height

`number`

Viewport height in CSS px.

#### Returns

[`Mat3`](#mat3)

The combined column-major projection.

***

### rectFillVertices()

> **rectFillVertices**(): `number`

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:129](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L129)

#### Returns

`number`

***

### rectStrokeVertices()

> **rectStrokeVertices**(): `number`

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:133](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L133)

#### Returns

`number`

***

### sameMat3()

> **sameMat3**(`a`, `b`): `boolean`

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:33](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L33)

#### Parameters

##### a

[`Mat3`](#mat3)

##### b

[`Mat3`](#mat3)

#### Returns

`boolean`

***

### viewportMatrix()

> **viewportMatrix**(`width`, `height`): [`Mat3`](#mat3)

Defined in: [packages/glaze/src/gpu/batch/geometry.ts:57](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/batch/geometry.ts#L57)

Screen (CSS px, y-down) → NDC.

#### Parameters

##### width

`number`

Viewport width in CSS px.

##### height

`number`

Viewport height in CSS px.

#### Returns

[`Mat3`](#mat3)

The column-major viewport transform.
