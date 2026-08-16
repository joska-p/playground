# @repo/mosaic-maker

> A procedural engine that breathes color palettes into ordered grids of SVG shapes — each tile a small geometry, each mosaic a composition that never repeats the same way twice.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

Mosaic Maker sits at the intersection of declarative tile design and high-frequency performance engineering. You hand it a color palette and a set of tile shapes; it builds a CSS Grid mosaic where every cell is an SVG primitive — circles, rectangles, paths, polygons — rendered with palette-driven fills and animated transitions.

The interesting tension is between _what_ gets rendered and _how fast_ it can change. The tile and palette system is fully declarative: a registry defines eight tile geometries as composable SVG shape lists, and a palette is just five CSS custom properties (`--color-0` through `--color-4`). The performance strategy is fully imperative: during slider drags, `style.setProperty()` writes tile sizes and gaps directly to the DOM, bypassing React entirely. The React tree re-renders only when the _set_ of tiles or palettes changes — never during continuous input.

The result is a mosaic engine that feels responsive at 60fps while keeping its data model clean enough to reason about.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** tiled mosaics, low-res geometric compositions, generative color grids.
- **Math / Papers:** CSS Grid `auto-fill` arithmetic (tile count mirrors the browser's grid layout exactly).
- **Borrowed Code & Algorithms:** `nice-color-palettes` dataset (via unpkg), Zustand store + selector isolation, CSS custom properties as the hot-path rendering channel.

## ⚠️ Patterns & Gotchas

- **React for structure, CSS vars for the hot path.** Slider drags write `style.setProperty()` on the mosaic div — the React tree re-renders only when the set of tiles or palettes changes, never during continuous input. Palette changes use `updateElementStyles()` to batch-set all `--color-N` vars at once.
- **`setRef` doubles as the regeneration trigger.** It persists the DOM ref _and_ kicks off tile recomputation — one function call keeps the resize-to-tile pipeline simple.
- **Palette fetch is fire-and-forget.** The mosaic renders with a grayscale fallback first; a brief gray flash precedes the real palette arrival. Intentional — the UI is immediately interactive even before the network responds.
- **Tile counting mirrors CSS Grid.** `computeNumberOfTiles` uses the same `auto-fill` arithmetic as `grid-template-columns: repeat(auto-fill, var(--tile-size))`, so the JS count and CSS grid always agree. The `+ gap` in the numerator accounts for the last tile having no trailing gap.
- **Stable tile keys, random instances.** Tile ids are index-based (`"${i}"`), preserving DOM nodes across regenerations; names, colors, and rotations are randomized per regeneration.
- **Store is deliberately unexported.** Consumers interact only through getter hooks and setter functions — the Zustand store is an implementation detail, not public API.
- **Fine-grained selectors isolate re-renders** — sidebar controls don't repaint on tile regeneration and vice versa.

## 📚 References

- [nice-color-palettes (npm)](https://www.npmjs.com/package/nice-color-palettes)
- [MDN — grid-template-columns / auto-fill](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/mosaic-maker/`._
