---
title: hooks/usePixel (internal)
package: "@repo/pixel"
kind: internal
module: hooks/usePixel
---

## Interfaces

### ImageData

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22784

The **`ImageData`** interface represents the underlying pixel data of an area of a <canvas> element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData)

#### Properties

##### colorSpace

> `readonly` **colorSpace**: [`PredefinedColorSpace`](#predefinedcolorspace)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22790

The read-only **`ImageData.colorSpace`** property is a string indicating the color space of the image data.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/colorSpace)

##### data

> `readonly` **data**: [`ImageDataArray`](#imagedataarray)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22796

The readonly **`ImageData.data`** property returns a Uint8ClampedArray or Float16Array that contains the ImageData object's pixel data. Data is stored as a one-dimensional array in the RGBA order.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/data)

##### height

> `readonly` **height**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22802

The readonly **`ImageData.height`** property returns the number of rows in the ImageData object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/height)

##### width

> `readonly` **width**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22808

The readonly **`ImageData.width`** property returns the number of pixels per row in the ImageData object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/width)

***

### ImageDataSettings

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1297

#### Properties

##### colorSpace?

> `optional` **colorSpace?**: [`PredefinedColorSpace`](#predefinedcolorspace)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1298

##### pixelFormat?

> `optional` **pixelFormat?**: [`ImageDataPixelFormat`](#imagedatapixelformat)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1299

## Type Aliases

### ImageDataArray

> **ImageDataArray** = `Uint8ClampedArray`\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44206

***

### ImageDataPixelFormat

> **ImageDataPixelFormat** = `"rgba-float16"` \| `"rgba-unorm8"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44350

***

### PredefinedColorSpace

> **PredefinedColorSpace** = `"display-p3"` \| `"srgb"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44396

## Variables

### ImageData

> **ImageData**: \{(`sw`, `sh`, `settings?`): [`ImageData`](#imagedata); (`data`, `sw`, `sh?`, `settings?`): [`ImageData`](#imagedata); `prototype`: [`ImageData`](#imagedata); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22784

#### Type Declaration

#### Call Signature

> **new ImageData**(`sw`, `sh`, `settings?`): [`ImageData`](#imagedata)

##### Parameters

###### sw

`number`

###### sh

`number`

###### settings?

[`ImageDataSettings`](#imagedatasettings)

##### Returns

[`ImageData`](#imagedata)

#### Call Signature

> **new ImageData**(`data`, `sw`, `sh?`, `settings?`): [`ImageData`](#imagedata)

##### Parameters

###### data

[`ImageDataArray`](#imagedataarray)

###### sw

`number`

###### sh?

`number`

###### settings?

[`ImageDataSettings`](#imagedatasettings)

##### Returns

[`ImageData`](#imagedata)

##### prototype

> **prototype**: [`ImageData`](#imagedata)
