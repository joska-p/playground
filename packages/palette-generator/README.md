# @repo/palette-generator

> A color-picking experience that renders four color spaces as interactive canvases — tap a pixel, pick a base color, apply a harmony rule, and watch a palette accumulate in the display.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

Palette Generator is the React UI layer of a two-package color palette system. It takes the pure generation logic from `@repo/palette-engine` and gives it a body: four `<canvas>` elements each rendering a different color space, a slider for the third dimension, buttons for each harmony rule, and a display that shows every palette you've generated stacked as rows of swatches.

The interesting tension is between _exploration_ and _precision_. The color-space canvases are maps — each pixel is a color, and clicking anywhere on the map picks that color as the new base. This is fast and intuitive: you navigate by sight, not by entering coordinates. But the canvas is finite and quantized, so fine-grained selection comes from the slider (the z-axis) and the ability to switch between color spaces. OKLCh lets you explore hue and chroma while holding lightness steady; sRGB lets you dial in exact channel values. The same base color lives at different coordinates in each space, and the canvas makes those relationships visible.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** color pickers that show color _space_ as a navigable map rather than a list of swatches.
- **Math / Papers:** color spaces (OKLCh, sRGB, HSL); harmonic color relationships.
- **Borrowed Code & Algorithms:** OKLCh harmony rules from `@repo/palette-engine` — rules always run in OKLCh regardless of which canvas you picked from, so harmonies stay perceptually balanced.

## ⚠️ Patterns & Gotchas

- **Map + slider navigation.** Each canvas is a 2D slice of a color space; the slider is the third (z) axis. Clicking a pixel updates the shared base color in the store.
- **Rules stay perceptually consistent.** The engine's harmony rules operate in OKLCh even when the pick was made on the sRGB or HSL canvas.
- **Canvas rendering is naive.** Each pixel is a `getColor(x, y, zValue)` call written into an `ImageData` — fine at 200×200, noticeable at larger sizes, especially while dragging the slider.
- **`addPalette` reads via `getState()`**, not a selector — it always sees the latest palettes array even if the component hasn't re-rendered. Correct, but an unusual Zustand mutation style.

## 📚 References

- [OKLCH in CSS — why we quit RGB and HSL](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [MDN — Oklch color space](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/palette-generator/`._
