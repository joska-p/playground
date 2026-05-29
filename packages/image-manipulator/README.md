# @repo/image-manipulator

> Fluent pixel-manipulation pipeline for the browser. Build image-processing effects by chaining small, testable `PixelCallback` functions into a single loop pass over the image data.

## Quick usage

```ts
import { manipulate } from "@repo/image-manipulator";
import { grayscale, brightness } from "@repo/image-manipulator";
import { imageElementToImageData, putImageData } from "@repo/image-manipulator";

const source = imageElementToImageData(img);

const result = manipulate(source)
  .apply(grayscale())
  .apply(brightness(1.3))
  .toImageData();

putImageData(canvas, result);
```

---

Full reference: [Image Manipulator](/docs/reference/packages/image-manipulator/)

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_
