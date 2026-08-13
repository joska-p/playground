---
title: gpu/shapes/TextRasterizer
package: "@repo/glaze"
kind: module
module: gpu/shapes/TextRasterizer
---

## Modules

- [\<internal\>](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md)

## Classes

### TextRasterizer

Defined in: [packages/glaze/src/gpu/shapes/TextRasterizer.ts:55](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shapes/TextRasterizer.ts#L55)

Rasterizes text on an offscreen 2D canvas and uploads it as a texture, cached by (text, font) in
an LRU of 128 entries. Rasterization runs at 2× the requested size so edges stay crisp when
scaled.

#### Constructors

##### Constructor

> **new TextRasterizer**(`gl`): [`TextRasterizer`](#textrasterizer)

Defined in: [packages/glaze/src/gpu/shapes/TextRasterizer.ts:61](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shapes/TextRasterizer.ts#L61)

###### Parameters

###### gl

[`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext)

###### Returns

[`TextRasterizer`](#textrasterizer)

#### Methods

##### clear()

> **clear**(): `void`

Defined in: [packages/glaze/src/gpu/shapes/TextRasterizer.ts:130](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shapes/TextRasterizer.ts#L130)

###### Returns

`void`

##### destroy()

> **destroy**(): `void`

Defined in: [packages/glaze/src/gpu/shapes/TextRasterizer.ts:135](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shapes/TextRasterizer.ts#L135)

###### Returns

`void`

##### get()

> **get**(`text`, `font`, `size`): [`TextRaster`](#textraster)

Defined in: [packages/glaze/src/gpu/shapes/TextRasterizer.ts:70](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shapes/TextRasterizer.ts#L70)

###### Parameters

###### text

`string`

###### font

`string`

###### size

`number`

###### Returns

[`TextRaster`](#textraster)

## Interfaces

### TextRaster

Defined in: [packages/glaze/src/gpu/shapes/TextRasterizer.ts:44](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shapes/TextRasterizer.ts#L44)

#### Properties

##### height

> **height**: `number`

Defined in: [packages/glaze/src/gpu/shapes/TextRasterizer.ts:47](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shapes/TextRasterizer.ts#L47)

##### texture

> **texture**: [`WebGLTexture`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#webgltexture)

Defined in: [packages/glaze/src/gpu/shapes/TextRasterizer.ts:45](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shapes/TextRasterizer.ts#L45)

##### width

> **width**: `number`

Defined in: [packages/glaze/src/gpu/shapes/TextRasterizer.ts:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shapes/TextRasterizer.ts#L46)

## Functions

### textUniforms()

> **textUniforms**(`position`, `width`, `height`, `size`, `texture`, `style`): [`Record`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#record)\<`string`, [`UniformValue`](@repo.glaze.gpu.shader.compileProgram.md#uniformvalue)\>

Defined in: [packages/glaze/src/gpu/shapes/TextRasterizer.ts:140](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shapes/TextRasterizer.ts#L140)

#### Parameters

##### position

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

##### width

`number`

##### height

`number`

##### size

`number`

##### texture

[`WebGLTexture`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#webgltexture)

##### style

[`TextStyle`](@repo.glaze.cpu.shapes.types.md#textstyle)

#### Returns

[`Record`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#record)\<`string`, [`UniformValue`](@repo.glaze.gpu.shader.compileProgram.md#uniformvalue)\>
