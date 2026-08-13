---
title: manipulation-factories
package: "@repo/pixel-engine"
kind: module
module: manipulation-factories
---

## Modules

- [\<internal\>](@repo.pixel-engine.manipulation-factories.<internal>.md)

## Functions

### defineManip()

> **defineManip**\<`Options`, `Identifier`\>(`params`): [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<`Options`\> & `object`

Defined in: [packages/pixel-engine/src/manipulation-factories.ts:29](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/manipulation-factories.ts#L29)

Factory helper for creating typed manipulation definitions.

#### Type Parameters

##### Options

`Options`

##### Identifier

`Identifier` *extends* `string` = `string`

#### Parameters

##### params

[`DefineManipParams`](@repo.pixel-engine.manipulation-factories.<internal>.md#definemanipparams)\<`Options`, `Identifier`\>

Manipulation properties including access mode, UI metadata, and execute function.

#### Returns

[`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<`Options`\> & `object`

Strongly-typed manipulation definition.
