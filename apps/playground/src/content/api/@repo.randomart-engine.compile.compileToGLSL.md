---
title: compile/compileToGLSL
package: "@repo/randomart-engine"
kind: module
module: compile/compileToGLSL
---

## Functions

### compileToGLSL()

> **compileToGLSL**(`treeR`, `treeG`, `treeB`, `behaviors`): `string`

Defined in: [packages/randomart-engine/src/compile/compileToGLSL.ts:81](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/compile/compileToGLSL.ts#L81)

Compiles three expression trees (R, G, B channels) plus animation behaviors into a complete WebGL
2 fragment shader string, ready for `gl.compileShader()`.

#### Parameters

##### treeR

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### treeG

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### treeB

[`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode)

##### behaviors

[`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)[]

#### Returns

`string`

#### Example

```ts
    const shader = compileToGLSL(treeR, treeG, treeB, [zoomBehavior]);
    ```;
