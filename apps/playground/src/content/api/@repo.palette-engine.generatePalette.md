---
title: generatePalette
package: "@repo/palette-engine"
kind: module
module: generatePalette
---

## Functions

### generatePalette()

> **generatePalette**(`baseColor`, `rule`): [`Palette`](@repo.palette-engine.types.md#palette)

Defined in: [packages/palette-engine/src/generatePalette.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/palette-engine/src/generatePalette.ts#L11)

Generates a color palette by applying a harmony rule to a base color.

#### Parameters

##### baseColor

[`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

The starting base color.

##### rule

[`Rule`](@repo.palette-engine.types.md#rule)

The harmony rule to apply.

#### Returns

[`Palette`](@repo.palette-engine.types.md#palette)

A computed palette object containing derived colors.
