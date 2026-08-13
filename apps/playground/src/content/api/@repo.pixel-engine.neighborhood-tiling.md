---
title: neighborhood-tiling
package: "@repo/pixel-engine"
kind: module
module: neighborhood-tiling
---

## Modules

- [\<internal\>](@repo.pixel-engine.neighborhood-tiling.<internal>.md)

## Functions

### runNeighborhoodTiled()

> **runNeighborhoodTiled**(`params`): [`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

Defined in: [packages/pixel-engine/src/neighborhood-tiling.ts:77](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/neighborhood-tiling.ts#L77)

Runs a neighborhood manipulation using tiled processing with halo padding to bound peak memory
usage.

#### Parameters

##### params

Source PixelData, manipulation definition, and options.

###### definition

[`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)

###### options

[`Record`](@repo.pixel-engine.neighborhood-tiling.<internal>.md#record)\<`string`, `unknown`\>

###### source

[`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

#### Returns

[`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

Resulting PixelData image.
