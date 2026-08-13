---
title: core/gestures
package: "@repo/glaze"
kind: module
module: core/gestures
---

## Classes

### InputRouter

Defined in: [packages/glaze/src/core/gestures.ts:119](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L119)

Routes raw `InputStore` events through an ordered list of gestures, wrapping each event's native
signal into an `InteractionEvent`. Every gesture receives every event. Reads `cameraControls`,
`getSurface`, and `gestures` from its options at event time, so those can be swapped without
re-subscribing.

#### Type Parameters

##### TSurface

`TSurface`

#### Constructors

##### Constructor

> **new InputRouter**\<`TSurface`\>(`options`): [`InputRouter`](#inputrouter)\<`TSurface`\>

Defined in: [packages/glaze/src/core/gestures.ts:123](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L123)

###### Parameters

###### options

[`InputRouterOptions`](#inputrouteroptions)\<`TSurface`\>

###### Returns

[`InputRouter`](#inputrouter)\<`TSurface`\>

#### Methods

##### dispose()

> **dispose**(): `void`

Defined in: [packages/glaze/src/core/gestures.ts:135](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L135)

###### Returns

`void`

***

### PanGesture

Defined in: [packages/glaze/src/core/gestures.ts:48](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L48)

Pointer-drag panning. Capture starts on a matching button press and the camera pans with every
pointer move while dragging.

#### Type Parameters

##### TSurface

`TSurface`

#### Constructors

##### Constructor

> **new PanGesture**\<`TSurface`\>(`options?`): [`PanGesture`](#pangesture)\<`TSurface`\>

Defined in: [packages/glaze/src/core/gestures.ts:53](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L53)

###### Parameters

###### options?

[`PanOptions`](#panoptions) = `{}`

###### Returns

[`PanGesture`](#pangesture)\<`TSurface`\>

#### Properties

##### active

> **active**: `boolean` = `false`

Defined in: [packages/glaze/src/core/gestures.ts:50](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L50)

True while a drag is being captured; `onMove` only pans while active.

#### Methods

##### onContextMenu()

> **onContextMenu**(`event`): `void`

Defined in: [packages/glaze/src/core/gestures.ts:74](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L74)

###### Parameters

###### event

[`InteractionEvent`](#interactionevent)\<[`MouseEvent`](@repo.palette-engine.colorSpaces.<internal>.md#mouseevent), `TSurface`\>

###### Returns

`void`

##### onEnd()

> **onEnd**(): `void`

Defined in: [packages/glaze/src/core/gestures.ts:70](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L70)

###### Returns

`void`

##### onMove()

> **onMove**(`event`): `void`

Defined in: [packages/glaze/src/core/gestures.ts:65](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L65)

###### Parameters

###### event

[`InteractionEvent`](#interactionevent)\<[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent), `TSurface`\>

###### Returns

`void`

##### onStart()

> **onStart**(`event`): `void`

Defined in: [packages/glaze/src/core/gestures.ts:57](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L57)

###### Parameters

###### event

[`InteractionEvent`](#interactionevent)\<[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent), `TSurface`\>

###### Returns

`void`

***

### ZoomGesture

Defined in: [packages/glaze/src/core/gestures.ts:84](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L84)

Wheel zooming. Scales around the cursor position; the zoom value is clamped by `cameraControls`.

#### Type Parameters

##### TSurface

`TSurface`

#### Constructors

##### Constructor

> **new ZoomGesture**\<`TSurface`\>(`options?`): [`ZoomGesture`](#zoomgesture)\<`TSurface`\>

Defined in: [packages/glaze/src/core/gestures.ts:87](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L87)

###### Parameters

###### options?

[`ZoomOptions`](#zoomoptions) = `{}`

###### Returns

[`ZoomGesture`](#zoomgesture)\<`TSurface`\>

#### Methods

##### onZoom()

> **onZoom**(`event`): `void`

Defined in: [packages/glaze/src/core/gestures.ts:91](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L91)

###### Parameters

###### event

[`InteractionEvent`](#interactionevent)\<[`WheelEvent`](@repo.palette-engine.colorSpaces.<internal>.md#wheelevent), `TSurface`\>

###### Returns

`void`

## Interfaces

### Gesture

Defined in: [packages/glaze/src/core/gestures.ts:36](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L36)

A pipeline step that interprets `InteractionEvent`s and drives change — camera mutation through
`cameraControls`, or drawing straight on `event.surface`. `PanGesture` / `ZoomGesture` are the
built-in steps; the React facade adapts its consumer `CanvasInteractions` into steps too.

Every gesture receives every event; a gesture either handles it or ignores it. Custom handlers
replace the built-ins rather than chain against them, so there is no consume protocol.

#### Type Parameters

##### TSurface

`TSurface`

#### Properties

##### onContextMenu?

> `optional` **onContextMenu?**: (`event`) => `void`

Defined in: [packages/glaze/src/core/gestures.ts:41](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L41)

###### Parameters

###### event

[`InteractionEvent`](#interactionevent)\<[`MouseEvent`](@repo.palette-engine.colorSpaces.<internal>.md#mouseevent), `TSurface`\>

###### Returns

`void`

##### onEnd?

> `optional` **onEnd?**: (`event`) => `void`

Defined in: [packages/glaze/src/core/gestures.ts:39](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L39)

###### Parameters

###### event

[`InteractionEvent`](#interactionevent)\<[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent), `TSurface`\>

###### Returns

`void`

##### onMove?

> `optional` **onMove?**: (`event`) => `void`

Defined in: [packages/glaze/src/core/gestures.ts:38](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L38)

###### Parameters

###### event

[`InteractionEvent`](#interactionevent)\<[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent), `TSurface`\>

###### Returns

`void`

##### onStart?

> `optional` **onStart?**: (`event`) => `void`

Defined in: [packages/glaze/src/core/gestures.ts:37](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L37)

###### Parameters

###### event

[`InteractionEvent`](#interactionevent)\<[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent), `TSurface`\>

###### Returns

`void`

##### onZoom?

> `optional` **onZoom?**: (`event`) => `void`

Defined in: [packages/glaze/src/core/gestures.ts:40](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L40)

###### Parameters

###### event

[`InteractionEvent`](#interactionevent)\<[`WheelEvent`](@repo.palette-engine.colorSpaces.<internal>.md#wheelevent), `TSurface`\>

###### Returns

`void`

***

### InputRouterOptions

Defined in: [packages/glaze/src/core/gestures.ts:101](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L101)

#### Type Parameters

##### TSurface

`TSurface`

#### Properties

##### cameraControls

> **cameraControls**: [`CameraControls`](@repo.glaze.core.CameraControls.md#cameracontrols)

Defined in: [packages/glaze/src/core/gestures.ts:103](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L103)

##### gestures

> **gestures**: [`Gesture`](#gesture)\<`TSurface`\>[]

Defined in: [packages/glaze/src/core/gestures.ts:105](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L105)

##### input

> **input**: [`InputStore`](@repo.glaze.core.InputStore.md#inputstore)

Defined in: [packages/glaze/src/core/gestures.ts:102](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L102)

#### Methods

##### getSurface()

> **getSurface**(): `TSurface` \| `null`

Defined in: [packages/glaze/src/core/gestures.ts:104](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L104)

###### Returns

`TSurface` \| `null`

***

### InteractionEvent

Defined in: [packages/glaze/src/core/gestures.ts:20](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L20)

The unified context every gesture receives: the raw native event, its screen-space point, the
live input store, the camera controls, and the targeted surface (when one is mounted). Built-in
pan/zoom gestures and the React facade's consumer handlers all read the same block.

#### Type Parameters

##### TEvent

`TEvent`

##### TSurface

`TSurface`

#### Properties

##### cameraControls

> **cameraControls**: [`CameraControls`](@repo.glaze.core.CameraControls.md#cameracontrols)

Defined in: [packages/glaze/src/core/gestures.ts:24](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L24)

##### input

> **input**: [`InputStore`](@repo.glaze.core.InputStore.md#inputstore)

Defined in: [packages/glaze/src/core/gestures.ts:23](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L23)

##### nativeEvent

> **nativeEvent**: `TEvent`

Defined in: [packages/glaze/src/core/gestures.ts:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L21)

##### point

> **point**: [`Point2D`](@repo.glaze.core.Camera.md#point2d)

Defined in: [packages/glaze/src/core/gestures.ts:22](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L22)

##### surface

> **surface**: `TSurface` \| `null`

Defined in: [packages/glaze/src/core/gestures.ts:25](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L25)

***

### PanOptions

Defined in: [packages/glaze/src/core/gestures.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L7)

#### Properties

##### button?

> `optional` **button?**: `number` \| `number`[]

Defined in: [packages/glaze/src/core/gestures.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L8)

***

### ZoomOptions

Defined in: [packages/glaze/src/core/gestures.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L11)

#### Properties

##### speed?

> `optional` **speed?**: `number`

Defined in: [packages/glaze/src/core/gestures.ts:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L12)

## Variables

### DEFAULT\_WHEEL\_SPEED

> `const` **DEFAULT\_WHEEL\_SPEED**: `0.002` = `0.002`

Defined in: [packages/glaze/src/core/gestures.ts:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L5)

## Functions

### createInputRouter()

> **createInputRouter**\<`TSurface`\>(`options`): [`InputRouter`](#inputrouter)\<`TSurface`\>

Defined in: [packages/glaze/src/core/gestures.ts:183](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L183)

#### Type Parameters

##### TSurface

`TSurface`

#### Parameters

##### options

[`InputRouterOptions`](#inputrouteroptions)\<`TSurface`\>

#### Returns

[`InputRouter`](#inputrouter)\<`TSurface`\>

***

### createPanGesture()

> **createPanGesture**\<`TSurface`\>(`options?`): [`PanGesture`](#pangesture)\<`TSurface`\>

Defined in: [packages/glaze/src/core/gestures.ts:79](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L79)

#### Type Parameters

##### TSurface

`TSurface`

#### Parameters

##### options?

[`PanOptions`](#panoptions) = `{}`

#### Returns

[`PanGesture`](#pangesture)\<`TSurface`\>

***

### createZoomGesture()

> **createZoomGesture**\<`TSurface`\>(`options?`): [`ZoomGesture`](#zoomgesture)\<`TSurface`\>

Defined in: [packages/glaze/src/core/gestures.ts:97](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/gestures.ts#L97)

#### Type Parameters

##### TSurface

`TSurface`

#### Parameters

##### options?

[`ZoomOptions`](#zoomoptions) = `{}`

#### Returns

[`ZoomGesture`](#zoomgesture)\<`TSurface`\>
