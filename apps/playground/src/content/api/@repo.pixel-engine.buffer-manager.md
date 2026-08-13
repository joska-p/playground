---
title: buffer-manager
package: "@repo/pixel-engine"
kind: module
module: buffer-manager
---

## Modules

- [\<internal\>](@repo.pixel-engine.buffer-manager.<internal>.md)

## Classes

### BufferManager

Defined in: [packages/pixel-engine/src/buffer-manager.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/buffer-manager.ts#L4)

Double-buffered pixel array manager for ping-ponging image transforms.

#### Constructors

##### Constructor

> **new BufferManager**(`source`): [`BufferManager`](#buffermanager)

Defined in: [packages/pixel-engine/src/buffer-manager.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/buffer-manager.ts#L11)

Initializes the buffer manager with source pixel data.

###### Parameters

###### source

[`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

###### Returns

[`BufferManager`](#buffermanager)

#### Accessors

##### current

###### Get Signature

> **get** **current**(): `Uint8ClampedArray`\<[`ArrayBufferLike`](@repo.pixel-engine.buffer-manager.<internal>.md#arraybufferlike)\>

Defined in: [packages/pixel-engine/src/buffer-manager.ts:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/buffer-manager.ts#L21)

Gets the active current buffer.

###### Returns

`Uint8ClampedArray`\<[`ArrayBufferLike`](@repo.pixel-engine.buffer-manager.<internal>.md#arraybufferlike)\>

##### height

###### Get Signature

> **get** **height**(): `number`

Defined in: [packages/pixel-engine/src/buffer-manager.ts:36](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/buffer-manager.ts#L36)

Height of the managed image.

###### Returns

`number`

##### other

###### Get Signature

> **get** **other**(): `Uint8ClampedArray`\<[`ArrayBufferLike`](@repo.pixel-engine.buffer-manager.<internal>.md#arraybufferlike)\> \| `undefined`

Defined in: [packages/pixel-engine/src/buffer-manager.ts:26](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/buffer-manager.ts#L26)

Gets the secondary target buffer.

###### Returns

`Uint8ClampedArray`\<[`ArrayBufferLike`](@repo.pixel-engine.buffer-manager.<internal>.md#arraybufferlike)\> \| `undefined`

##### width

###### Get Signature

> **get** **width**(): `number`

Defined in: [packages/pixel-engine/src/buffer-manager.ts:31](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/buffer-manager.ts#L31)

Width of the managed image.

###### Returns

`number`

#### Methods

##### replaceWith()

> **replaceWith**(`pixelData`): `void`

Defined in: [packages/pixel-engine/src/buffer-manager.ts:53](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/buffer-manager.ts#L53)

Replaces current state with new PixelData, resizing buffers if necessary.

###### Parameters

###### pixelData

[`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

###### Returns

`void`

##### snapshot()

> **snapshot**(): [`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

Defined in: [packages/pixel-engine/src/buffer-manager.ts:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/buffer-manager.ts#L46)

Creates a copy snapshot of the current buffer as PixelData.

###### Returns

[`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

##### swap()

> **swap**(): `void`

Defined in: [packages/pixel-engine/src/buffer-manager.ts:41](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/buffer-manager.ts#L41)

Swaps current and target buffers.

###### Returns

`void`
