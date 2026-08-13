---
title: api/pixel
package: "@repo/pixel"
kind: module
module: api/pixel
---

## Modules

- [\<internal\>](@repo.pixel.api.pixel.<internal>.md)

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

### ManipulationInfo

> **ManipulationInfo** = `object`

Defined in: [packages/pixel/src/api/pixel.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L10)

Registry entry describing a manipulation's access mode, UI copy, and option definitions.

#### Properties

##### access

> `readonly` **access**: `"pixel"` \| `"neighborhood"` \| `"global"`

Defined in: [packages/pixel/src/api/pixel.ts:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L12)

##### argDefinitions

> `readonly` **argDefinitions**: readonly [`ArgDefinition`](#argdefinition)[]

Defined in: [packages/pixel/src/api/pixel.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L17)

##### defaultArgs

> `readonly` **defaultArgs**: [`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<[`Record`](@repo.pixel.api.pixel.<internal>.md#record)\<`string`, `number`\>\>

Defined in: [packages/pixel/src/api/pixel.ts:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L16)

##### description

> `readonly` **description**: `string`

Defined in: [packages/pixel/src/api/pixel.ts:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L14)

##### id

> `readonly` **id**: `string`

Defined in: [packages/pixel/src/api/pixel.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L11)

##### longDescription

> `readonly` **longDescription**: `string`

Defined in: [packages/pixel/src/api/pixel.ts:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L15)

##### name

> `readonly` **name**: `string`

Defined in: [packages/pixel/src/api/pixel.ts:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L13)

***

### RunConfig

> **RunConfig** = `object`

Defined in: [packages/pixel/src/api/pixel.ts:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L21)

Input to `pixel.run()`: the source `ImageData` and the ordered `Step`s to apply.

#### Properties

##### maximumPixels?

> `optional` **maximumPixels?**: `number`

Defined in: [packages/pixel/src/api/pixel.ts:24](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L24)

##### sourceImageData

> **sourceImageData**: [`ImageData`](@repo.pixel.hooks.usePixel.<internal>.md#imagedata)

Defined in: [packages/pixel/src/api/pixel.ts:22](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L22)

##### steps

> **steps**: readonly [`Step`](#step-1)[]

Defined in: [packages/pixel/src/api/pixel.ts:23](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L23)

***

### Step

> **Step** = `{ [Identifier in keyof ManipulationLookup]: { id: Identifier; options?: ManipulationLookup[Identifier] } }`\[keyof [`ManipulationLookup`](@repo.pixel.api.pixel.<internal>.md#manipulationlookup)\]

Defined in: [packages/pixel-engine/src/manipulations/manifest.ts:54](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/manipulations/manifest.ts#L54)

Strongly-typed step union derived from ALL_MANIPULATIONS manifest.

## Variables

### pixel

> `const` **pixel**: `object`

Defined in: [packages/pixel/src/api/pixel.ts:123](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/api/pixel.ts#L123)

The package's single facade: run pipelines over `ImageData`, browse the manipulation catalog, and
manage the worker pool.

#### Type Declaration

##### manipulations

###### Get Signature

> **get** **manipulations**(): [`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<[`Record`](@repo.pixel.api.pixel.<internal>.md#record)\<`string`, [`ManipulationInfo`](#manipulationinfo)\>\>

All registered manipulations, keyed by id.

###### Returns

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<[`Record`](@repo.pixel.api.pixel.<internal>.md#record)\<`string`, [`ManipulationInfo`](#manipulationinfo)\>\>

##### getManipulationsByAccess()

> **getManipulationsByAccess**(`access`): [`Record`](@repo.pixel.api.pixel.<internal>.md#record)\<`string`, [`ManipulationInfo`](#manipulationinfo)\>

Manipulations filtered to one access mode (`pixel`, `neighborhood`, or `global`).

###### Parameters

###### access

`"pixel"` \| `"neighborhood"` \| `"global"`

###### Returns

[`Record`](@repo.pixel.api.pixel.<internal>.md#record)\<`string`, [`ManipulationInfo`](#manipulationinfo)\>

##### run()

> **run**(`config`): `Promise`\<[`ImageData`](@repo.pixel.hooks.usePixel.<internal>.md#imagedata)[]\>

Runs `steps` against the source and resolves with one `ImageData` snapshot per step.

###### Parameters

###### config

[`RunConfig`](#runconfig)

###### Returns

`Promise`\<[`ImageData`](@repo.pixel.hooks.usePixel.<internal>.md#imagedata)[]\>

##### teardown()

> **teardown**(): `void`

Terminates the worker pool and clears any pending work.

###### Returns

`void`
