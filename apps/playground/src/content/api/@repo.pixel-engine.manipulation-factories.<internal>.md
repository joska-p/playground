---
title: manipulation-factories (internal)
package: "@repo/pixel-engine"
kind: internal
module: manipulation-factories
---

## Type Aliases

### DefineManipParams

> **DefineManipParams**\<`Options`, `Identifier`\> = `object` & \{ `access`: `"pixel"`; `execute`: [`PixelFunction`](@repo.pixel-engine.types.md#pixelfunction)\<`Options`\>; \} \| \{ `access`: `"neighborhood"`; `execute`: [`NeighborhoodFunction`](@repo.pixel-engine.types.md#neighborhoodfunction)\<`Options`\>; `radius`: `number`; \} \| \{ `access`: `"global"`; `execute`: [`WholeImageFunction`](@repo.pixel-engine.types.md#wholeimagefunction)\<`Options`\>; \}

Defined in: [packages/pixel-engine/src/manipulation-factories.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/manipulation-factories.ts#L9)

#### Type Declaration

##### id

> **id**: `Identifier`

##### options?

> `optional` **options?**: `Options`

##### ui

> **ui**: [`ManipulationUIMetadata`](@repo.pixel-engine.types.md#manipulationuimetadata)

#### Type Parameters

##### Options

`Options`

##### Identifier

`Identifier` *extends* `string`
