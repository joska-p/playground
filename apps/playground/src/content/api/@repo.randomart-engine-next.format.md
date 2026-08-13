---
title: format
package: "@repo/randomart-engine-next"
kind: module
module: format
---

## Type Aliases

### TreeView

> **TreeView** = `object`

Defined in: [packages/randomart-engine-next/src/format.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/format.ts#L6)

A node rendered for display — a label, its operator id, an optional constant, and children.

#### Properties

##### children?

> `optional` **children?**: [`TreeView`](#treeview)[]

Defined in: [packages/randomart-engine-next/src/format.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/format.ts#L10)

##### label

> **label**: `string`

Defined in: [packages/randomart-engine-next/src/format.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/format.ts#L7)

##### type

> **type**: [`OperatorId`](@repo.randomart-engine-next.grammar.operators.registry.md#operatorid)

Defined in: [packages/randomart-engine-next/src/format.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/format.ts#L8)

##### value?

> `optional` **value?**: `number`

Defined in: [packages/randomart-engine-next/src/format.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/format.ts#L9)

## Functions

### toMathString()

> **toMathString**(`node`): `string`

Defined in: [packages/randomart-engine-next/src/format.ts:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/format.ts#L14)

Render the tree as a math expression, e.g. `((x + y) / 2)`.

#### Parameters

##### node

[`Node`](@repo.randomart-engine-next.tree.md#node)

#### Returns

`string`

***

### toTreeView()

> **toTreeView**(`node`): `string`

Defined in: [packages/randomart-engine-next/src/format.ts:27](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/format.ts#L27)

Render the tree as an ASCII tree diagram.

#### Parameters

##### node

[`Node`](@repo.randomart-engine-next.tree.md#node)

#### Returns

`string`
