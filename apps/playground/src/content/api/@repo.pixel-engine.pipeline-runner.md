---
title: pipeline-runner
package: "@repo/pixel-engine"
kind: module
module: pipeline-runner
---

## Functions

### runPipeline()

> **runPipeline**(`params`): [`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)[]

Defined in: [packages/pixel-engine/src/pipeline-runner.ts:37](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/pipeline-runner.ts#L37)

Executes an image manipulation pipeline over a source PixelData, returning intermediate snapshots
after each step.

#### Parameters

##### params

Object containing source PixelData, pipeline steps array, and PipelineContext.

###### context

[`PipelineContext`](@repo.pixel-engine.types.md#pipelinecontext)

###### source

[`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

###### steps

`object`[]

#### Returns

[`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)[]

Array of PixelData snapshots representing the state after each step.
