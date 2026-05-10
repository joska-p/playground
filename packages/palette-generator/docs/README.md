# Palette Generator

A TypeScript-first, zero-dependency color palette generator and minimal UI for the playground.

This package provides:

- A small programmatic generator (`generatePalette`) that produces perceptually-uniform scales using Oklab.
- A minimal React UI component (`PaletteGenerator`) used in the Astro playground page.
- Small, focused UI primitives for picking a base color and configuring options.
- Optional WCAG contrast-adjustment pass per swatch.

Goals

- Deterministic and testable color generation.
- No runtime dependencies for the color math — Oklab conversions and gamut handling are implemented in this package.
- Accessible, composable UI primitives for the playground.

Quick start

- From the playground UI: the page at `apps/playground/src/pages/projects/color/palettes/index.astro` mounts the React `PaletteGenerator` component.
- Programmatic usage (Node or browser): import the generator and call `generatePalette`.

API (programmatic)

- `generatePalette(baseColor, params)`

  - `baseColor` — HSL base color: `{ hue: number; saturation: number; lightness: number }`.
  - `params` — generator params:
    - `scheme`: one of `"monochromatic" | "analogous" | "complementary" | "split-complementary" | "triadic" | "tetradic"`.
    - `count`: number of swatches to generate.
    - `angle`: (where applicable) angular spread for harmonic schemes.
    - `lightnessSpread`: used for monochromatic scales.
    - `ensureContrast` (optional): `{ min: number; against?: string }` — min contrast ratio and background color (hex string).

  - Returns: a `Palette` object `{ id: string; colors: HSLColor[] }` where each color is an HSL representation for easy usage in the UI.

React component

- `PaletteGenerator` (default UI component used in the playground)
  - Composed of a `ColorPicker` (canvas + saturation slider) and `Controls` (scheme, count, angle, contrast options).
  - You can import it into Astro/React pages:

    ```/workspaces/playground/apps/playground/src/pages/projects/color/palettes/index.astro#L1-20
    ---
    import { PaletteGenerator } from "@repo/palette-generator";
    import { StrictMode } from "react";
    import BaseLayout from "../../../../layouts/base-layout.astro";
    import { projects } from "../../../../data/projects";

    const title = projects["palettes"]?.name ?? "Palettes Generator";
    ---

    <BaseLayout title={title}>
      <StrictMode>
        <PaletteGenerator client:only="react" />
      </StrictMode>
    </BaseLayout>
    ```

Implementation notes

- Color math
  - All interpolation and contrast adjustments are performed in Oklab for perceptual uniformity.
  - The package implements `srgb <-> oklab` conversions internally (`src/utils/oklab.ts`).
  - When an Oklab-derived color falls outside the sRGB gamut we apply a gentle chroma reduction (iterative scaling of `a`/`b`) until the color is representable. This avoids hue shifts.

- Accessibility
  - Optional `ensureContrast` parameter uses a binary search on the Oklab L component (lightness) to reach the requested WCAG ratio where possible.
  - The UI exposes a toggle and inputs for the min ratio and the background color.

- UI
  - The color picker is implemented as a canvas hue/lightness plane with an independent saturation slider for clarity to designers.
  - Controls are decomposed into smaller components for readability and reusability (`SchemeSelector`, `NumericControl`, `ContrastControls`).

Developer commands

From repository root (workspace):

- Build package

  ```
  pnpm --filter @repo/palette-generator build
  ```

- Check types

  ```
  pnpm --filter @repo/palette-generator run check-types
  ```

- Lint

  ```
  pnpm --filter @repo/palette-generator lint
  ```

Files of interest

- `src/core/paletteGenerators.ts` — main generator logic (Oklab interpolation + contrast pass)
- `src/utils/oklab.ts` — srgb <-> Oklab conversions
- `src/utils/colorConversions.ts` — HSL/RGB helpers and contrast utilities
- `src/components/color-picker/` — `ColorCanvas.tsx`, `ColorPicker.tsx`
- `src/components/controls/` — `Controls.tsx`, `SchemeSelector.tsx`, `NumericControl.tsx`, `ContrastControls.tsx`

Next steps and notes

- The UI and core can be iterated in parallel. For example, swap in a different palette naming scheme or tokenization output as needed.
- Consider extracting the core generator into `@repo/palette-core` when the API stabilizes for broader reuse.

If anything here is unclear or you want me to include additional sections (examples, API TS types, or a migration guide), tell me which and I will add them to the docs.