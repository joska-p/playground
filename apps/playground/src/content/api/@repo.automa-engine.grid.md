---
title: grid
package: "@repo/automa-engine"
kind: module
module: grid
---

## Type Aliases

### Grid

> **Grid** = `Uint8Array`

Defined in: [packages/automa-engine/src/grid.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/grid.ts#L4)

Cellular automaton grid represented as a flat Uint8Array buffer.

## Functions

### createGrid()

> **createGrid**(`rows`, `cols`): [`Grid`](#grid)

Defined in: [packages/automa-engine/src/grid.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/grid.ts#L7)

Allocates a new empty grid buffer of dimensions rows × cols.

#### Parameters

##### rows

`number`

##### cols

`number`

#### Returns

[`Grid`](#grid)

***

### seedGrid()

> **seedGrid**(`grid`, `density`, `seed`): `void`

Defined in: [packages/automa-engine/src/grid.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/grid.ts#L10)

Seeds a grid buffer deterministically with live cells based on density and seed.

#### Parameters

##### grid

[`Grid`](#grid)

##### density

`number`

##### seed

`number`

#### Returns

`void`
