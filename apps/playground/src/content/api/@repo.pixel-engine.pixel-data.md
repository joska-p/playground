---
title: pixel-data
package: "@repo/pixel-engine"
kind: module
module: pixel-data
---

## Classes

### PixelData

Defined in: [packages/pixel-engine/src/pixel-data.ts:2](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/pixel-data.ts#L2)

Framework-agnostic container holding RGBA pixel bytes and dimensions.

#### Constructors

##### Constructor

> **new PixelData**(`width`, `height`, `data?`): [`PixelData`](#pixeldata)

Defined in: [packages/pixel-engine/src/pixel-data.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/pixel-data.ts#L17)

Create a new PixelData container.

###### Parameters

###### width

`number`

Width of the image.

###### height

`number`

Height of the image.

###### data?

`Uint8ClampedArray`\<[`ArrayBufferLike`](@repo.pixel-engine.buffer-manager.<internal>.md#arraybufferlike)\>

Optional existing Uint8ClampedArray RGBA data buffer.

###### Returns

[`PixelData`](#pixeldata)

#### Properties

##### data

> `readonly` **data**: `Uint8ClampedArray`

Defined in: [packages/pixel-engine/src/pixel-data.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/pixel-data.ts#L4)

The raw RGBA byte buffer.

##### height

> `readonly` **height**: `number`

Defined in: [packages/pixel-engine/src/pixel-data.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/pixel-data.ts#L8)

Height in pixels.

##### width

> `readonly` **width**: `number`

Defined in: [packages/pixel-engine/src/pixel-data.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/pixel-data.ts#L6)

Width in pixels.
