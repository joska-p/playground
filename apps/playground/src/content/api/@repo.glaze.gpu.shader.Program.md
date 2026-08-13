---
title: gpu/shader/Program
package: "@repo/glaze"
kind: module
module: gpu/shader/Program
---

## Modules

- [\<internal\>](@repo.glaze.gpu.shader.Program.<internal>.md)

## Classes

### Program

Defined in: [packages/glaze/src/gpu/shader/Program.ts:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/Program.ts#L14)

A compiled fragment program rendered as a fullscreen triangle. Owns its WebGL program, VAO, and
texture-unit allocation; call `destroy()` to release the GPU resources.

#### Constructors

##### Constructor

> **new Program**(`gl`, `fragmentSource`, `vertexSource?`): [`Program`](#program)

Defined in: [packages/glaze/src/gpu/shader/Program.ts:23](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/Program.ts#L23)

###### Parameters

###### gl

[`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext)

###### fragmentSource

`string`

###### vertexSource?

`string` = `FULLSCREEN_TRIANGLE`

###### Returns

[`Program`](#program)

#### Accessors

##### program

###### Get Signature

> **get** **program**(): [`WebGLProgram`](@repo.glaze.gpu.shader.Program.<internal>.md#webglprogram)

Defined in: [packages/glaze/src/gpu/shader/Program.ts:35](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/Program.ts#L35)

###### Returns

[`WebGLProgram`](@repo.glaze.gpu.shader.Program.<internal>.md#webglprogram)

##### uniforms

###### Get Signature

> **get** **uniforms**(): `Map`\<`string`, [`UniformEntry`](@repo.glaze.gpu.shader.compileProgram.md#uniformentry)\>

Defined in: [packages/glaze/src/gpu/shader/Program.ts:39](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/Program.ts#L39)

###### Returns

`Map`\<`string`, [`UniformEntry`](@repo.glaze.gpu.shader.compileProgram.md#uniformentry)\>

#### Methods

##### destroy()

> **destroy**(): `void`

Defined in: [packages/glaze/src/gpu/shader/Program.ts:69](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/Program.ts#L69)

###### Returns

`void`

##### reinitialize()

> **reinitialize**(): `void`

Defined in: [packages/glaze/src/gpu/shader/Program.ts:61](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/Program.ts#L61)

###### Returns

`void`

##### render()

> **render**(): `void`

Defined in: [packages/glaze/src/gpu/shader/Program.ts:53](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/Program.ts#L53)

###### Returns

`void`

##### setUniforms()

> **setUniforms**(`values`): `void`

Defined in: [packages/glaze/src/gpu/shader/Program.ts:48](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/Program.ts#L48)

###### Parameters

###### values

[`Record`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#record)\<`string`, [`UniformValue`](@repo.glaze.gpu.shader.compileProgram.md#uniformvalue)\>

###### Returns

`void`

##### use()

> **use**(): `void`

Defined in: [packages/glaze/src/gpu/shader/Program.ts:43](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/Program.ts#L43)

###### Returns

`void`

## Functions

### createProgram()

> **createProgram**(`gl`, `fragmentSource`, `vertexSource?`): [`Program`](#program)

Defined in: [packages/glaze/src/gpu/shader/Program.ts:78](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/Program.ts#L78)

#### Parameters

##### gl

[`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext)

##### fragmentSource

`string`

##### vertexSource?

`string`

#### Returns

[`Program`](#program)
