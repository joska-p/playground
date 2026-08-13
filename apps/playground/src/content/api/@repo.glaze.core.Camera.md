---
title: core/Camera
package: "@repo/glaze"
kind: module
module: core/Camera
---

## Classes

### Camera

Defined in: [packages/glaze/src/core/Camera.ts:22](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L22)

Passive spatial state: a pure coordinate grid plus its two conversion functions. It never mutates
itself — panning and zooming are gestures and live in `CameraControls`.

#### Constructors

##### Constructor

> **new Camera**(`x?`, `y?`, `zoom?`): [`Camera`](#camera)

Defined in: [packages/glaze/src/core/Camera.ts:27](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L27)

###### Parameters

###### x?

`number` = `0`

###### y?

`number` = `0`

###### zoom?

`number` = `1`

###### Returns

[`Camera`](#camera)

#### Properties

##### x

> **x**: `number`

Defined in: [packages/glaze/src/core/Camera.ts:23](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L23)

##### y

> **y**: `number`

Defined in: [packages/glaze/src/core/Camera.ts:24](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L24)

##### zoom

> **zoom**: `number`

Defined in: [packages/glaze/src/core/Camera.ts:25](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L25)

#### Methods

##### screenToWorld()

> **screenToWorld**(`screen`): [`Point2D`](#point2d)

Defined in: [packages/glaze/src/core/Camera.ts:33](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L33)

###### Parameters

###### screen

[`Point2D`](#point2d)

###### Returns

[`Point2D`](#point2d)

##### worldToScreen()

> **worldToScreen**(`world`): [`Point2D`](#point2d)

Defined in: [packages/glaze/src/core/Camera.ts:40](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L40)

###### Parameters

###### world

[`Point2D`](#point2d)

###### Returns

[`Point2D`](#point2d)

## Interfaces

### Point2D

Defined in: [packages/glaze/src/core/Camera.ts:1](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L1)

#### Properties

##### x

> **x**: `number`

Defined in: [packages/glaze/src/core/Camera.ts:2](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L2)

##### y

> **y**: `number`

Defined in: [packages/glaze/src/core/Camera.ts:3](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L3)

***

### ZoomBounds

Defined in: [packages/glaze/src/core/Camera.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L6)

#### Properties

##### maxZoom

> **maxZoom**: `number`

Defined in: [packages/glaze/src/core/Camera.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L8)

##### minZoom

> **minZoom**: `number`

Defined in: [packages/glaze/src/core/Camera.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L7)

## Variables

### DEFAULT\_ZOOM\_BOUNDS

> `const` **DEFAULT\_ZOOM\_BOUNDS**: [`ZoomBounds`](#zoombounds)

Defined in: [packages/glaze/src/core/Camera.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L11)

## Functions

### clamp()

> **clamp**(`min`, `max`): (`value`) => `number`

Defined in: [packages/glaze/src/core/Camera.ts:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L14)

#### Parameters

##### min

`number`

##### max

`number`

#### Returns

(`value`) => `number`

***

### defaultCamera()

> **defaultCamera**(): [`Camera`](#camera)

Defined in: [packages/glaze/src/core/Camera.ts:48](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/glaze/src/core/Camera.ts#L48)

#### Returns

[`Camera`](#camera)
