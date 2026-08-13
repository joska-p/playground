---
title: fusion-scheduler
package: "@repo/pixel-engine"
kind: module
module: fusion-scheduler
---

## Classes

### FusionScheduler

Defined in: [packages/pixel-engine/src/fusion-scheduler.ts:48](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/fusion-scheduler.ts#L48)

Scheduler that batches and fuses consecutive per-pixel operations into a single pass over the
buffer.

#### Constructors

##### Constructor

> **new FusionScheduler**(): [`FusionScheduler`](#fusionscheduler)

###### Returns

[`FusionScheduler`](#fusionscheduler)

#### Methods

##### add()

> **add**(`definition`, `options`): `void`

Defined in: [packages/pixel-engine/src/fusion-scheduler.ts:55](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/fusion-scheduler.ts#L55)

Adds a per-pixel manipulation to the current batch.

###### Parameters

###### definition

[`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)

###### options

[`Record`](@repo.pixel-engine.neighborhood-tiling.<internal>.md#record)\<`string`, `unknown`\>

###### Returns

`void`

##### flush()

> **flush**(`bufferManager`): `void`

Defined in: [packages/pixel-engine/src/fusion-scheduler.ts:60](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/fusion-scheduler.ts#L60)

Flushes all queued per-pixel operations in a single fused pass and swaps buffers.

###### Parameters

###### bufferManager

[`BufferManager`](@repo.pixel-engine.buffer-manager.md#buffermanager)

###### Returns

`void`
