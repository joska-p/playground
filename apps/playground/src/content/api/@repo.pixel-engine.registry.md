---
title: registry
package: "@repo/pixel-engine"
kind: module
module: registry
---

## Classes

### Registry

Defined in: [packages/pixel-engine/src/registry.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/registry.ts#L4)

Registry storing manipulation definitions by unique string key.

#### Constructors

##### Constructor

> **new Registry**(): [`Registry`](#registry)

###### Returns

[`Registry`](#registry)

#### Methods

##### from()

> `static` **from**(`definitions`): [`Registry`](#registry)

Defined in: [packages/pixel-engine/src/registry.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/registry.ts#L8)

Creates a Registry populated from an array of manipulation definitions.

###### Parameters

###### definitions

readonly [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)[]

###### Returns

[`Registry`](#registry)

##### get()

> **get**(`identifier`): [`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)

Defined in: [packages/pixel-engine/src/registry.ts:35](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/registry.ts#L35)

Retrieves a registered manipulation by ID.

###### Parameters

###### identifier

`string`

###### Returns

[`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)

##### register()

> **register**(`definition`): `void`

Defined in: [packages/pixel-engine/src/registry.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/registry.ts#L17)

Registers a manipulation definition.

###### Parameters

###### definition

[`ManipulationDefinition`](@repo.pixel-engine.types.md#manipulationdefinition)

###### Returns

`void`
