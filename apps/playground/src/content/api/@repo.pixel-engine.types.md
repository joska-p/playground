---
title: types
package: "@repo/pixel-engine"
kind: module
module: types
---

## Type Aliases

### ArgDefinition

> **ArgDefinition** = `object`

Defined in: [packages/pixel-engine/src/types.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L7)

UI argument slider/field definition for a manipulation option.

#### Properties

##### key

> **key**: `string`

Defined in: [packages/pixel-engine/src/types.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L8)

##### label

> **label**: `string`

Defined in: [packages/pixel-engine/src/types.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L9)

##### max

> **max**: `number`

Defined in: [packages/pixel-engine/src/types.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L11)

##### min

> **min**: `number`

Defined in: [packages/pixel-engine/src/types.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L10)

##### step

> **step**: `number`

Defined in: [packages/pixel-engine/src/types.ts:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L12)

***

### ManipulationDefinition

> **ManipulationDefinition**\<`Options`\> = `object` & \{ `access`: `"pixel"`; `execute`: [`PixelFunction`](#pixelfunction)\<`Options`\>; \} \| \{ `access`: `"neighborhood"`; `execute`: [`NeighborhoodFunction`](#neighborhoodfunction)\<`Options`\>; `radius`: `number`; \} \| \{ `access`: `"global"`; `execute`: [`WholeImageFunction`](#wholeimagefunction)\<`Options`\>; \}

Defined in: [packages/pixel-engine/src/types.ts:73](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L73)

Standardized definition for any image manipulation. The 'options' property is a type-only marker
to simplify Step derivation.

#### Type Declaration

##### id

> **id**: `string`

##### options?

> `optional` **options?**: `Options`

##### ui

> **ui**: [`ManipulationUIMetadata`](#manipulationuimetadata)

#### Type Parameters

##### Options

`Options` = `any`

***

### ManipulationUIMetadata

> **ManipulationUIMetadata** = `object`

Defined in: [packages/pixel-engine/src/types.ts:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L16)

Metadata for displaying a manipulation in the UI.

#### Properties

##### argDefinitions

> **argDefinitions**: [`ArgDefinition`](#argdefinition)[]

Defined in: [packages/pixel-engine/src/types.ts:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L21)

##### defaultArgs

> **defaultArgs**: [`Record`](@repo.pixel-engine.neighborhood-tiling.<internal>.md#record)\<`string`, `number`\>

Defined in: [packages/pixel-engine/src/types.ts:20](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L20)

##### description

> **description**: `string`

Defined in: [packages/pixel-engine/src/types.ts:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L18)

##### longDescription

> **longDescription**: `string`

Defined in: [packages/pixel-engine/src/types.ts:19](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L19)

##### name

> **name**: `string`

Defined in: [packages/pixel-engine/src/types.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L17)

***

### NeighborhoodFunction

> **NeighborhoodFunction**\<`Options`\> = (`parameters`) => `void`

Defined in: [packages/pixel-engine/src/types.ts:58](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L58)

Neighborhood convolution function modifying destination array in place.

#### Type Parameters

##### Options

`Options` = `any`

#### Parameters

##### parameters

[`NeighborhoodParameters`](#neighborhoodparameters)\<`Options`\>

#### Returns

`void`

***

### NeighborhoodParameters

> **NeighborhoodParameters**\<`Options`\> = `object`

Defined in: [packages/pixel-engine/src/types.ts:36](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L36)

Parameters passed to a neighborhood convolution function.

#### Type Parameters

##### Options

`Options`

#### Properties

##### destination

> **destination**: `Uint8ClampedArray`

Defined in: [packages/pixel-engine/src/types.ts:39](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L39)

##### height

> **height**: `number`

Defined in: [packages/pixel-engine/src/types.ts:41](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L41)

##### options

> **options**: `Options`

Defined in: [packages/pixel-engine/src/types.ts:37](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L37)

##### source

> **source**: `Uint8ClampedArray`

Defined in: [packages/pixel-engine/src/types.ts:38](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L38)

##### width

> **width**: `number`

Defined in: [packages/pixel-engine/src/types.ts:40](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L40)

***

### PipelineContext

> **PipelineContext** = `object`

Defined in: [packages/pixel-engine/src/types.ts:92](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L92)

Context provided to the pipeline runner containing registry and constraints.

#### Properties

##### maximumPixels

> **maximumPixels**: `number`

Defined in: [packages/pixel-engine/src/types.ts:94](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L94)

##### registry

> **registry**: [`Registry`](@repo.pixel-engine.registry.md#registry)

Defined in: [packages/pixel-engine/src/types.ts:93](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L93)

***

### PixelFunction

> **PixelFunction**\<`Options`\> = (`parameters`) => \[`number`, `number`, `number`, `number`\]

Defined in: [packages/pixel-engine/src/types.ts:53](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L53)

Per-pixel transform function returning RGBA tuple.

#### Type Parameters

##### Options

`Options` = `any`

#### Parameters

##### parameters

[`PixelParameters`](#pixelparameters)\<`Options`\>

#### Returns

\[`number`, `number`, `number`, `number`\]

***

### PixelParameters

> **PixelParameters**\<`Options`\> = `object`

Defined in: [packages/pixel-engine/src/types.ts:27](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L27)

Parameters passed to a per-pixel transform function.

#### Type Parameters

##### Options

`Options`

#### Properties

##### alpha

> **alpha**: `number`

Defined in: [packages/pixel-engine/src/types.ts:32](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L32)

##### blue

> **blue**: `number`

Defined in: [packages/pixel-engine/src/types.ts:31](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L31)

##### green

> **green**: `number`

Defined in: [packages/pixel-engine/src/types.ts:30](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L30)

##### options

> **options**: `Options`

Defined in: [packages/pixel-engine/src/types.ts:28](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L28)

##### red

> **red**: `number`

Defined in: [packages/pixel-engine/src/types.ts:29](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L29)

***

### WholeImageFunction

> **WholeImageFunction**\<`Options`\> = (`parameters`) => [`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

Defined in: [packages/pixel-engine/src/types.ts:63](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L63)

Global whole-image transform function returning PixelData.

#### Type Parameters

##### Options

`Options` = `any`

#### Parameters

##### parameters

[`WholeImageParameters`](#wholeimageparameters)\<`Options`\>

#### Returns

[`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

***

### WholeImageParameters

> **WholeImageParameters**\<`Options`\> = `object`

Defined in: [packages/pixel-engine/src/types.ts:45](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L45)

Parameters passed to a global whole-image transform function.

#### Type Parameters

##### Options

`Options`

#### Properties

##### imageData

> **imageData**: [`PixelData`](@repo.pixel-engine.pixel-data.md#pixeldata)

Defined in: [packages/pixel-engine/src/types.ts:47](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L47)

##### options

> **options**: `Options`

Defined in: [packages/pixel-engine/src/types.ts:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L46)
