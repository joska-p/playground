---
title: react/useGpuSurface
package: "@repo/glaze"
kind: module
module: react/useGpuSurface
---

## Modules

- [\<internal\>](@repo.glaze.react.useGpuSurface.<internal>.md)

## Interfaces

### GpuSurfaceOptions

Defined in: [packages/glaze/src/react/useGpuSurface.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useGpuSurface.ts#L8)

Surface construction options. `initialCamera` is applied only when no `camera` instance is given.

#### Extended by

- [`GpuCanvasProps`](@repo.glaze.react.GpuCanvas.md#gpucanvasprops)

#### Properties

##### camera?

> `optional` **camera?**: [`Camera`](@repo.glaze.core.Camera.md#camera)

Defined in: [packages/glaze/src/react/useGpuSurface.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useGpuSurface.ts#L9)

##### cameraControls?

> `optional` **cameraControls?**: [`CameraControls`](@repo.glaze.core.CameraControls.md#cameracontrols)

Defined in: [packages/glaze/src/react/useGpuSurface.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useGpuSurface.ts#L10)

##### dpr?

> `optional` **dpr?**: `number`

Defined in: [packages/glaze/src/react/useGpuSurface.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useGpuSurface.ts#L17)

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

## Functions

### useGpuSurface()

> **useGpuSurface**(`options?`): `object`

Defined in: [packages/glaze/src/react/useGpuSurface.ts:28](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useGpuSurface.ts#L28)

Manages a `GpuSurface` for a `<canvas>`, wiring up its camera controls, input router, and
gestures. Attach the returned `canvasRef` to the element; the surface is created on mount and
destroyed when the ref detaches or the component unmounts.

#### Parameters

##### options?

[`GpuSurfaceOptions`](#gpusurfaceoptions) = `{}`

Surface construction options.

#### Returns

`object`

Refs for the canvas node, the surface, its input router, and its gestures.

##### canvasRef

> **canvasRef**: (`canvasElement`) => `void` = `setCanvasRef`

###### Parameters

###### canvasElement

[`HTMLCanvasElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlcanvaselement) \| `null`

###### Returns

`void`

##### gesturesRef

> **gesturesRef**: [`RefObject`](@repo.glaze.react.useGpuSurface.<internal>.md#refobject)\<[`Gesture`](@repo.glaze.core.gestures.md#gesture)\<[`GpuSurface`](@repo.glaze.gpu.GpuSurface.md#gpusurface)\>[]\>

##### inputRouterRef

> **inputRouterRef**: [`RefObject`](@repo.glaze.react.useGpuSurface.<internal>.md#refobject)\<[`InputRouter`](@repo.glaze.core.gestures.md#inputrouter)\<[`GpuSurface`](@repo.glaze.gpu.GpuSurface.md#gpusurface)\> \| `null`\>

##### surfaceRef

> **surfaceRef**: [`RefObject`](@repo.glaze.react.useGpuSurface.<internal>.md#refobject)\<[`GpuSurface`](@repo.glaze.gpu.GpuSurface.md#gpusurface) \| `null`\>
