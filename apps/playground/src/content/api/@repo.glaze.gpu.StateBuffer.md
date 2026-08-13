---
title: gpu/StateBuffer
package: "@repo/glaze"
kind: module
module: gpu/StateBuffer
---

## Modules

- [\<internal\>](@repo.glaze.gpu.StateBuffer.<internal>.md)

## Classes

### StateBuffer

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:207](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L207)

A GPU state buffer: a ping-pong texture pair holding evolving state, plus the fullscreen-triangle
programs that step it. Each `step()` renders the active program into the write target while
sampling the previous state via the `u_state` sampler (bound to texture unit 0), then swaps the
pair.

The typical flow is `init(data)` → `useProgram(name)` → `setUniforms(values)` → `step()`, reading
the live state back with `getTexture()`.

#### Constructors

##### Constructor

> **new StateBuffer**(`gl`, `width`, `height`): [`StateBuffer`](#statebuffer)

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:213](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L213)

###### Parameters

###### gl

[`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext)

###### width

`number`

###### height

`number`

###### Returns

[`StateBuffer`](#statebuffer)

#### Accessors

##### height

###### Get Signature

> **get** **height**(): `number`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:226](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L226)

###### Returns

`number`

##### targets

###### Get Signature

> **get** **targets**(): [`StateBufferTargets`](#statebuffertargets-1)

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:218](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L218)

###### Returns

[`StateBufferTargets`](#statebuffertargets-1)

##### width

###### Get Signature

> **get** **width**(): `number`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:222](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L222)

###### Returns

`number`

#### Methods

##### addProgram()

> **addProgram**(`name`, `fragmentSource`): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:230](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L230)

###### Parameters

###### name

`string`

###### fragmentSource

`string`

###### Returns

`void`

##### destroy()

> **destroy**(): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:274](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L274)

###### Returns

`void`

##### getTexture()

> **getTexture**(): [`WebGLTexture`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#webgltexture)

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:266](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L266)

###### Returns

[`WebGLTexture`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#webgltexture)

##### init()

> **init**(`data`): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:262](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L262)

###### Parameters

###### data

`Uint8Array`

###### Returns

`void`

##### resize()

> **resize**(`width`, `height`): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:270](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L270)

###### Parameters

###### width

`number`

###### height

`number`

###### Returns

`void`

##### setUniforms()

> **setUniforms**(`values`): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:242](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L242)

###### Parameters

###### values

[`Record`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#record)\<`string`, [`UniformValue`](@repo.glaze.gpu.shader.compileProgram.md#uniformvalue)\>

###### Returns

`void`

##### step()

> **step**(): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:246](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L246)

###### Returns

`void`

##### useProgram()

> **useProgram**(`name`): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:236](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L236)

###### Parameters

###### name

`string`

###### Returns

`void`

***

### StateBufferTargets

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L10)

Ping-pong render targets: two RGBA8 textures each attached to their own framebuffer. `step()`
renders into the write target while sampling the read target, then swaps them so the result
becomes the input of the next step.

#### Constructors

##### Constructor

> **new StateBufferTargets**(`gl`, `initialWidth`, `initialHeight`): [`StateBufferTargets`](#statebuffertargets-1)

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L18)

###### Parameters

###### gl

[`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext)

###### initialWidth

`number`

###### initialHeight

`number`

###### Returns

[`StateBufferTargets`](#statebuffertargets-1)

#### Accessors

##### height

###### Get Signature

> **get** **height**(): `number`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:29](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L29)

###### Returns

`number`

##### width

###### Get Signature

> **get** **width**(): `number`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:25](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L25)

###### Returns

`number`

#### Methods

##### bindWrite()

> **bindWrite**(): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:33](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L33)

###### Returns

`void`

##### destroy()

> **destroy**(): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:109](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L109)

###### Returns

`void`

##### getReadTexture()

> **getReadTexture**(): [`WebGLTexture`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#webgltexture)

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L46)

###### Returns

[`WebGLTexture`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#webgltexture)

##### getWriteTexture()

> **getWriteTexture**(): [`WebGLTexture`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#webgltexture)

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:54](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L54)

###### Returns

[`WebGLTexture`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#webgltexture)

##### init()

> **init**(`data`): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:66](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L66)

###### Parameters

###### data

`Uint8Array`

###### Returns

`void`

##### resize()

> **resize**(`width`, `height`): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:100](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L100)

###### Parameters

###### width

`number`

###### height

`number`

###### Returns

`void`

##### swap()

> **swap**(): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:62](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L62)

###### Returns

`void`

##### unbind()

> **unbind**(): `void`

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:42](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L42)

###### Returns

`void`

## Functions

### createStateBuffer()

> **createStateBuffer**(`gl`, `width`, `height`): [`StateBuffer`](#statebuffer)

Defined in: [packages/glaze/src/gpu/StateBuffer.ts:292](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/StateBuffer.ts#L292)

#### Parameters

##### gl

[`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext)

##### width

`number`

##### height

`number`

#### Returns

[`StateBuffer`](#statebuffer)
