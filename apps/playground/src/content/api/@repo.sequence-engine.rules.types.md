---
title: rules/types
package: "@repo/sequence-engine"
kind: module
module: rules/types
---

## Type Aliases

### NextStepOptions

> **NextStepOptions** = `object`

Defined in: [rules/types.ts:2](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L2)

Context provided to a sequence rule when computing its next term.

#### Properties

##### current

> **current**: `number`

Defined in: [rules/types.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L6)

Most recently computed term value.

##### index

> **index**: `number`

Defined in: [rules/types.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L4)

Current term index (1-based for terms after the initial 0).

##### seed?

> `optional` **seed?**: `string`

Defined in: [rules/types.ts:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L12)

Optional seed string for deterministic variation.

##### seen

> **seen**: `Set`\<`number`\>

Defined in: [rules/types.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L10)

Set of all unique terms produced so far.

##### sequence

> **sequence**: `number`[]

Defined in: [rules/types.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L8)

Complete array of generated terms so far.

***

### SequenceRule

> **SequenceRule**\<`TId`, `TName`\> = `object`

Defined in: [rules/types.ts:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L16)

Definition contract for a mathematical sequence rule.

#### Type Parameters

##### TId

`TId` *extends* `string` = `string`

##### TName

`TName` *extends* `string` = `string`

#### Properties

##### description

> **description**: `string`

Defined in: [rules/types.ts:22](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L22)

Short summary of how the rule operates.

##### getNext

> **getNext**: (`options`) => `number`

Defined in: [rules/types.ts:26](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L26)

Function computing the next term given current context.

###### Parameters

###### options

[`NextStepOptions`](#nextstepoptions)

###### Returns

`number`

##### id

> **id**: `TId`

Defined in: [rules/types.ts:20](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L20)

Unique rule identifier string.

##### maxSteps

> **maxSteps**: `number`

Defined in: [rules/types.ts:24](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L24)

Maximum recommended step count (0 for uncapped).

##### name

> **name**: `TName`

Defined in: [rules/types.ts:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/types.ts#L18)

Human-readable display name.
