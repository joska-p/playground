---
title: png-export
package: "@repo/randomart-engine"
kind: module
module: png-export
---

## Modules

- [\<internal\>](@repo.randomart-engine.png-export.<internal>.md)

## Functions

### renderTreesToPngBlob()

> **renderTreesToPngBlob**(`treeR`, `treeG`, `treeB`, `size`, `time?`): [`Blob`](@repo.randomart-engine.png-export.<internal>.md#blob-1)

Defined in: [packages/randomart-engine/src/png-export.ts:31](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/png-export.ts#L31)

Renders the three channel trees to a `Blob` of MIME type `image/png`, ready for display or
download.

#### Parameters

##### treeR

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### treeG

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### treeB

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### size

`number`

##### time?

`number` = `0`

#### Returns

[`Blob`](@repo.randomart-engine.png-export.<internal>.md#blob-1)

***

### renderTreesToPngBuffer()

> **renderTreesToPngBuffer**(`treeR`, `treeG`, `treeB`, `size`, `time?`): `Uint8Array`

Defined in: [packages/randomart-engine/src/png-export.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/png-export.ts#L9)

Renders the three channel trees to an encoded PNG (`Uint8Array`), ready for disk or for wrapping
in a `Blob`.

#### Parameters

##### treeR

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### treeG

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### treeB

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### size

`number`

##### time?

`number` = `0`

#### Returns

`Uint8Array`
