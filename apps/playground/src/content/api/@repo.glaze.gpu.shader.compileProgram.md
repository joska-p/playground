---
title: gpu/shader/compileProgram
package: "@repo/glaze"
kind: module
module: gpu/shader/compileProgram
---

## Modules

- [\<internal\>](@repo.glaze.gpu.shader.compileProgram.<internal>.md)

## Interfaces

### CompiledShaderProgram

Defined in: [packages/glaze/src/gpu/shader/compileProgram.ts:25](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/compileProgram.ts#L25)

#### Properties

##### program

> **program**: [`WebGLProgram`](@repo.glaze.gpu.shader.Program.<internal>.md#webglprogram)

Defined in: [packages/glaze/src/gpu/shader/compileProgram.ts:26](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/compileProgram.ts#L26)

##### uniforms

> **uniforms**: `Map`\<`string`, [`UniformEntry`](#uniformentry)\>

Defined in: [packages/glaze/src/gpu/shader/compileProgram.ts:27](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/compileProgram.ts#L27)

***

### UniformEntry

Defined in: [packages/glaze/src/gpu/shader/compileProgram.ts:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/compileProgram.ts#L13)

#### Properties

##### location

> **location**: [`WebGLUniformLocation`](@repo.glaze.gpu.shader.compileProgram.<internal>.md#webgluniformlocation)

Defined in: [packages/glaze/src/gpu/shader/compileProgram.ts:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/compileProgram.ts#L14)

##### size

> **size**: `number`

Defined in: [packages/glaze/src/gpu/shader/compileProgram.ts:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/compileProgram.ts#L16)

##### type

> **type**: `number`

Defined in: [packages/glaze/src/gpu/shader/compileProgram.ts:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/compileProgram.ts#L15)

## Type Aliases

### UniformValue

> **UniformValue** = `number` \| `number`[] \| `Float32Array` \| `Int32Array` \| [`WebGLTexture`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#webgltexture)

Defined in: [packages/glaze/src/gpu/shader/compileProgram.ts:23](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/compileProgram.ts#L23)

A uniform value. A `WebGLTexture` binds the texture to the next available texture unit and sets
the sampler to that unit.

## Variables

### FULLSCREEN\_TRIANGLE

> `const` **FULLSCREEN\_TRIANGLE**: `string`

Defined in: [packages/glaze/src/gpu/shader/compileProgram.ts:2](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/compileProgram.ts#L2)

Default vertex shader: three vertices rasterizing the whole viewport, with `vUv` in 0..1.

## Functions

### compileProgram()

> **compileProgram**(`gl`, `fragmentSource`, `vertexSource?`): [`CompiledShaderProgram`](#compiledshaderprogram)

Defined in: [packages/glaze/src/gpu/shader/compileProgram.ts:44](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/compileProgram.ts#L44)

Compiles and links a fragment + vertex shader pair, injecting the `#version 300 es` directive if
absent. Throws with the driver log on any failure; the returned map holds the active uniforms.

#### Parameters

##### gl

[`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext)

The WebGL2 context.

##### fragmentSource

`string`

The fragment shader source; the version directive is optional.

##### vertexSource?

`string` = `FULLSCREEN_TRIANGLE`

The vertex shader source; defaults to `FULLSCREEN_TRIANGLE`.

#### Returns

[`CompiledShaderProgram`](#compiledshaderprogram)

The linked program and its uniform locations.
