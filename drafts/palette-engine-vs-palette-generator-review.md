# Package Review: `@repo/palette-engine` vs `@repo/palette-generator`

## Summary

**They are correctly split into two packages — keep them separate.**

| | `palette-engine` | `palette-generator` |
|---|---|---|
| **Nature** | Pure computation library | React application |
| **Frameworks** | None (just `colorjs.io`) | React, Zustand, Vite, Tailwind |
| **Entry** | Tree-shakeable modules (`./types`, `./generatePalette`, etc.) | `./App.tsx` (component), `./styles` |
| **UI** | Zero | Full UI (color picker canvas, controls, display) |

## What each contains

### `palette-engine` (~65 lines of logic)

- **`types.ts`** — `Palette` (list of `Color`) and `Rule` (apply function + metadata)
- **`generatePalette.ts`** — takes a base `Color` + a `Rule`, returns a `Palette`
- **`colorSpaces.ts`** — definitions for OKLab, OKLCh, HSL, sRGB (axis ranges + `getColor` functions)
- **`rules/`** — 4 harmony rules (`analogous`, `complementary`, `monochromatic`, `triadic`), each implementing the `Rule` interface

Zero UI, zero React, zero side effects. Pure functional transformations on color objects.

### `palette-generator` (~230 lines of UI + glue)

- **`App.tsx`** / `main.tsx` — Vite entry point
- **`Controls.tsx`** — wires up `colorSpaces` + `palette-engine` rules to generate palettes
- **`ColorSpaceControls.tsx`** + **`ColorSpaceCanvas.tsx`** — interactive canvas color picker for each color space
- **`Display.tsx`** — renders generated palettes as swatches
- **`stores/palette/store.ts`** — Zustand store tracking `baseColor` and generated `palettes`
- **`utils/color.ts`** / `utils/maths.ts` — tiny helpers (remap values, scale to 255)

## How they relate

`palette-generator` depends on `palette-engine` as a workspace dependency:

```json
"dependencies": {
  "@repo/palette-engine": "workspace:*",
  ...
}
```

It imports from 4 of `palette-engine`'s 7 exports: `colorSpaces`, `generatePalette`, `rules/*`, `types`. This is the **only** consumer of `palette-engine` in the repo.

## Why they should stay separate

1. **Separation of domain logic from UI.** `palette-engine` is pure computation: color theory, harmony rules, color space math. It has no framework dependency, no React, no bundler. This means it could be consumed by a Node script, a CLI tool, a different framework (Vue, Svelte, canvas-only), or another app in this monorepo without bringing in React/Vite/Zustand.

2. **Dependency weight.** Merging them would drag React, Zustand, Vite, Tailwind, and all their transitive dependencies into any consumer of what should be a zero-dependency logic package. Currently `palette-engine` depends only on `colorjs.io`.

3. **Build tooling mismatch.** `palette-engine` is a simple TypeScript library (exports point to raw `.ts` files). `palette-generator` is a full Vite-bundled application with `rolldown`, `babel`, React compiler plugin, etc. These have very different build concerns.

4. **Test surface.** The engine can be tested with pure function calls (no DOM, no React testing infra). The generator would need React Testing Library, jsdom, etc.

5. **Future growth.** If more harmony rules or color space definitions are added to the engine, they benefit all consumers. If the generator gets more UI features (saving palettes, export, history), those don't leak into the engine.

## Potential concern (but not a problem)

> *"`palette-engine` has only one consumer in the repo."*

This is fine. A package doesn't need multiple consumers to justify its existence. The architectural boundary (computation vs. presentation) is the right seam, and the code is small enough that the duplication of maintaining two `package.json` files is negligible.

## Bottom line

**Keep them separate.** The `palette-engine` → `palette-generator` dependency arrow is clean: logic libraries consume nothing and export pure transformations; UI apps consume libraries and add presentation. Merging them would violate this boundary and couple a reusable engine to a specific UI framework.
