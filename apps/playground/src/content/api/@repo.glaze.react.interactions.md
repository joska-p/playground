---
title: react/interactions
package: "@repo/glaze"
kind: module
module: react/interactions
---

## Modules

- [\<internal\>](@repo.glaze.react.interactions.<internal>.md)

## Interfaces

### CanvasInteractions

Defined in: [packages/glaze/src/react/interactions.ts:31](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L31)

The consumer-facing interaction config. Physical events map onto readable action cycles:
`pointerdown` -> `onStart`, `pointermove` -> `onMove`, `pointerup` / `pointercancel` -> `onEnd`,
`wheel` -> `onZoom`.

Handlers replace the built-in gestures: providing `onStart` or `onMove` turns the default pan off
(you own the drag cycle — drive the camera with `event.cameraControls` if you want it to pan),
and providing `onZoom` turns the default zoom off. `onEnd` and `onContextMenu` are delivered in
addition to the built-ins, so captured state (like an active drag) is always released. `pan` /
`zoom` configure the built-in gestures; `false` turns one off, an options object configures it,
and omitting it keeps the default behavior.

Handlers only fire while a surface is mounted, so they receive a `LiveInteractionEvent` whose
`surface` is always present.

#### Type Parameters

##### TSurface

`TSurface`

#### Properties

##### onContextMenu?

> `optional` **onContextMenu?**: (`event`) => `void`

Defined in: [packages/glaze/src/react/interactions.ts:38](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L38)

###### Parameters

###### event

[`LiveInteractionEvent`](#liveinteractionevent)\<[`MouseEvent`](@repo.palette-engine.colorSpaces.<internal>.md#mouseevent), `TSurface`\>

###### Returns

`void`

##### onEnd?

> `optional` **onEnd?**: (`event`) => `void`

Defined in: [packages/glaze/src/react/interactions.ts:36](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L36)

###### Parameters

###### event

[`LiveInteractionEvent`](#liveinteractionevent)\<[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent), `TSurface`\>

###### Returns

`void`

##### onMove?

> `optional` **onMove?**: (`event`) => `void`

Defined in: [packages/glaze/src/react/interactions.ts:35](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L35)

###### Parameters

###### event

[`LiveInteractionEvent`](#liveinteractionevent)\<[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent), `TSurface`\>

###### Returns

`void`

##### onStart?

> `optional` **onStart?**: (`event`) => `void`

Defined in: [packages/glaze/src/react/interactions.ts:34](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L34)

###### Parameters

###### event

[`LiveInteractionEvent`](#liveinteractionevent)\<[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent), `TSurface`\>

###### Returns

`void`

##### onZoom?

> `optional` **onZoom?**: (`event`) => `void`

Defined in: [packages/glaze/src/react/interactions.ts:37](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L37)

###### Parameters

###### event

[`LiveInteractionEvent`](#liveinteractionevent)\<[`WheelEvent`](@repo.palette-engine.colorSpaces.<internal>.md#wheelevent), `TSurface`\>

###### Returns

`void`

##### pan?

> `optional` **pan?**: `boolean` \| [`PanOptions`](@repo.glaze.core.gestures.md#panoptions)

Defined in: [packages/glaze/src/react/interactions.ts:32](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L32)

##### zoom?

> `optional` **zoom?**: `boolean` \| [`ZoomOptions`](@repo.glaze.core.gestures.md#zoomoptions)

Defined in: [packages/glaze/src/react/interactions.ts:33](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L33)

***

### LiveInteractionEvent

Defined in: [packages/glaze/src/react/interactions.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L9)

An interaction event for a mounted surface. The pipeline only routes events while a surface is
mounted, so consumer handlers receive this — `surface` is always present and needs no defensive
check.

#### Extends

- [`Omit`](@repo.glaze.react.interactions.<internal>.md#omit)\<[`InteractionEvent`](@repo.glaze.core.gestures.md#interactionevent)\<`TEvent`, `TSurface`\>, `"surface"`\>

#### Type Parameters

##### TEvent

`TEvent`

##### TSurface

`TSurface`

#### Properties

##### cameraControls

> **cameraControls**: [`CameraControls`](@repo.glaze.core.CameraControls.md#cameracontrols)

Defined in: [packages/glaze/src/core/gestures.ts:24](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L24)

###### Inherited from

`Omit.cameraControls`

##### input

> **input**: [`InputStore`](@repo.glaze.core.InputStore.md#inputstore)

Defined in: [packages/glaze/src/core/gestures.ts:23](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L23)

###### Inherited from

`Omit.input`

##### nativeEvent

> **nativeEvent**: `TEvent`

Defined in: [packages/glaze/src/core/gestures.ts:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L21)

###### Inherited from

`Omit.nativeEvent`

##### point

> **point**: [`Point2D`](@repo.glaze.core.Camera.md#point2d)

Defined in: [packages/glaze/src/core/gestures.ts:22](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L22)

###### Inherited from

`Omit.point`

##### surface

> **surface**: `TSurface`

Defined in: [packages/glaze/src/react/interactions.ts:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L13)

## Functions

### createInteractionAdapter()

> **createInteractionAdapter**\<`TSurface`\>(`interactions?`): [`Gesture`](@repo.glaze.core.gestures.md#gesture)\<`TSurface`\>[]

Defined in: [packages/glaze/src/react/interactions.ts:56](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/react/interactions.ts#L56)

Adapts the consumer `CanvasInteractions` config into the pipeline. Custom lifecycle handlers are
wrapped to receive a live surface and replace the matching built-in gesture: `onStart` / `onMove`
suppress pan, `onZoom` suppresses zoom. `onEnd` / `onContextMenu` run alongside the built-ins.

#### Type Parameters

##### TSurface

`TSurface`

#### Parameters

##### interactions?

[`CanvasInteractions`](#canvasinteractions)\<`TSurface`\> = `{}`

Consumer config; defaults to built-in pan + zoom.

#### Returns

[`Gesture`](@repo.glaze.core.gestures.md#gesture)\<`TSurface`\>[]

The pipeline gestures.
