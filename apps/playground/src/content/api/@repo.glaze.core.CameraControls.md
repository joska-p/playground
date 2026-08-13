---
title: core/CameraControls
package: "@repo/glaze"
kind: module
module: core/CameraControls
---

## Modules

- [\<internal\>](@repo.glaze.core.CameraControls.<internal>.md)

## Interfaces

### CameraControls

Defined in: [packages/glaze/src/core/CameraControls.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/CameraControls.ts#L8)

Explicit camera mutation contract. `Camera` stays passive; everything that changes its
`x`/`y`/`zoom` goes through here, so bounds and focal-point math are enforced in exactly one
place.

#### Methods

##### panBy()

> **panBy**(`dx`, `dy`): `void`

Defined in: [packages/glaze/src/core/CameraControls.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/CameraControls.ts#L10)

###### Parameters

###### dx

`number`

###### dy

`number`

###### Returns

`void`

##### panTo()

> **panTo**(`position`): `void`

Defined in: [packages/glaze/src/core/CameraControls.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/CameraControls.ts#L9)

###### Parameters

###### position

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### Returns

`void`

##### reset()

> **reset**(): `void`

Defined in: [packages/glaze/src/core/CameraControls.ts:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/CameraControls.ts#L14)

###### Returns

`void`

##### update()

> **update**(`partial`): `void`

Defined in: [packages/glaze/src/core/CameraControls.ts:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/CameraControls.ts#L15)

###### Parameters

###### partial

[`Partial`](@repo.glaze.core.CameraControls.<internal>.md#partial)\<[`Camera`](@repo.glaze.core.Camera.md#camera)\>

###### Returns

`void`

##### zoomAt()

> **zoomAt**(`focalPoint`, `zoom`): `void`

Defined in: [packages/glaze/src/core/CameraControls.ts:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/CameraControls.ts#L12)

###### Parameters

###### focalPoint

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### zoom

`number`

###### Returns

`void`

##### zoomBy()

> **zoomBy**(`factor`, `focalPoint`): `void`

Defined in: [packages/glaze/src/core/CameraControls.ts:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/CameraControls.ts#L13)

###### Parameters

###### factor

`number`

###### focalPoint

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### Returns

`void`

##### zoomTo()

> **zoomTo**(`zoom`, `focalPoint?`): `void`

Defined in: [packages/glaze/src/core/CameraControls.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/CameraControls.ts#L11)

###### Parameters

###### zoom

`number`

###### focalPoint?

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### Returns

`void`

## Functions

### createCameraControls()

> **createCameraControls**(`camera`, `minZoom?`, `maxZoom?`, `initial?`): [`CameraControls`](#cameracontrols)

Defined in: [packages/glaze/src/core/CameraControls.ts:29](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/CameraControls.ts#L29)

Binds camera mutation to `camera` in place, clamping zoom to `[minZoom, maxZoom]` (both default
from `DEFAULT_ZOOM_BOUNDS`). `initial` is the state `reset()` restores; it defaults to a fresh
identity camera.

#### Parameters

##### camera

[`Camera`](@repo.glaze.core.Camera.md#camera)

The camera to mutate.

##### minZoom?

`number` = `DEFAULT_ZOOM_BOUNDS.minZoom`

Defaults to `DEFAULT_ZOOM_BOUNDS.minZoom`.

##### maxZoom?

`number` = `DEFAULT_ZOOM_BOUNDS.maxZoom`

Defaults to `DEFAULT_ZOOM_BOUNDS.maxZoom`.

##### initial?

[`Camera`](@repo.glaze.core.Camera.md#camera) = `...`

The state `reset()` restores; defaults to an identity camera.

#### Returns

[`CameraControls`](#cameracontrols)

The controls bound to `camera`.
