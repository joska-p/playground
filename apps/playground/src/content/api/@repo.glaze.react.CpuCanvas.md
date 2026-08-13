---
title: react/CpuCanvas
package: "@repo/glaze"
kind: module
module: react/CpuCanvas
---

## Interfaces

### CpuCanvasProps

Defined in: [packages/glaze/src/react/CpuCanvas.tsx:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/CpuCanvas.tsx#L6)

Surface construction options. `initialCamera` is applied only when no `camera` instance is given.

#### Extends

- [`CpuSurfaceOptions`](@repo.glaze.react.useCpuSurface.md#cpusurfaceoptions)

#### Properties

##### camera?

> `optional` **camera?**: [`Camera`](@repo.glaze.core.Camera.md#camera)

Defined in: [packages/glaze/src/react/useCpuSurface.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useCpuSurface.ts#L9)

###### Inherited from

[`CpuSurfaceOptions`](@repo.glaze.react.useCpuSurface.md#cpusurfaceoptions).[`camera`](@repo.glaze.react.useCpuSurface.md#camera)

##### cameraControls?

> `optional` **cameraControls?**: [`CameraControls`](@repo.glaze.core.CameraControls.md#cameracontrols)

Defined in: [packages/glaze/src/react/useCpuSurface.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useCpuSurface.ts#L10)

###### Inherited from

[`CpuSurfaceOptions`](@repo.glaze.react.useCpuSurface.md#cpusurfaceoptions).[`cameraControls`](@repo.glaze.react.useCpuSurface.md#cameracontrols)

##### canvasInteractions?

> `optional` **canvasInteractions?**: [`CanvasInteractions`](@repo.glaze.react.interactions.md#canvasinteractions)\<[`CpuSurface`](@repo.glaze.cpu.CpuSurface.md#cpusurface)\>

Defined in: [packages/glaze/src/react/CpuCanvas.tsx:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/CpuCanvas.tsx#L9)

##### className?

> `optional` **className?**: `string`

Defined in: [packages/glaze/src/react/CpuCanvas.tsx:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/CpuCanvas.tsx#L10)

##### dpr?

> `optional` **dpr?**: `number`

Defined in: [packages/glaze/src/react/useCpuSurface.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useCpuSurface.ts#L17)

###### Inherited from

[`CpuSurfaceOptions`](@repo.glaze.react.useCpuSurface.md#cpusurfaceoptions).[`dpr`](@repo.glaze.react.useCpuSurface.md#dpr)

##### initialCamera?

> `optional` **initialCamera?**: `object`

Defined in: [packages/glaze/src/react/useCpuSurface.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useCpuSurface.ts#L11)

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

[`CpuSurfaceOptions`](@repo.glaze.react.useCpuSurface.md#cpusurfaceoptions).[`initialCamera`](@repo.glaze.react.useCpuSurface.md#initialcamera)

##### onDraw?

> `optional` **onDraw?**: [`CpuDraw`](@repo.glaze.cpu.CpuSurface.md#cpudraw)

Defined in: [packages/glaze/src/react/CpuCanvas.tsx:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/CpuCanvas.tsx#L7)

##### onSurface?

> `optional` **onSurface?**: (`surface`) => `void`

Defined in: [packages/glaze/src/react/CpuCanvas.tsx:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/CpuCanvas.tsx#L8)

###### Parameters

###### surface

[`CpuSurface`](@repo.glaze.cpu.CpuSurface.md#cpusurface)

###### Returns

`void`

##### style?

> `optional` **style?**: [`CSSProperties`](@repo.glaze.react.GpuCanvas.<internal>.md#cssproperties)

Defined in: [packages/glaze/src/react/CpuCanvas.tsx:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/CpuCanvas.tsx#L11)

## Functions

### CpuCanvas()

> **CpuCanvas**(`__namedParameters`): [`Element`](@repo.glaze.react.GpuCanvas.<internal>.md#element)

Defined in: [packages/glaze/src/react/CpuCanvas.tsx:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/CpuCanvas.tsx#L14)

#### Parameters

##### \_\_namedParameters

[`CpuCanvasProps`](#cpucanvasprops)

#### Returns

[`Element`](@repo.glaze.react.GpuCanvas.<internal>.md#element)
