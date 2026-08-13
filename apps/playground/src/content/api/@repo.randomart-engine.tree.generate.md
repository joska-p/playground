---
title: tree/generate
package: "@repo/randomart-engine"
kind: module
module: tree/generate
---

## Type Aliases

### TreeConfig

> **TreeConfig** = `object`

Defined in: [packages/randomart-engine/src/tree/generate.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L7)

Options controlling tree generation.

#### Properties

##### correlated

> **correlated**: `boolean`

Defined in: [packages/randomart-engine/src/tree/generate.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L11)

##### enabledRuleIds

> **enabledRuleIds**: [`RuleId`](@repo.randomart-engine.types.md#ruleid-1)[]

Defined in: [packages/randomart-engine/src/tree/generate.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L10)

##### maxDepth

> **maxDepth**: `number`

Defined in: [packages/randomart-engine/src/tree/generate.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L9)

##### ruleWeights

> **ruleWeights**: [`RuleWeights`](@repo.randomart-engine.types.md#ruleweights)

Defined in: [packages/randomart-engine/src/tree/generate.ts:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L12)

##### seedText

> **seedText**: `string`

Defined in: [packages/randomart-engine/src/tree/generate.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L8)

***

### TreeOutput

> **TreeOutput** = `object`

Defined in: [packages/randomart-engine/src/tree/generate.ts:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L16)

The generated per-channel trees plus the PRNG instances that produced them.

#### Properties

##### rngB

> **rngB**: [`SeededRandom`](@repo.randomart-engine.random.SeededRandom.md#seededrandom)

Defined in: [packages/randomart-engine/src/tree/generate.ts:22](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L22)

##### rngG

> **rngG**: [`SeededRandom`](@repo.randomart-engine.random.SeededRandom.md#seededrandom)

Defined in: [packages/randomart-engine/src/tree/generate.ts:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L21)

##### rngR

> **rngR**: [`SeededRandom`](@repo.randomart-engine.random.SeededRandom.md#seededrandom)

Defined in: [packages/randomart-engine/src/tree/generate.ts:20](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L20)

##### treeB

> **treeB**: [`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

Defined in: [packages/randomart-engine/src/tree/generate.ts:19](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L19)

##### treeG

> **treeG**: [`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

Defined in: [packages/randomart-engine/src/tree/generate.ts:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L18)

##### treeR

> **treeR**: [`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

Defined in: [packages/randomart-engine/src/tree/generate.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L17)

## Functions

### generateTrees()

> **generateTrees**(`config`): [`TreeOutput`](#treeoutput)

Defined in: [packages/randomart-engine/src/tree/generate.ts:40](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/tree/generate.ts#L40)

Generates one expression tree per color channel from a seed string. In correlated mode all
channels share a single PRNG stream; otherwise each channel gets its own PRNG, which produces
visibly different art for the same seed.

#### Parameters

##### config

[`TreeConfig`](#treeconfig)

#### Returns

[`TreeOutput`](#treeoutput)

#### Example

```ts
    const { treeR, treeG, treeB } = generateTrees({
        seedText: 'hello world',
        maxDepth: 8,
        enabledRuleIds: ['x', 'y', 'sin', 'cos', 'add', 'constant'],
        correlated: false
    });
    ```;
