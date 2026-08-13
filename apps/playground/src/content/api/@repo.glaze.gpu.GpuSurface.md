---
title: gpu/GpuSurface
package: "@repo/glaze"
kind: module
module: gpu/GpuSurface
---

## Classes

### GpuSurface

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:37](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L37)

WebGL2 surface with the same chainable, world-space drawing model as `CpuSurface`. Shapes are
tessellated into one shared vertex buffer and drawn in a single batched call; `createProgram` /
`renderProgram` add fullscreen shader passes. Per-frame state — `time` / `deltaTime` (seconds),
`width` / `height` (CSS px) — is updated before each draw callback, and context loss/restore is
handled internally.

#### Constructors

##### Constructor

> **new GpuSurface**(`config`): [`GpuSurface`](#gpusurface)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:65](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L65)

###### Parameters

###### config

[`GpuSurfaceConfig`](#gpusurfaceconfig)

###### Returns

[`GpuSurface`](#gpusurface)

#### Properties

##### camera

> `readonly` **camera**: [`Camera`](@repo.glaze.core.Camera.md#camera)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:49](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L49)

##### canvas

> `readonly` **canvas**: [`HTMLCanvasElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlcanvaselement)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:47](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L47)

##### deltaTime

> **deltaTime**: `number` = `0`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:41](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L41)

Seconds since the previous frame.

##### dpr

> `readonly` **dpr**: `number`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L46)

##### frameCount

> **frameCount**: `number` = `0`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:42](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L42)

##### gl

> `readonly` **gl**: [`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:48](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L48)

##### height

> **height**: `number` = `0`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:45](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L45)

##### input

> `readonly` **input**: [`InputStore`](@repo.glaze.core.InputStore.md#inputstore)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:50](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L50)

##### time

> **time**: `number` = `0`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:39](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L39)

Seconds since the frame loop started.

##### width

> **width**: `number` = `0`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:44](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L44)

CSS pixels, not device pixels — multiply by `dpr` for the backing-buffer size.

#### Accessors

##### isRunning

###### Get Signature

> **get** **isRunning**(): `boolean`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:91](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L91)

###### Returns

`boolean`

##### pointer

###### Get Signature

> **get** **pointer**(): [`Point2D`](@repo.glaze.core.Camera.md#point2d)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:100](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L100)

Current pointer position in world coordinates.

###### Returns

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

The pointer position, camera-transformed.

#### Methods

##### circle()

###### Call Signature

> **circle**(`x`, `y`, `radius`, `fill?`, `stroke?`, `lineWidth?`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:181](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L181)

###### Parameters

###### x

`number`

###### y

`number`

###### radius

`number`

###### fill?

`string`

###### stroke?

`string`

###### lineWidth?

`number`

###### Returns

`this`

###### Call Signature

> **circle**(`center`, `radius`, `style?`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:189](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L189)

###### Parameters

###### center

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### radius

`number`

###### style?

[`DrawStyle`](@repo.glaze.cpu.shapes.types.md#drawstyle)

###### Returns

`this`

##### clear()

> **clear**(`r?`, `g?`, `b?`, `a?`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:267](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L267)

Clears the framebuffer. `r`/`g`/`b`/`a` are normalized 0..1, unlike the color-string
`CpuSurface.clear`.

###### Parameters

###### r?

`number` = `0`

Red, 0..1.

###### g?

`number` = `0`

Green, 0..1.

###### b?

`number` = `0`

Blue, 0..1.

###### a?

`number` = `1`

Alpha, 0..1.

###### Returns

`this`

This surface, for chaining.

##### createProgram()

> **createProgram**(`fragmentSource`, `vertexSource?`): [`Program`](@repo.glaze.gpu.shader.Program.md#program)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:121](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L121)

Compiles a fragment shader (over the default fullscreen-triangle vertex shader) into a
program owned by this surface: it is destroyed with the surface and recompiled on context
restore.

###### Parameters

###### fragmentSource

`string`

The fragment shader source.

###### vertexSource?

`string`

The vertex shader source; defaults to a fullscreen triangle.

###### Returns

[`Program`](@repo.glaze.gpu.shader.Program.md#program)

The compiled program.

##### destroy()

> **destroy**(): `void`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:295](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L295)

###### Returns

`void`

##### line()

###### Call Signature

> **line**(`x1`, `y1`, `x2`, `y2`, `stroke?`, `lineWidth?`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:210](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L210)

###### Parameters

###### x1

`number`

###### y1

`number`

###### x2

`number`

###### y2

`number`

###### stroke?

`string`

###### lineWidth?

`number`

###### Returns

`this`

###### Call Signature

> **line**(`a`, `b`, `style?`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:211](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L211)

###### Parameters

###### a

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### b

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### style?

[`DrawStyle`](@repo.glaze.cpu.shapes.types.md#drawstyle)

###### Returns

`this`

##### rect()

###### Call Signature

> **rect**(`x`, `y`, `w`, `h`, `fill?`, `stroke?`, `lineWidth?`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:151](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L151)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### fill?

`string`

###### stroke?

`string`

###### lineWidth?

`number`

###### Returns

`this`

###### Call Signature

> **rect**(`rect`, `style?`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:160](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L160)

###### Parameters

###### rect

[`Rect`](@repo.glaze.cpu.shapes.types.md#rect)

###### style?

[`DrawStyle`](@repo.glaze.cpu.shapes.types.md#drawstyle)

###### Returns

`this`

##### renderProgram()

> **renderProgram**(`program`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:134](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L134)

Flushes pending batched shapes, applies the standard per-frame uniforms, then renders the
program as a fullscreen triangle.

###### Parameters

###### program

[`Program`](@repo.glaze.gpu.shader.Program.md#program)

The program to render.

###### Returns

`this`

This surface, for chaining.

##### screenToWorld()

> **screenToWorld**(`point`): [`Point2D`](@repo.glaze.core.Camera.md#point2d)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:104](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L104)

###### Parameters

###### point

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### Returns

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

##### setDraw()

> **setDraw**(`fn`): `void`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:280](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L280)

Sets the per-frame draw callback. A non-null callback starts the rAF loop; `null` stops it.

###### Parameters

###### fn

[`GpuDraw`](#gpudraw) \| `null`

The frame callback, or `null` to stop rendering.

###### Returns

`void`

##### subscribe()

> **subscribe**(`fn`): () => `void`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:286](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L286)

###### Parameters

###### fn

[`GpuDraw`](#gpudraw)

###### Returns

() => `void`

##### text()

###### Call Signature

> **text**(`text`, `x`, `y`, `fill?`, `fontSize?`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:232](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L232)

###### Parameters

###### text

`string`

###### x

`number`

###### y

`number`

###### fill?

`string`

###### fontSize?

`number`

###### Returns

`this`

###### Call Signature

> **text**(`text`, `x`, `y`, `style`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:233](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L233)

###### Parameters

###### text

`string`

###### x

`number`

###### y

`number`

###### style

[`TextStyle`](@repo.glaze.cpu.shapes.types.md#textstyle)

###### Returns

`this`

###### Call Signature

> **text**(`text`, `position`, `style`): `this`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:234](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L234)

###### Parameters

###### text

`string`

###### position

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### style

[`TextStyle`](@repo.glaze.cpu.shapes.types.md#textstyle)

###### Returns

`this`

##### worldToScreen()

> **worldToScreen**(`point`): [`Point2D`](@repo.glaze.core.Camera.md#point2d)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:108](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L108)

###### Parameters

###### point

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### Returns

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

## Interfaces

### GpuSurfaceConfig

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L15)

#### Properties

##### camera?

> `optional` **camera?**: [`Camera`](@repo.glaze.core.Camera.md#camera)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L17)

##### canvas

> **canvas**: [`HTMLCanvasElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlcanvaselement)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L16)

##### dpr?

> `optional` **dpr?**: `number`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:19](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L19)

Backing-buffer pixel ratio; defaults to `window.devicePixelRatio` (or 1 off-browser).

## Type Aliases

### GpuDraw

> **GpuDraw** = (`surface`) => `void`

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:22](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L22)

#### Parameters

##### surface

[`GpuSurface`](#gpusurface)

#### Returns

`void`

## Functions

### createGpuSurface()

> **createGpuSurface**(`config`): [`GpuSurface`](#gpusurface)

Defined in: [packages/glaze/src/gpu/GpuSurface.ts:409](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/GpuSurface.ts#L409)

#### Parameters

##### config

[`GpuSurfaceConfig`](#gpusurfaceconfig)

#### Returns

[`GpuSurface`](#gpusurface)
