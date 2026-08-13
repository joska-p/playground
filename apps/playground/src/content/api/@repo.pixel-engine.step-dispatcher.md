---
title: step-dispatcher
package: "@repo/pixel-engine"
kind: module
module: step-dispatcher
---

## Functions

### dispatchStep()

> **dispatchStep**(`params`): `void`

Defined in: [packages/pixel-engine/src/step-dispatcher.ts:66](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/step-dispatcher.ts#L66)

Dispatches a single pipeline step based on its access mode (pixel, neighborhood, or global).

#### Parameters

##### params

Step configuration, context, buffer manager, and scheduler.

###### bufferManager

[`BufferManager`](@repo.pixel-engine.buffer-manager.md#buffermanager)

###### context

[`PipelineContext`](@repo.pixel-engine.types.md#pipelinecontext)

###### scheduler

[`FusionScheduler`](@repo.pixel-engine.fusion-scheduler.md#fusionscheduler)

###### step

\{ `id`: `string`; `options?`: \{ `radius?`: `number`; \} \| \{ `radius?`: `number`; \} \| \{ `strength?`: `number`; \} \| \{ `value?`: `number`; \} \| \{ `value?`: `number`; \} \| \{ `degrees?`: `number`; \} \| \{ `value?`: `number`; \} \| \{ `value?`: `number`; \} \| \{ `threshold?`: `number`; \} \| [`ResizeOptions`](@repo.pixel-engine.manipulations.manifest.<internal>.md#resizeoptions); \}

###### step.id

`string`

###### step.options?

\{ `radius?`: `number`; \} \| \{ `radius?`: `number`; \} \| \{ `strength?`: `number`; \} \| \{ `value?`: `number`; \} \| \{ `value?`: `number`; \} \| \{ `degrees?`: `number`; \} \| \{ `value?`: `number`; \} \| \{ `value?`: `number`; \} \| \{ `threshold?`: `number`; \} \| [`ResizeOptions`](@repo.pixel-engine.manipulations.manifest.<internal>.md#resizeoptions)

#### Returns

`void`
