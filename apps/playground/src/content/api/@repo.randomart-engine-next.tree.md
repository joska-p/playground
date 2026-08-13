---
title: tree
package: "@repo/randomart-engine-next"
kind: module
module: tree
---

## Type Aliases

### BuildChannelTreesProps

> **BuildChannelTreesProps** = `object`

Defined in: [packages/randomart-engine-next/src/tree.ts:182](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L182)

Options for [buildChannelTrees](#buildchanneltrees).

#### Properties

##### correlated?

> `optional` **correlated?**: `boolean`

Defined in: [packages/randomart-engine-next/src/tree.ts:185](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L185)

##### rule

> **rule**: [`Rule`](@repo.randomart-engine-next.grammar.rules.registry.md#rule)

Defined in: [packages/randomart-engine-next/src/tree.ts:184](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L184)

##### seedText

> **seedText**: `string`

Defined in: [packages/randomart-engine-next/src/tree.ts:183](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L183)

***

### BuildTreeProps

> **BuildTreeProps** = `object`

Defined in: [packages/randomart-engine-next/src/tree.ts:58](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L58)

Options for [buildTree](#buildtree): the active rule and the depth/RNG hooks that shape the tree.

#### Properties

##### currentDepth?

> `optional` **currentDepth?**: `number`

Defined in: [packages/randomart-engine-next/src/tree.ts:62](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L62)

##### maxDepth

> **maxDepth**: `number`

Defined in: [packages/randomart-engine-next/src/tree.ts:60](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L60)

##### pickRng

> **pickRng**: (`depth`) => [`SeededRandom`](@repo.randomart-engine-next.prng.md#seededrandom)

Defined in: [packages/randomart-engine-next/src/tree.ts:61](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L61)

###### Parameters

###### depth

`number`

###### Returns

[`SeededRandom`](@repo.randomart-engine-next.prng.md#seededrandom)

##### rule

> **rule**: [`Rule`](@repo.randomart-engine-next.grammar.rules.registry.md#rule)

Defined in: [packages/randomart-engine-next/src/tree.ts:59](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L59)

##### seedText?

> `optional` **seedText?**: `string`

Defined in: [packages/randomart-engine-next/src/tree.ts:63](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L63)

***

### Node

> **Node** = `object`

Defined in: [packages/randomart-engine-next/src/tree.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L9)

A node in the expression tree — an operator id plus its resolved argument slots.

#### Properties

##### args

> `readonly` **args**: [`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`string`, [`Node`](#node) \| `number`\>

Defined in: [packages/randomart-engine-next/src/tree.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L11)

##### type

> `readonly` **type**: [`OperatorId`](@repo.randomart-engine-next.grammar.operators.registry.md#operatorid)

Defined in: [packages/randomart-engine-next/src/tree.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L10)

## Variables

### DEFAULT\_TERMINALS

> `const` **DEFAULT\_TERMINALS**: readonly \[\{ `arity`: `0`; `type`: `"x"`; `weight`: `1`; \}, \{ `arity`: `0`; `type`: `"y"`; `weight`: `1`; \}, \{ `arity`: `0`; `type`: `"const"`; `weight`: `0.5`; \}\]

Defined in: [packages/randomart-engine-next/src/tree.ts:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L21)

Zero-arity fallback pool used when a rule provides no terminals.

## Functions

### buildChannelTrees()

> **buildChannelTrees**(`__namedParameters`): `object`

Defined in: [packages/randomart-engine-next/src/tree.ts:192](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L192)

Grow the three R/G/B trees for a seed. Structural decisions come from a shared RNG, channel
variation from per-channel RNGs (or one shared RNG in `correlated` mode).

#### Parameters

##### \_\_namedParameters

[`BuildChannelTreesProps`](#buildchanneltreesprops)

#### Returns

`object`

##### treeB

> **treeB**: [`Node`](#node)

##### treeG

> **treeG**: [`Node`](#node)

##### treeR

> **treeR**: [`Node`](#node)

***

### buildTree()

> **buildTree**(`__namedParameters`): [`Node`](#node)

Defined in: [packages/randomart-engine-next/src/tree.ts:70](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L70)

Grow a single expression tree by weighted random selection from the rule's operator pool, forcing
terminals at `maxDepth` and operators below `rule.minDepth`.

#### Parameters

##### \_\_namedParameters

[`BuildTreeProps`](#buildtreeprops)

#### Returns

[`Node`](#node)

***

### evaluate()

> **evaluate**(`node`, `x`, `y`, `t?`): `number`

Defined in: [packages/randomart-engine-next/src/tree.ts:126](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L126)

Walk the tree on the CPU, returning the operator value at `(x, y, t)` in [-1, 1].

#### Parameters

##### node

[`Node`](#node)

##### x

`number`

##### y

`number`

##### t?

`number` = `0`

#### Returns

`number`

***

### toGLSL()

> **toGLSL**(`node`, `coordVar?`): `string`

Defined in: [packages/randomart-engine-next/src/tree.ts:140](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L140)

Compile the tree to a GLSL expression reading the coordinate variable `coordVar`.

#### Parameters

##### node

[`Node`](#node)

##### coordVar?

`string` = `'p'`

#### Returns

`string`

***

### toStructuredView()

> **toStructuredView**(`node`): [`TreeView`](@repo.randomart-engine-next.format.md#treeview)

Defined in: [packages/randomart-engine-next/src/tree.ts:153](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/tree.ts#L153)

Convert the tree into a nested [TreeView](@repo.randomart-engine-next.format.md#treeview) for rendering as text.

#### Parameters

##### node

[`Node`](#node)

#### Returns

[`TreeView`](@repo.randomart-engine-next.format.md#treeview)
