# @repo/image-manipulator

> Composable pixel-manipulation pipeline for the browser. Build image-processing effects by chaining small, testable `PixelCallback` functions into a single loop pass over the image data.

## Install

```bash
pnpm add @repo/image-manipulator
```

## Quick usage

```tsx
import { ImageManipulator } from "@repo/image-manipulator";

function App() {
  return <ImageManipulator />;
}
```

Or use the pipeline directly:

```ts
import { pipe, grayscale, brightness } from "@repo/image-manipulator";
import { imageElementToImageData, putImageData } from "@repo/image-manipulator";

const result = pipe(grayscale(), brightness(1.3))(imageElementToImageData(img));
putImageData(canvas, result);
```

---

Full reference: [Image Manipulator](/docs/reference/packages/image-manipulator/)

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_
