# @repo/palette-generator

Interactive 2D color space slice picker. Renders a fixed-lightness slice of any color space as a canvas where x/y axes map to the color space parameters, and clicking picks a color.

## Architecture

```
src/
  utils/
    imageFill.ts       — Generic pixel-iteration engine
    color-utils.ts     — OKLab/OKLCH ↔ sRGB math
    colorspaces.ts     — Color space definitions
    canvasDpr.ts       — DPR-aware canvas helpers
  hooks/
    useCanvasSlice.ts  — Generic canvas slice hook
  components/controls/
    Slice.tsx           — Generic slice component
    index.tsx           — Controls parent
```

The key abstraction is **`ColorSpaceDef`** — a config object that describes how to render a 2D slice of a color space:

```
x → param1   (range [-rangeX, +rangeX])
y → param2   (range [-rangeY, +rangeY], top = positive)
color = convert(L, param1, param2)
```

## Usage

```tsx
import Slice from "./Slice";
import { oklab, oklch } from "../../utils/colorspaces";

<Slice colorSpace={oklab} displaySize={400} onPick={(c) => console.log(c.hex)} />
<Slice colorSpace={oklch} displaySize={400} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colorSpace` | `ColorSpaceDef` | required | Color space definition |
| `displaySize` | `number` | `512` | Canvas size in CSS pixels |
| `onPick` | `(PickResult) => void` | — | Called on canvas click |
| `className` | `string` | — | Extra CSS classes |

### PickResult

```ts
{ oklab: string; hex: string; rgb: [number, number, number] }
```

## Adding a new color space

Define a `ColorSpaceDef` in `src/utils/colorspaces.ts`:

```ts
import { myColorTo8bit } from "./color-utils";

export const myColorSpace = {
  id: "mycolor",
  name: "MyColor",
  xLabel: "hue",
  yLabel: "saturation",
  xRangeKey: "hueRange",
  yRangeKey: "satRange",
  lightnessKey: "lightness",
  defaultParams: { lightness: 0.5, hueRange: 360, satRange: 100 },
  sliders: [
    { key: "lightness", label: "Lightness", min: 0, max: 1, step: 0.01 },
  ],
  toRGB: myColorTo8bit,
  toCSS: (l, hue, sat) => `mycolor(${l} ${hue} ${sat})`,
};
```

Then use it anywhere:

```tsx
<Slice colorSpace={myColorSpace} />
```

No new hooks, components, or files needed.

## Color space requirements

- The slice is always at a fixed lightness (or equivalent achromatic parameter)
- The x-axis maps to one parameter (signed range `[-range, +range]`)
- The y-axis maps to another parameter (signed range `[-range, +range]`, top is positive)
- `toRGB` receives `(lightness, xVal, yVal)` and returns 8-bit `[r, g, b]`
- `toCSS` receives the same and returns a CSS color string

If your color space doesn't fit this model (e.g. a 3D cube), define a custom component instead.
