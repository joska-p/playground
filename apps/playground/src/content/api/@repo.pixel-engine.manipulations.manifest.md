---
title: manipulations/manifest
package: "@repo/pixel-engine"
kind: module
module: manipulations/manifest
---

## Modules

- [\<internal\>](@repo.pixel-engine.manipulations.manifest.<internal>.md)

## Type Aliases

### Step

> **Step** = `{ [Identifier in keyof ManipulationLookup]: { id: Identifier; options?: ManipulationLookup[Identifier] } }`\[keyof [`ManipulationLookup`](@repo.pixel-engine.manipulations.manifest.<internal>.md#manipulationlookup)\]

Defined in: [packages/pixel-engine/src/manipulations/manifest.ts:54](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/manipulations/manifest.ts#L54)

Strongly-typed step union derived from ALL_MANIPULATIONS manifest.

## Variables

### ALL\_MANIPULATIONS

> `const` **ALL\_MANIPULATIONS**: readonly \[[`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<\{ `value?`: `number`; \}\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<\{ `value?`: `number`; \}\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<\{ `value?`: `number`; \}\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<\{ `degrees?`: `number`; \}\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<\{ `value?`: `number`; \}\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<\{ `threshold?`: `number`; \}\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<\{ `radius?`: `number`; \}\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<\{ `radius?`: `number`; \}\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<\{ `strength?`: `number`; \}\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<`unknown`\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<[`ResizeOptions`](@repo.pixel-engine.manipulations.manifest.<internal>.md#resizeoptions)\> & `object`, [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)\<`unknown`\> & `object`\]

Defined in: [packages/pixel-engine/src/manipulations/manifest.ts:24](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/manipulations/manifest.ts#L24)

Array of all built-in manipulation definitions supported by the engine.
