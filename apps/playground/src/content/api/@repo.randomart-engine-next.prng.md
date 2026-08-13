---
title: prng
package: "@repo/randomart-engine-next"
kind: module
module: prng
---

## Classes

### SeededRandom

Defined in: [packages/randomart-engine-next/src/prng.ts:31](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L31)

A deterministic number/byte generator seeded from a string.

`next()` returns a float in [0, 1); `nextByte()` returns an int in [0, 255]; `nextInt(n)` returns
an int in [0, n). The sequence is fully determined by the seed string, matching the
reproducibility requirement of hash visualization.

#### Constructors

##### Constructor

> **new SeededRandom**(`seed`): [`SeededRandom`](#seededrandom)

Defined in: [packages/randomart-engine-next/src/prng.ts:34](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L34)

###### Parameters

###### seed

`string`

###### Returns

[`SeededRandom`](#seededrandom)

#### Methods

##### next()

> **next**(): `number`

Defined in: [packages/randomart-engine-next/src/prng.ts:41](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L41)

Mulberry32 step -> float in [0, 1).

###### Returns

`number`

##### nextByte()

> **nextByte**(): `number`

Defined in: [packages/randomart-engine-next/src/prng.ts:55](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L55)

Integer in [0, 255].

###### Returns

`number`

##### nextInt()

> **nextInt**(`n`): `number`

Defined in: [packages/randomart-engine-next/src/prng.ts:50](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L50)

Integer in [0, n).

###### Parameters

###### n

`number`

###### Returns

`number`

##### nextRange()

> **nextRange**(`min`, `max`): `number`

Defined in: [packages/randomart-engine-next/src/prng.ts:60](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L60)

Float in [min, max).

###### Parameters

###### min

`number`

###### max

`number`

###### Returns

`number`

## Type Aliases

### DualRng

> **DualRng** = `object`

Defined in: [packages/randomart-engine-next/src/prng.ts:71](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L71)

A pair of structure and channel RNGs for correlated-but-varied generation.

The structure RNG drives tree-shape decisions that should be consistent across R/G/B channels;
the channel RNGs provide per-channel variation.

#### Properties

##### channels

> **channels**: \[[`SeededRandom`](#seededrandom), [`SeededRandom`](#seededrandom), [`SeededRandom`](#seededrandom)\]

Defined in: [packages/randomart-engine-next/src/prng.ts:73](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L73)

##### structure

> **structure**: [`SeededRandom`](#seededrandom)

Defined in: [packages/randomart-engine-next/src/prng.ts:72](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L72)

## Functions

### createCorrelatedRng()

> **createCorrelatedRng**(`seedText`): [`DualRng`](#dualrng)

Defined in: [packages/randomart-engine-next/src/prng.ts:99](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L99)

Create dual RNGs for fully-correlated generation.

All three channels share one RNG instance so structural decisions are identical across R/G/B —
the channels diverge only because the expression tree is built as separate instances.

#### Parameters

##### seedText

`string`

#### Returns

[`DualRng`](#dualrng)

***

### createDualRng()

> **createDualRng**(`seedText`, `maxDepth`): [`DualRng`](#dualrng)

Defined in: [packages/randomart-engine-next/src/prng.ts:82](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L82)

Create dual RNGs for uncorrelated (per-channel) generation.

The structure RNG is seeded independently from each channel RNG so that structural decisions vary
across seeds but stay consistent across channels within a single seed.

#### Parameters

##### seedText

`string`

##### maxDepth

`number`

#### Returns

[`DualRng`](#dualrng)

***

### seededShuffle()

> **seededShuffle**\<`T`\>(`arr`, `seedText`): `T`[]

Defined in: [packages/randomart-engine-next/src/prng.ts:110](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/prng.ts#L110)

Deterministic Fisher-Yates shuffle using a separate mini-LCG.

This does NOT consume from any [SeededRandom](#seededrandom) instance, so callers can shuffle operator
lists (or anything else) without affecting the main RNG stream used for tree generation.

#### Type Parameters

##### T

`T`

#### Parameters

##### arr

readonly `T`[]

##### seedText

`string`

#### Returns

`T`[]
