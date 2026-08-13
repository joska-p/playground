---
title: types
package: "@repo/palette-engine"
kind: module
module: types
---

## Type Aliases

### Palette

> **Palette** = `object`

Defined in: [packages/palette-engine/src/types.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/palette-engine/src/types.ts#L4)

A derived color palette wrapping an array of computed colors.

#### Properties

##### colors

> **colors**: [`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)[]

Defined in: [packages/palette-engine/src/types.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/palette-engine/src/types.ts#L6)

The computed colors comprising the palette.

***

### Rule

> **Rule** = `object`

Defined in: [packages/palette-engine/src/types.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/palette-engine/src/types.ts#L10)

A color harmony rule contract defining an application function and metadata.

#### Properties

##### apply

> **apply**: (`color`) => [`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)[]

Defined in: [packages/palette-engine/src/types.ts:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/palette-engine/src/types.ts#L12)

Generates derived colors from a base color.

###### Parameters

###### color

[`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

###### Returns

[`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)[]

##### info

> **info**: `object`

Defined in: [packages/palette-engine/src/types.ts:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/palette-engine/src/types.ts#L14)

Display information for the harmony rule.

###### description

> **description**: `string`

###### name

> **name**: `string`
