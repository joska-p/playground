---
title: compileToGLSL
package: "@repo/randomart-engine-next"
kind: module
module: compileToGLSL
---

## Type Aliases

### CompileToShaderProps

> **CompileToShaderProps** = `object`

Defined in: [packages/randomart-engine-next/src/compileToGLSL.ts:86](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/compileToGLSL.ts#L86)

Options for [compileToShader](#compiletoshader): the seed, the three trees, behaviors, and color space.

#### Properties

##### behaviors?

> `optional` **behaviors?**: [`Behavior`](@repo.randomart-engine-next.behaviors.registry.md#behavior)[]

Defined in: [packages/randomart-engine-next/src/compileToGLSL.ts:91](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/compileToGLSL.ts#L91)

##### colorSpace?

> `optional` **colorSpace?**: [`ColorSpaceId`](@repo.randomart-engine-next.glsl-color-spaces.md#colorspaceid)

Defined in: [packages/randomart-engine-next/src/compileToGLSL.ts:92](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/compileToGLSL.ts#L92)

##### seedText

> **seedText**: `string`

Defined in: [packages/randomart-engine-next/src/compileToGLSL.ts:87](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/compileToGLSL.ts#L87)

##### treeB

> **treeB**: [`Node`](@repo.randomart-engine-next.tree.md#node)

Defined in: [packages/randomart-engine-next/src/compileToGLSL.ts:90](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/compileToGLSL.ts#L90)

##### treeG

> **treeG**: [`Node`](@repo.randomart-engine-next.tree.md#node)

Defined in: [packages/randomart-engine-next/src/compileToGLSL.ts:89](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/compileToGLSL.ts#L89)

##### treeR

> **treeR**: [`Node`](@repo.randomart-engine-next.tree.md#node)

Defined in: [packages/randomart-engine-next/src/compileToGLSL.ts:88](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/compileToGLSL.ts#L88)

## Functions

### compileToShader()

> **compileToShader**(`__namedParameters`): `string`

Defined in: [packages/randomart-engine-next/src/compileToGLSL.ts:99](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/compileToGLSL.ts#L99)

Compile the three channel trees into a self-contained GLSL ES 3.0 fragment shader, injecting
behavior code, color-space conversion, and the resolved noise helper functions.

#### Parameters

##### \_\_namedParameters

[`CompileToShaderProps`](#compiletoshaderprops)

#### Returns

`string`
