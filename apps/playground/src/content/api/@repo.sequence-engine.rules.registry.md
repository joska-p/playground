---
title: rules/registry
package: "@repo/sequence-engine"
kind: module
module: rules/registry
---

## Modules

- [\<internal\>](@repo.sequence-engine.rules.registry.<internal>.md)

## Type Aliases

### RuleId

> **RuleId** = *typeof* [`initialRules`](@repo.sequence-engine.rules.registry.<internal>.md#initialrules)\[`number`\]\[`"id"`\]

Defined in: [rules/registry.ts:27](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/registry.ts#L27)

Union of all initial rule ID string literals.

***

### RuleName

> **RuleName** = *typeof* [`initialRules`](@repo.sequence-engine.rules.registry.<internal>.md#initialrules)\[`number`\]\[`"name"`\]

Defined in: [rules/registry.ts:30](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/registry.ts#L30)

Union of all initial rule display names.

## Variables

### allRules

> `const` **allRules**: [`SequenceRule`](@repo.sequence-engine.rules.types.md#sequencerule)[]

Defined in: [rules/registry.ts:34](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/registry.ts#L34)

Global registry of available sequence rules.

## Functions

### registerRule()

> **registerRule**(`rule`): `void`

Defined in: [rules/registry.ts:41](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/registry.ts#L41)

Registers a new sequence rule into the global rule registry.

#### Parameters

##### rule

[`SequenceRule`](@repo.sequence-engine.rules.types.md#sequencerule)

The sequence rule to add.

#### Returns

`void`
