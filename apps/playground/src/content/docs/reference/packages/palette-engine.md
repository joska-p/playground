---
title: 'PaletteEngine'
description: 'A pure engine that maps a base color to harmonious palettes — four color spaces, four harmony rules, no UI, no rendering, no opinions about how the result should be shown.'
category: 'reference'
tags:
  - reference
  - palette-engine
order: 20
---

# @repo/palette-engine

---

## Essence

Palette Engine is the logic half of a two-package color palette system.
It defines color spaces as navigable 2D canvases with a third-axis
slider, and harmony rules as functions that take a base color and return
an array of derived colors. All React UI, canvas painting, and state
management lives in
[`@repo/palette-generator`](/docs/reference/packages/palette-generator).

The interesting tension is between _perceptual uniformity_ and _practical
intuition_. The engine offers four color spaces — OKLab, OKLCh, HSL,
and sRGB — each mapping a three-dimensional color cube onto a 2D canvas
with a slider. OKLab and OKLCh are perceptually uniform: equal steps in
any axis produce equal perceived changes. HSL and sRGB are familiar but
uneven: the same numerical step in saturation at low lightness produces a
different perceptual shift than at high lightness. Offering both lets the
user choose between mathematical correctness and muscle memory.

The harmony rules are built on OKLCh — all four convert the base color
into OKLCh space before manipulating hue, chroma, and lightness. This
means the rules operate in a perceptually uniform space regardless of
which color space the user picked the base color from. A complementary
flip of 180° in OKLCh feels balanced; the same angle in HSL can feel
lopsided. The rule is a simple contract: `apply(color) → Color[]`. No
class hierarchy, no strategy pattern, no configuration — just a function
that returns six colors.

The `Palette` type wraps a `Color[]`, and `generatePalette` is a thin
delegation layer: it calls `rule.apply(baseColor)` and wraps the result.
The engine's job is to produce the palette; what happens to it is
someone else's problem.

## Quick Launch

```bash
pnpm add @repo/palette-engine
```

```ts
import { colorSpaces } from '@repo/palette-engine/colorSpaces';
import { generatePalette } from '@repo/palette-engine/generatePalette';
import { analogous } from '@repo/palette-engine/rules/analogous';
import type { Palette, Rule } from '@repo/palette-engine/types';

const base = new Color('oklch', [0.7, 0.1, 196]);
const palette: Palette = generatePalette(base, analogous);
// { colors: [Color, Color, Color, Color, Color, Color] }
```

## Field Notes

- **The Catalyst:** The observation that color harmony rules are
  mathematically simple but practically hard to explore. A complementary
  palette is just a 180° hue shift, but _seeing_ it requires rendering
  swatches across lightness and chroma variations. The engine separates
  the "what colors go together" logic from the "how do I pick a base
  color" experience, so each can evolve independently. The rules live
  in OKLCh because it's the most perceptually uniform space with a
  cylindrical layout — hue is an angle, chroma is a radius, lightness
  is a linear axis — which makes harmony rules feel geometrically
  natural.

- **Quirks & Anomalies:** Every harmony rule returns exactly 6 colors.
  This isn't a constraint of the math — analogous could produce 3 or 9,
  complementary could produce 2 or 12 — but it's a deliberate
  design choice: 6 colors per palette gives enough variation for
  exploration without overwhelming the display. The monochromatic rule
  also reduces chroma by 20% for very light (L > 0.8) and very dark
  (L < 0.3) colors, which is a perceptual correction, not a mathematical
  necessity — pure lightness steps in OKLCh can produce oversaturated
  pastels at the extremes. The `Palette` type is just `{ colors: Color[] }`,
  which is almost suspiciously thin for a named type. The point is that
  the engine doesn't prescribe what a palette _is_ — it just hands back
  the colors.

- **Future Horizons:** Custom rules that take parameters — an analogous
  rule with configurable hue offset, a complementary rule with adjustable
  lightness spread. Gradient generation: interpolating between palette
  colors to produce smooth transitions. Named palettes that combine a
  base color, a rule, and a name — "Sunset", "Ocean", "Forest" — stored
  as presets. A rule composition API that chains two rules, feeding the
  output of one into the other.

---

## Color Spaces

Each color space is defined as a `ColorSpaceDef` — a 2D canvas
with a third-axis slider:

| Space | Canvas (X × Y)                  | Slider (Z) | Character                                |
| :---- | :------------------------------ | :--------- | :--------------------------------------- |
| OKLab | a (green-red) × b (blue-yellow) | Lightness  | Perceptually uniform, device-independent |
| OKLCh | Chroma × Hue                    | Lightness  | Cylindrical OKLab — hue as angle         |
| HSL   | Hue × Saturation                | Lightness  | Familiar, perceptually uneven            |
| sRGB  | Red × Green                     | Blue       | Raw channel values — direct, intuitive   |

All spaces depend on `colorjs.io` for `Color` construction and space
conversion. The engine's only dependency.

## Harmony Rules

All rules operate in OKLCh space, producing 6 colors per call:

| Rule            | Mechanism                                                    |
| :-------------- | :----------------------------------------------------------- |
| `analogous`     | ±30° hue shift, base + light variant for each                |
| `complementary` | 180° flip, base/complement each with light and dark variants |
| `monochromatic` | 6 lightness steps, chroma dampened at extremes               |
| `triadic`       | 120° spacing, base + lightness variant for each hue          |

---

_See [@repo/palette-generator](/docs/reference/packages/palette-generator) for the React UI layer, color-space canvases, and interactive controls._

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
