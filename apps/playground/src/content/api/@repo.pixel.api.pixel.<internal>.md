---
title: api/pixel (internal)
package: "@repo/pixel"
kind: internal
module: api/pixel
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

`Uint8ClampedArray`\<[`ArrayBufferLike`](#arraybufferlike)\>

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

## Type Aliases

### ArrayBufferLike

> **ArrayBufferLike** = `ArrayBufferTypes`\[keyof `ArrayBufferTypes`\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1718

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

### ManipulationLookup

> **ManipulationLookup** = `{ [Manipulation in typeof ALL_MANIPULATIONS[number] as Manipulation["id"]]: Manipulation["options"] }`

Defined in: [packages/pixel-engine/src/manipulations/manifest.ts:47](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/manipulations/manifest.ts#L47)

***

### ManipulationUIMetadata

> **ManipulationUIMetadata** = `object`

Defined in: [packages/pixel-engine/src/types.ts:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L16)

Metadata for displaying a manipulation in the UI.

#### Properties

##### argDefinitions

> **argDefinitions**: [`ArgDefinition`](@repo.pixel.api.pixel.md#argdefinition)[]

Defined in: [packages/pixel-engine/src/types.ts:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L21)

##### defaultArgs

> **defaultArgs**: [`Record`](#record)\<`string`, `number`\>

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

### Readonly

> **Readonly**\<`T`\> = `{ readonly [P in keyof T]: T[P] }`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1597

Make all properties in T readonly

#### Type Parameters

##### T

`T`

***

### Record

> **Record**\<`K`, `T`\> = `{ [P in K]: T }`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1611

Construct a type with a set of properties K of type T

#### Type Parameters

##### K

`K` *extends* keyof `any`

##### T

`T`

***

### ResizeOptions

> **ResizeOptions** = \{ `fit?`: `never`; `height?`: `never`; `maximumPixels?`: `never`; `width`: `number`; \} \| \{ `fit?`: `never`; `height`: `number`; `maximumPixels?`: `never`; `width?`: `never`; \} \| \{ `fit?`: `"fill"` \| `"cover"` \| `"contain"`; `height`: `number`; `maximumPixels?`: `never`; `width`: `number`; \} \| \{ `fit?`: `never`; `height?`: `never`; `maximumPixels`: `number`; `width?`: `never`; \}

Defined in: [packages/pixel-engine/src/manipulations/whole/resize.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/manipulations/whole/resize.ts#L4)

***

### WholeImageFunction

> **WholeImageFunction**\<`Options`\> = (`parameters`) => [`PixelData`](#pixeldata)

Defined in: [packages/pixel-engine/src/types.ts:63](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L63)

Global whole-image transform function returning PixelData.

#### Type Parameters

##### Options

`Options` = `any`

#### Parameters

##### parameters

[`WholeImageParameters`](#wholeimageparameters)\<`Options`\>

#### Returns

[`PixelData`](#pixeldata)

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

> **imageData**: [`PixelData`](#pixeldata)

Defined in: [packages/pixel-engine/src/types.ts:47](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L47)

##### options

> **options**: `Options`

Defined in: [packages/pixel-engine/src/types.ts:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/types.ts#L46)

## Variables

### ALL\_MANIPULATIONS

> `const` **ALL\_MANIPULATIONS**: readonly \[[`ManipulationDefinition`](#manipulationdefinition)\<\{ `value?`: `number`; \}\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<\{ `value?`: `number`; \}\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<\{ `value?`: `number`; \}\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<\{ `degrees?`: `number`; \}\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<\{ `value?`: `number`; \}\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<\{ `threshold?`: `number`; \}\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<\{ `radius?`: `number`; \}\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<\{ `radius?`: `number`; \}\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<\{ `strength?`: `number`; \}\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<[`ResizeOptions`](#resizeoptions)\> & `object`, [`ManipulationDefinition`](#manipulationdefinition)\<`unknown`\> & `object`\]

Defined in: [packages/pixel-engine/src/manipulations/manifest.ts:24](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/manipulations/manifest.ts#L24)

Array of all built-in manipulation definitions supported by the engine.
