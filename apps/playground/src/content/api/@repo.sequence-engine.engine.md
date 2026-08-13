---
title: engine
package: "@repo/sequence-engine"
kind: module
module: engine
---

## Type Aliases

### GenerateSequenceOptions

> **GenerateSequenceOptions** = `object`

Defined in: [engine.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/engine.ts#L4)

Options for generating a sequence.

#### Properties

##### seed?

> `optional` **seed?**: `string`

Defined in: [engine.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/engine.ts#L10)

Optional random seed passed to rules supporting seed determinism.

##### sequenceRule

> **sequenceRule**: [`SequenceRule`](@repo.sequence-engine.rules.types.md#sequencerule)

Defined in: [engine.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/engine.ts#L6)

The sequence rule to evaluate step-by-step.

##### steps

> **steps**: `number`

Defined in: [engine.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/engine.ts#L8)

Number of terms to generate.

## Functions

### generateSequence()

> **generateSequence**(`options`): `number`[]

Defined in: [engine.ts:19](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/engine.ts#L19)

Generates a sequence of numbers by evaluating a sequence rule in sequence.

#### Parameters

##### options

[`GenerateSequenceOptions`](#generatesequenceoptions)

Configuration containing the rule, step count, and optional seed.

#### Returns

`number`[]

An array of numbers starting from 0.
