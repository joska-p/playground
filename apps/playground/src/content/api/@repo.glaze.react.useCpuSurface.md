---
title: react/useCpuSurface
package: "@repo/glaze"
kind: module
module: react/useCpuSurface
---

## Interfaces

### CpuSurfaceOptions

Defined in: [packages/glaze/src/react/useCpuSurface.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useCpuSurface.ts#L8)

Surface construction options. `initialCamera` is applied only when no `camera` instance is given.

#### Extended by

- [`CpuCanvasProps`](@repo.glaze.react.CpuCanvas.md#cpucanvasprops)

#### Properties

##### camera?

> `optional` **camera?**: [`Camera`](@repo.glaze.core.Camera.md#camera)

Defined in: [packages/glaze/src/react/useCpuSurface.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useCpuSurface.ts#L9)

##### cameraControls?

> `optional` **cameraControls?**: [`CameraControls`](@repo.glaze.core.CameraControls.md#cameracontrols)

Defined in: [packages/glaze/src/react/useCpuSurface.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useCpuSurface.ts#L10)

##### dpr?

> `optional` **dpr?**: `number`

Defined in: [packages/glaze/src/react/useCpuSurface.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useCpuSurface.ts#L17)

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

## Functions

### useCpuSurface()

> **useCpuSurface**(`options?`): `object`

Defined in: [packages/glaze/src/react/useCpuSurface.ts:28](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/useCpuSurface.ts#L28)

Manages a `CpuSurface` for a `<canvas>`, wiring up its camera controls, input router, and
gestures. Attach the returned `canvasRef` to the element; the surface is created on mount and
destroyed when the ref detaches or the component unmounts.

#### Parameters

##### options?

[`CpuSurfaceOptions`](#cpusurfaceoptions) = `{}`

Surface construction options.

#### Returns

`object`

Refs for the canvas node, the surface, its input router, and its gestures.

##### canvasRef

> **canvasRef**: (`node`) => `void` = `setCanvasRef`

###### Parameters

###### node

[`HTMLCanvasElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlcanvaselement) \| `null`

###### Returns

`void`

##### gesturesRef

> **gesturesRef**: [`RefObject`](@repo.glaze.react.useGpuSurface.<internal>.md#refobject)\<[`Gesture`](@repo.glaze.core.gestures.md#gesture)\<[`CpuSurface`](@repo.glaze.cpu.CpuSurface.md#cpusurface)\>[]\>

##### inputRouterRef

> **inputRouterRef**: [`RefObject`](@repo.glaze.react.useGpuSurface.<internal>.md#refobject)\<[`InputRouter`](@repo.glaze.core.gestures.md#inputrouter)\<[`CpuSurface`](@repo.glaze.cpu.CpuSurface.md#cpusurface)\> \| `null`\>

##### surfaceRef

> **surfaceRef**: [`RefObject`](@repo.glaze.react.useGpuSurface.<internal>.md#refobject)\<[`CpuSurface`](@repo.glaze.cpu.CpuSurface.md#cpusurface) \| `null`\>
