---
title: hooks/usePixel
package: "@repo/pixel"
kind: module
module: hooks/usePixel
---

## Modules

- [\<internal\>](@repo.pixel.hooks.usePixel.<internal>.md)

## Functions

### usePixel()

> **usePixel**(`sourceImageData`, `steps`): [`ImageData`](@repo.pixel.hooks.usePixel.<internal>.md#imagedata)[]

Defined in: [packages/pixel/src/hooks/usePixel.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel/src/hooks/usePixel.ts#L9)

Runs `steps` against `sourceImageData` whenever either changes, resolving with one `ImageData`
snapshot per step. Returns `[]` until the first result.

#### Parameters

##### sourceImageData

[`ImageData`](@repo.pixel.hooks.usePixel.<internal>.md#imagedata) \| `null`

##### steps

readonly `object`[]

#### Returns

[`ImageData`](@repo.pixel.hooks.usePixel.<internal>.md#imagedata)[]
