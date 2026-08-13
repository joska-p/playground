---
title: mock-worker-pool
package: "@repo/worker-pool"
kind: module
module: mock-worker-pool
---

## Modules

- [\<internal\>](@repo.worker-pool.mock-worker-pool.<internal>.md)

## Classes

### MockWorkerPool

Defined in: [packages/worker-pool/src/mock-worker-pool.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/mock-worker-pool.ts#L4)

Synchronous mock implementation of WorkerPool for unit testing without Web Workers.

#### Type Parameters

##### TTask

`TTask`

##### TResult

`TResult`

#### Constructors

##### Constructor

> **new MockWorkerPool**\<`TTask`, `TResult`\>(`handler`): [`MockWorkerPool`](#mockworkerpool)\<`TTask`, `TResult`\>

Defined in: [packages/worker-pool/src/mock-worker-pool.ts:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/mock-worker-pool.ts#L12)

Initializes a MockWorkerPool with a synchronous handler function.

###### Parameters

###### handler

[`Handler`](@repo.worker-pool.mock-worker-pool.<internal>.md#handler)\<`TTask`, `TResult`\>

Function that produces a result directly from a task.

###### Returns

[`MockWorkerPool`](#mockworkerpool)\<`TTask`, `TResult`\>

#### Methods

##### run()

> **run**(`task`): `Promise`\<`TResult`\>

Defined in: [packages/worker-pool/src/mock-worker-pool.ts:22](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/mock-worker-pool.ts#L22)

Executes the task inline via the handler and returns a resolved promise.

###### Parameters

###### task

`TTask`

The task payload.

###### Returns

`Promise`\<`TResult`\>

Promise resolving immediately to the handler result.

##### teardown()

> **teardown**(): `void`

Defined in: [packages/worker-pool/src/mock-worker-pool.ts:27](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/mock-worker-pool.ts#L27)

No-op teardown method for interface compatibility.

###### Returns

`void`
