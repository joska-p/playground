---
title: worker-pool
package: "@repo/worker-pool"
kind: module
module: worker-pool
---

## Modules

- [\<internal\>](@repo.worker-pool.worker-pool.<internal>.md)

## Classes

### WorkerPool

Defined in: [packages/worker-pool/src/worker-pool.ts:20](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/worker-pool.ts#L20)

Manages a pool of Web Workers for concurrent background task processing. Handles lazy worker
creation, task queuing, serialization, and cleanup.

#### Type Parameters

##### TTask

`TTask`

##### TResult

`TResult`

#### Constructors

##### Constructor

> **new WorkerPool**\<`TTask`, `TResult`\>(`config`): [`WorkerPool`](#workerpool)\<`TTask`, `TResult`\>

Defined in: [packages/worker-pool/src/worker-pool.ts:31](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/worker-pool.ts#L31)

Initializes a new WorkerPool instance.

###### Parameters

###### config

[`WorkerPoolConfig`](#workerpoolconfig)\<`TTask`, `TResult`\>

Configuration containing factory function, max pool size, and serializers.

###### Returns

[`WorkerPool`](#workerpool)\<`TTask`, `TResult`\>

#### Methods

##### run()

> **run**(`task`): `Promise`\<`TResult`\>

Defined in: [packages/worker-pool/src/worker-pool.ts:42](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/worker-pool.ts#L42)

Dispatches a task to an available worker or queues it until a worker becomes free.

###### Parameters

###### task

`TTask`

The task payload to process.

###### Returns

`Promise`\<`TResult`\>

A promise resolving to the typed worker result.

##### teardown()

> **teardown**(): `void`

Defined in: [packages/worker-pool/src/worker-pool.ts:62](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/worker-pool.ts#L62)

Terminates all active workers and rejects any pending queued tasks.

###### Returns

`void`

## Type Aliases

### WorkerPoolConfig

> **WorkerPoolConfig**\<`TTask`, `TResult`\> = `object`

Defined in: [packages/worker-pool/src/types.ts:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/types.ts#L5)

Configuration options for initializing a WorkerPool.

#### Type Parameters

##### TTask

`TTask`

##### TResult

`TResult`

#### Properties

##### deserialize

> **deserialize**: (`event`) => [`WorkerResult`](#workerresult)\<`TResult`\>

Defined in: [packages/worker-pool/src/types.ts:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/types.ts#L13)

Deserializes a worker MessageEvent into a typed WorkerResult.

###### Parameters

###### event

`MessageEvent`

###### Returns

[`WorkerResult`](#workerresult)\<`TResult`\>

##### maxPoolSize?

> `optional` **maxPoolSize?**: `number`

Defined in: [packages/worker-pool/src/types.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/types.ts#L9)

Maximum number of workers allowed in the pool. Defaults to 4.

##### serialize

> **serialize**: (`task`) => `object`

Defined in: [packages/worker-pool/src/types.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/types.ts#L11)

Serializes a typed task into a postMessage payload and optional transferable objects.

###### Parameters

###### task

`TTask`

###### Returns

`object`

###### message

> **message**: `unknown`

###### transfer?

> `optional` **transfer?**: [`Transferable`](@repo.worker-pool.worker-pool.<internal>.md#transferable)[]

##### workerFactory

> **workerFactory**: () => [`Worker`](@repo.worker-pool.worker-pool.<internal>.md#worker)

Defined in: [packages/worker-pool/src/types.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/types.ts#L7)

Creates a fresh Worker instance. The consumer owns URL creation and bundler flags.

###### Returns

[`Worker`](@repo.worker-pool.worker-pool.<internal>.md#worker)

***

### WorkerResult

> **WorkerResult**\<`T`\> = \{ `ok`: `true`; `value`: `T`; \} \| \{ `error`: `Error`; `ok`: `false`; \}

Defined in: [packages/worker-pool/src/types.ts:2](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/worker-pool/src/types.ts#L2)

Discriminated union representing the result returned from a worker task execution.

#### Type Parameters

##### T

`T`
