---
title: colorSpaces
package: "@repo/palette-engine"
kind: module
module: colorSpaces
---

## Modules

- [\<internal\>](@repo.palette-engine.colorSpaces.<internal>.md)

## Type Aliases

### ColorSpacesKey

> **ColorSpacesKey** = keyof *typeof* [`colorSpaces`](#colorspaces)

Defined in: [packages/palette-engine/src/colorSpaces.ts:59](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/palette-engine/src/colorSpaces.ts#L59)

Valid color space key names.

## Variables

### colorSpaces

> `const` **colorSpaces**: `object`

Defined in: [packages/palette-engine/src/colorSpaces.ts:56](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/palette-engine/src/colorSpaces.ts#L56)

Registry of supported 3D color space definitions (OKLab, OKLCh, HSL, sRGB).

#### Type Declaration

##### hsl

> **hsl**: [`ColorSpaceDef`](@repo.palette-engine.colorSpaces.<internal>.md#colorspacedef)

##### oklab

> **oklab**: [`ColorSpaceDef`](@repo.palette-engine.colorSpaces.<internal>.md#colorspacedef)

##### oklch

> **oklch**: [`ColorSpaceDef`](@repo.palette-engine.colorSpaces.<internal>.md#colorspacedef)

##### srgb

> **srgb**: [`ColorSpaceDef`](@repo.palette-engine.colorSpaces.<internal>.md#colorspacedef)
