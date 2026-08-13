---
title: cpu/engine
package: "@repo/automa-engine"
kind: module
module: cpu/engine
---

## Functions

### evolve()

> **evolve**(`rule`, `current`, `next`, `cols`, `rows`): `void`

Defined in: [packages/automa-engine/src/cpu/engine.ts:37](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/cpu/engine.ts#L37)

Advances a grid simulation by one step using CPU evaluation according to the provided Rule.

#### Parameters

##### rule

[`Rule`](@repo.automa-engine.rules.registry.md#rule)

Active B/S rule specification.

##### current

`Uint8Array`

Current grid state buffer.

##### next

`Uint8Array`

Target buffer for the evolved step.

##### cols

`number`

Number of columns.

##### rows

`number`

Number of rows.

#### Returns

`void`
