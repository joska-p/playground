---
title: gpu/shader/setUniforms
package: "@repo/glaze"
kind: module
module: gpu/shader/setUniforms
---

## Functions

### createStandardUniformValues()

> **createStandardUniformValues**(`width`, `height`, `dpr`, `mouse?`, `camera?`, `time?`): [`Record`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#record)\<`string`, [`UniformValue`](@repo.glaze.gpu.shader.compileProgram.md#uniformvalue)\>

Defined in: [packages/glaze/src/gpu/shader/setUniforms.ts:107](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/setUniforms.ts#L107)

The standard per-frame uniforms shared by every program: `u_resolution` (device px), `u_aspect`,
`u_mouse` (normalized 0..1, y-flipped), `u_camera` (CSS-px offset + zoom), `u_dpr`, and `u_time`
(seconds). Omitted inputs fall back to neutral defaults.

#### Parameters

##### width

`number`

Viewport width in CSS px.

##### height

`number`

Viewport height in CSS px.

##### dpr

`number`

The device pixel ratio.

##### mouse?

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

Pointer position in CSS px; defaults to top-left.

##### camera?

[`Camera`](@repo.glaze.core.Camera.md#camera)

The view transform; defaults to identity.

##### time?

`number`

Seconds since the loop started; defaults to 0.

#### Returns

[`Record`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#record)\<`string`, [`UniformValue`](@repo.glaze.gpu.shader.compileProgram.md#uniformvalue)\>

A uniform map ready for `setUniforms`.

***

### setUniforms()

> **setUniforms**(`gl`, `uniforms`, `values`, `nextTextureUnit?`): `void`

Defined in: [packages/glaze/src/gpu/shader/setUniforms.ts:81](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/gpu/shader/setUniforms.ts#L81)

Uploads uniforms to the bound program. Names with no matching active uniform are silently
ignored, so one map can feed programs with different uniform sets. `WebGLTexture` values bind the
texture to the next unit supplied by `nextTextureUnit` and set the sampler to it.

#### Parameters

##### gl

[`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext)

The WebGL2 context.

##### uniforms

`Map`\<`string`, [`UniformEntry`](@repo.glaze.gpu.shader.compileProgram.md#uniformentry)\>

The program's active uniform locations.

##### values

[`Record`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#record)\<`string`, [`UniformValue`](@repo.glaze.gpu.shader.compileProgram.md#uniformvalue)\>

The values to upload, keyed by uniform name.

##### nextTextureUnit?

() => `number`

Supplies texture units for `WebGLTexture` values, in binding order.

#### Returns

`void`
