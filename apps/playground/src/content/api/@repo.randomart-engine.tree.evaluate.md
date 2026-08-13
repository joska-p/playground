---
title: tree/evaluate
package: "@repo/randomart-engine"
kind: module
module: tree/evaluate
---

## Functions

### evaluateNode()

> **evaluateNode**(`node`, `x`, `y`, `t?`): `number`

Defined in: [packages/randomart-engine/src/tree/evaluate.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/evaluate.ts#L8)

Evaluates a tree node at a coordinate and time, returning a value in [-1, 1]. Terminal nodes
(`x`, `y`, `constant`) short-circuit; everything else is dispatched to its rule's `evaluate`.

#### Parameters

##### node

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### x

`number`

##### y

`number`

##### t?

`number` = `0`

#### Returns

`number`
