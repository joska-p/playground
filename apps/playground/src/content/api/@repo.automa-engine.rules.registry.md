---
title: rules/registry
package: "@repo/automa-engine"
kind: module
module: rules/registry
---

## Modules

- [\<internal\>](@repo.automa-engine.rules.registry.<internal>.md)

## Type Aliases

### Rule

> **Rule**\<`TId`\> = `object`

Defined in: [packages/automa-engine/src/rules/registry.ts:1](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/rules/registry.ts#L1)

#### Type Parameters

##### TId

`TId` *extends* `string` = `string`

#### Properties

##### birth

> `readonly` **birth**: readonly `boolean`[]

Defined in: [packages/automa-engine/src/rules/registry.ts:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/rules/registry.ts#L5)

##### id

> `readonly` **id**: `TId`

Defined in: [packages/automa-engine/src/rules/registry.ts:2](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/rules/registry.ts#L2)

##### name

> `readonly` **name**: `string`

Defined in: [packages/automa-engine/src/rules/registry.ts:3](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/rules/registry.ts#L3)

##### stateCount

> `readonly` **stateCount**: `number`

Defined in: [packages/automa-engine/src/rules/registry.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/rules/registry.ts#L4)

##### survive

> `readonly` **survive**: readonly `boolean`[]

Defined in: [packages/automa-engine/src/rules/registry.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/rules/registry.ts#L6)

***

### RuleId

> **RuleId** = *typeof* [`allRules`](#allrules)\[`number`\]\[`"id"`\]

Defined in: [packages/automa-engine/src/rules/registry.ts:49](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/rules/registry.ts#L49)

## Variables

### allRules

> `const` **allRules**: readonly \[[`Rule`](#rule)\<`"conway"`\>, [`Rule`](#rule)\<`"star-wars"`\>, [`Rule`](#rule)\<`"transburst"`\>, [`Rule`](#rule)\<`"seeds"`\>, [`Rule`](#rule)\<`"day-night"`\>\]

Defined in: [packages/automa-engine/src/rules/registry.ts:47](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/rules/registry.ts#L47)

***

### rules

> `const` **rules**: [`Record`](@repo.automa-engine.rules.registry.<internal>.md#record)\<`"conway"` \| `"star-wars"` \| `"transburst"` \| `"seeds"` \| `"day-night"`, [`Rule`](#rule)\<`"conway"` \| `"star-wars"` \| `"transburst"` \| `"seeds"` \| `"day-night"`\>\>

Defined in: [packages/automa-engine/src/rules/registry.ts:51](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/rules/registry.ts#L51)
