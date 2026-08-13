---
title: core/InputStore
package: "@repo/glaze"
kind: module
module: core/InputStore
---

## Modules

- [\<internal\>](@repo.glaze.core.InputStore.<internal>.md)

## Classes

### InputStore

Defined in: [packages/glaze/src/core/InputStore.ts:29](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L29)

Raw pointer, wheel, and keyboard signal bus attached to a canvas. Pointer positions are
canvas-relative CSS pixels; transient state (`wasKeyPressed`, `wheelDelta`) is cleared by
`endFrame()`.

#### Constructors

##### Constructor

> **new InputStore**(): [`InputStore`](#inputstore)

###### Returns

[`InputStore`](#inputstore)

#### Properties

##### pointer

> `readonly` **pointer**: [`Point2D`](@repo.glaze.core.Camera.md#point2d)

Defined in: [packages/glaze/src/core/InputStore.ts:30](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L30)

##### pointerDelta

> `readonly` **pointerDelta**: [`Point2D`](@repo.glaze.core.Camera.md#point2d)

Defined in: [packages/glaze/src/core/InputStore.ts:31](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L31)

##### wheelDelta

> **wheelDelta**: `number` = `0`

Defined in: [packages/glaze/src/core/InputStore.ts:33](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L33)

##### wheelPosition

> `readonly` **wheelPosition**: [`Point2D`](@repo.glaze.core.Camera.md#point2d)

Defined in: [packages/glaze/src/core/InputStore.ts:32](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L32)

#### Accessors

##### mouseButtons

###### Get Signature

> **get** **mouseButtons**(): `number`

Defined in: [packages/glaze/src/core/InputStore.ts:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L46)

###### Returns

`number`

##### mouseDown

###### Get Signature

> **get** **mouseDown**(): `boolean`

Defined in: [packages/glaze/src/core/InputStore.ts:42](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L42)

###### Returns

`boolean`

#### Methods

##### attach()

> **attach**(`target`): `void`

Defined in: [packages/glaze/src/core/InputStore.ts:74](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L74)

###### Parameters

###### target

[`HTMLElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlelement)

###### Returns

`void`

##### destroy()

> **destroy**(): `void`

Defined in: [packages/glaze/src/core/InputStore.ts:91](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L91)

###### Returns

`void`

##### detach()

> **detach**(): `void`

Defined in: [packages/glaze/src/core/InputStore.ts:87](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L87)

###### Returns

`void`

##### endFrame()

> **endFrame**(): `void`

Defined in: [packages/glaze/src/core/InputStore.ts:69](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L69)

Clears per-frame state: the `wasKeyPressed` set and the accumulated `wheelDelta`. Call once
per frame.

###### Returns

`void`

##### isKeyDown()

> **isKeyDown**(`code`): `boolean`

Defined in: [packages/glaze/src/core/InputStore.ts:50](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L50)

###### Parameters

###### code

`string`

###### Returns

`boolean`

##### subscribe()

> **subscribe**(`handlers`): () => `void`

Defined in: [packages/glaze/src/core/InputStore.ts:58](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L58)

###### Parameters

###### handlers

[`InputHandlers`](#inputhandlers)

###### Returns

() => `void`

##### wasKeyPressed()

> **wasKeyPressed**(`code`): `boolean`

Defined in: [packages/glaze/src/core/InputStore.ts:54](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L54)

###### Parameters

###### code

`string`

###### Returns

`boolean`

## Interfaces

### InputHandlers

Defined in: [packages/glaze/src/core/InputStore.ts:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L15)

Subscriber callbacks for raw input. `point` is canvas-relative in CSS pixels.

#### Properties

##### onContextMenu?

> `optional` **onContextMenu?**: (`event`) => `void`

Defined in: [packages/glaze/src/core/InputStore.ts:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L21)

###### Parameters

###### event

[`MouseEvent`](@repo.palette-engine.colorSpaces.<internal>.md#mouseevent)

###### Returns

`void`

##### onPointerCancel?

> `optional` **onPointerCancel?**: (`event`, `point`) => `void`

Defined in: [packages/glaze/src/core/InputStore.ts:19](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L19)

###### Parameters

###### event

[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent)

###### point

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### Returns

`void`

##### onPointerDown?

> `optional` **onPointerDown?**: (`event`, `point`) => `void`

Defined in: [packages/glaze/src/core/InputStore.ts:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L16)

###### Parameters

###### event

[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent)

###### point

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### Returns

`void`

##### onPointerMove?

> `optional` **onPointerMove?**: (`event`, `point`) => `void`

Defined in: [packages/glaze/src/core/InputStore.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L17)

###### Parameters

###### event

[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent)

###### point

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### Returns

`void`

##### onPointerUp?

> `optional` **onPointerUp?**: (`event`, `point`) => `void`

Defined in: [packages/glaze/src/core/InputStore.ts:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L18)

###### Parameters

###### event

[`PointerEvent`](@repo.palette-engine.colorSpaces.<internal>.md#pointerevent)

###### point

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### Returns

`void`

##### onWheel?

> `optional` **onWheel?**: (`event`, `point`) => `void`

Defined in: [packages/glaze/src/core/InputStore.ts:20](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L20)

###### Parameters

###### event

[`WheelEvent`](@repo.palette-engine.colorSpaces.<internal>.md#wheelevent)

###### point

[`Point2D`](@repo.glaze.core.Camera.md#point2d)

###### Returns

`void`

## Functions

### createInputStore()

> **createInputStore**(): [`InputStore`](#inputstore)

Defined in: [packages/glaze/src/core/InputStore.ts:183](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/InputStore.ts#L183)

#### Returns

[`InputStore`](#inputstore)
