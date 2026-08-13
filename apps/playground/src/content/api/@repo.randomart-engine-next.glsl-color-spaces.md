---
title: glsl-color-spaces
package: "@repo/randomart-engine-next"
kind: module
module: glsl-color-spaces
---

## Type Aliases

### ColorSpaceId

> **ColorSpaceId** = `"srgb"` \| `"oklch"` \| `"oklab"` \| `"hsl"`

Defined in: [packages/randomart-engine-next/src/glsl-color-spaces.ts:2](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-color-spaces.ts#L2)

The color space the compiled shader interprets its expression value in.

## Functions

### getColorSpaceGlslFunction()

> **getColorSpaceGlslFunction**(`colorSpace`): `string`

Defined in: [packages/randomart-engine-next/src/glsl-color-spaces.ts:94](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-color-spaces.ts#L94)

The GLSL conversion function source for a color space, or '' for `srgb`.

#### Parameters

##### colorSpace

[`ColorSpaceId`](#colorspaceid)

#### Returns

`string`

***

### wrapWithColorSpaceConversion()

> **wrapWithColorSpaceConversion**(`rawExpr`, `colorSpace`): `string`

Defined in: [packages/randomart-engine-next/src/glsl-color-spaces.ts:65](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-color-spaces.ts#L65)

Wrap a raw GLSL color expression so it lands in `color`, converting from the given color space to
sRGB when needed.

#### Parameters

##### rawExpr

`string`

##### colorSpace

[`ColorSpaceId`](#colorspaceid)

#### Returns

`string`
