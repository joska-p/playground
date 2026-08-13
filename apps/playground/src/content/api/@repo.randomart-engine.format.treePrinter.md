---
title: format/treePrinter
package: "@repo/randomart-engine"
kind: module
module: format/treePrinter
---

## Functions

### nodeToMathString()

> **nodeToMathString**(`node`): `string`

Defined in: [packages/randomart-engine/src/format/treePrinter.ts:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/format/treePrinter.ts#L5)

Renders a tree as an infix math expression, e.g. `(sin(π · x) + y)`.

#### Parameters

##### node

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

#### Returns

`string`

***

### nodeToTreeView()

> **nodeToTreeView**(`node`, `depth?`): `string`

Defined in: [packages/randomart-engine/src/format/treePrinter.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/format/treePrinter.ts#L17)

Renders a tree as an indented ASCII tree view, for debugging.

#### Parameters

##### node

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### depth?

`number` = `0`

#### Returns

`string`
