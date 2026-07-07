---
title: PaletteEngine
description: Color space definitions and harmony rule engine. Pure TypeScript, no React — used by `@repo/palette-generator`.
tags:
  - reference
  - palette-engine
order: 20
---

# @repo/palette-engine

## Exports

| Export             | Description                               |
| ------------------ | ----------------------------------------- |
| `colorSpaces`      | OKLab, OKLCh, HSL, sRGB space definitions |
| `generatePalette`  | `(baseColor, rule) => Palette`            |
| `analogous`        | ±30° hue shift rule                       |
| `complementary`    | 180° flip + lightness variations          |
| `monochromatic`    | 6 lightness steps rule                    |
| `triadic`          | 120° spacing rule                         |
| `Palette` / `Rule` | Core types                                |

Depends on `colorjs.io` only.
