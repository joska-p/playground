---
title: tree/build
package: "@repo/randomart-engine"
kind: module
module: tree/build
---

## Functions

### buildTree()

> **buildTree**(`structureRng`, `channelRng`, `currentDepth`, `maxDepth`, `rules?`): [`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

Defined in: [packages/randomart-engine/src/tree/build.ts:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/build.ts#L46)

Builds one expression tree, recursively picking rules from a pool weighted by each rule's
`weight`. Structural decisions at shallow depth come from `structureRng` (shared across channels)
so R/G/B trees share shape; deeper nodes use `channelRng`.

#### Parameters

##### structureRng

[`SeededRandom`](@repo.randomart-engine.random.SeededRandom.md#seededrandom)

##### channelRng

[`SeededRandom`](@repo.randomart-engine.random.SeededRandom.md#seededrandom)

##### currentDepth

`number`

##### maxDepth

`number`

##### rules?

[`GrammarRule`](@repo.randomart-engine.types.md#grammarrule)[]

#### Returns

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)
