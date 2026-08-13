---
title: manipulations/manifest (internal)
package: "@repo/pixel-engine"
kind: internal
module: manipulations/manifest
---

## Type Aliases

### ManipulationLookup

> **ManipulationLookup** = `{ [Manipulation in typeof ALL_MANIPULATIONS[number] as Manipulation["id"]]: Manipulation["options"] }`

Defined in: [packages/pixel-engine/src/manipulations/manifest.ts:47](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/manipulations/manifest.ts#L47)

***

### ResizeOptions

> **ResizeOptions** = \{ `fit?`: `never`; `height?`: `never`; `maximumPixels?`: `never`; `width`: `number`; \} \| \{ `fit?`: `never`; `height`: `number`; `maximumPixels?`: `never`; `width?`: `never`; \} \| \{ `fit?`: `"fill"` \| `"cover"` \| `"contain"`; `height`: `number`; `maximumPixels?`: `never`; `width`: `number`; \} \| \{ `fit?`: `never`; `height?`: `never`; `maximumPixels`: `number`; `width?`: `never`; \}

Defined in: [packages/pixel-engine/src/manipulations/whole/resize.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/pixel-engine/src/manipulations/whole/resize.ts#L4)
