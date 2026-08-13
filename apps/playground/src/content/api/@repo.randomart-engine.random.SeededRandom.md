---
title: random/SeededRandom
package: "@repo/randomart-engine"
kind: module
module: random/SeededRandom
---

## Classes

### SeededRandom

Defined in: [packages/randomart-engine/src/random/SeededRandom.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/random/SeededRandom.ts#L7)

A deterministic seeded PRNG (Mulberry32) that reproduces the same sequence of values for the same
seed string — the engine's source of reproducible variety.

#### Constructors

##### Constructor

> **new SeededRandom**(`seedString`): [`SeededRandom`](#seededrandom)

Defined in: [packages/randomart-engine/src/random/SeededRandom.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/random/SeededRandom.ts#L17)

Creates a PRNG from a seed string; the same string always yields the same sequence.

###### Parameters

###### seedString

`string`

###### Returns

[`SeededRandom`](#seededrandom)

#### Properties

##### choiceHistory

> **choiceHistory**: `number`[] = `[]`

Defined in: [packages/randomart-engine/src/random/SeededRandom.ts:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/random/SeededRandom.ts#L14)

The most recent values produced by [next](#next), capped at a fixed limit.

##### initialHash

> `readonly` **initialHash**: `number`

Defined in: [packages/randomart-engine/src/random/SeededRandom.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/random/SeededRandom.ts#L11)

Hash of the seed string, stable across runs.

#### Methods

##### next()

> **next**(): `number`

Defined in: [packages/randomart-engine/src/random/SeededRandom.ts:30](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/random/SeededRandom.ts#L30)

Returns the next pseudorandom float in [0, 1).

###### Returns

`number`
