---
title: react/GpuCanvas
package: "@repo/glaze"
kind: module
module: react/GpuCanvas
---

## Modules

- [\<internal\>](@repo.glaze.react.GpuCanvas.<internal>.md)

## Interfaces

### GpuCanvasProps

Defined in: [packages/glaze/src/react/GpuCanvas.tsx:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/GpuCanvas.tsx#L8)

Surface construction options. `initialCamera` is applied only when no `camera` instance is given.

#### Extends

- [`GpuSurfaceOptions`](@repo.glaze.react.useGpuSurface.md#gpusurfaceoptions)

#### Properties

##### camera?

> `optional` **camera?**: [`Camera`](@repo.glaze.core.Camera.md#camera)

Defined in: [packages/glaze/src/react/useGpuSurface.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useGpuSurface.ts#L9)

###### Inherited from

[`GpuSurfaceOptions`](@repo.glaze.react.useGpuSurface.md#gpusurfaceoptions).[`camera`](@repo.glaze.react.useGpuSurface.md#camera)

##### cameraControls?

> `optional` **cameraControls?**: [`CameraControls`](@repo.glaze.core.CameraControls.md#cameracontrols)

Defined in: [packages/glaze/src/react/useGpuSurface.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useGpuSurface.ts#L10)

###### Inherited from

[`GpuSurfaceOptions`](@repo.glaze.react.useGpuSurface.md#gpusurfaceoptions).[`cameraControls`](@repo.glaze.react.useGpuSurface.md#cameracontrols)

##### canvasInteractions?

> `optional` **canvasInteractions?**: [`CanvasInteractions`](@repo.glaze.react.interactions.md#canvasinteractions)\<[`GpuSurface`](@repo.glaze.gpu.GpuSurface.md#gpusurface)\>

Defined in: [packages/glaze/src/react/GpuCanvas.tsx:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/GpuCanvas.tsx#L15)

##### className?

> `optional` **className?**: `string`

Defined in: [packages/glaze/src/react/GpuCanvas.tsx:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/GpuCanvas.tsx#L16)

##### dpr?

> `optional` **dpr?**: `number`

Defined in: [packages/glaze/src/react/useGpuSurface.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useGpuSurface.ts#L17)

###### Inherited from

[`GpuSurfaceOptions`](@repo.glaze.react.useGpuSurface.md#gpusurfaceoptions).[`dpr`](@repo.glaze.react.useGpuSurface.md#dpr)

##### fragmentShader?

> `optional` **fragmentShader?**: `string`

Defined in: [packages/glaze/src/react/GpuCanvas.tsx:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/GpuCanvas.tsx#L10)

Fragment shader source for a fullscreen program; compiled on mount and recompiled on change.

##### initialCamera?

> `optional` **initialCamera?**: `object`

Defined in: [packages/glaze/src/react/useGpuSurface.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useGpuSurface.ts#L11)

###### maxZoom?

> `optional` **maxZoom?**: `number`

###### minZoom?

> `optional` **minZoom?**: `number`

###### pan?

> `optional` **pan?**: `object`

###### pan.x

> **x**: `number`

###### pan.y

> **y**: `number`

###### zoom?

> `optional` **zoom?**: `number`

###### Inherited from

[`GpuSurfaceOptions`](@repo.glaze.react.useGpuSurface.md#gpusurfaceoptions).[`initialCamera`](@repo.glaze.react.useGpuSurface.md#initialcamera)

##### onDraw?

> `optional` **onDraw?**: [`GpuDraw`](@repo.glaze.gpu.GpuSurface.md#gpudraw)

Defined in: [packages/glaze/src/react/GpuCanvas.tsx:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/GpuCanvas.tsx#L13)

##### onSurface?

> `optional` **onSurface?**: (`surface`) => `void`

Defined in: [packages/glaze/src/react/GpuCanvas.tsx:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/GpuCanvas.tsx#L14)

###### Parameters

###### surface

[`GpuSurface`](@repo.glaze.gpu.GpuSurface.md#gpusurface)

###### Returns

`void`

##### style?

> `optional` **style?**: [`CSSProperties`](@repo.glaze.react.GpuCanvas.<internal>.md#cssproperties)

Defined in: [packages/glaze/src/react/GpuCanvas.tsx:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/GpuCanvas.tsx#L17)

##### uniforms?

> `optional` **uniforms?**: (`surface`) => [`Record`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#record)\<`string`, [`UniformValue`](@repo.glaze.gpu.shader.compileProgram.md#uniformvalue)\>

Defined in: [packages/glaze/src/react/GpuCanvas.tsx:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/GpuCanvas.tsx#L12)

Per-frame uniforms computed from the surface before each draw.

###### Parameters

###### surface

[`GpuSurface`](@repo.glaze.gpu.GpuSurface.md#gpusurface)

###### Returns

[`Record`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#record)\<`string`, [`UniformValue`](@repo.glaze.gpu.shader.compileProgram.md#uniformvalue)\>

## Functions

### GpuCanvas()

> **GpuCanvas**(`__namedParameters`): [`Element`](@repo.glaze.react.GpuCanvas.<internal>.md#element)

Defined in: [packages/glaze/src/react/GpuCanvas.tsx:20](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/GpuCanvas.tsx#L20)

#### Parameters

##### \_\_namedParameters

[`GpuCanvasProps`](#gpucanvasprops)

#### Returns

[`Element`](@repo.glaze.react.GpuCanvas.<internal>.md#element)
