---
title: render/cpu-renderer
package: "@repo/randomart-engine"
kind: module
module: render/cpu-renderer
---

## Functions

### renderTreesToBuffer()

> **renderTreesToBuffer**(`treeR`, `treeG`, `treeB`, `size`, `time?`): `Uint8ClampedArray`

Defined in: [packages/randomart-engine/src/render/cpu-renderer.ts:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/render/cpu-renderer.ts#L14)

Renders the three channel trees into an RGBA pixel buffer, evaluating every pixel on the CPU.
Expression values in [-1, 1] map to 8-bit channels, mirroring the GLSL shader's normalization.

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

`Uint8ClampedArray`
