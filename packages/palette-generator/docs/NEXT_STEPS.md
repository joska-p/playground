NEXT STEPS (short term)

This file lists suggested next tasks so you (or I) can pick up development quickly.

1) Swatch component & PaletteDisplay polishing
   - Create a `Swatch` component that shows:
     - color preview square
     - HEX text (copy button)
     - optional HSL/Oklab tooltip for developers
     - a small badge when the swatch was contrast-adjusted
   - Replace the inline palette boxes with `Swatch` components.

2) Visual indicator for adjusted colors
   - Modify `interpolatePalette` to include per-swatch metadata: `{ adjusted?: boolean; contrast?: { ratio:number; against: string } }`.
   - Show those badges in the UI and add an explanation in the docs.

3) Expand color parsing for `contrastAgainst`
   - Accept CSS color keywords, `rgb()` / `rgba()` / `hsl()` in addition to hex.
   - Add a small validation + preview component in the controls.

4) Unit tests
   - Add tests for `srgbToOklab`/`oklabToSrgb` round-trips.
   - Tests for `reduceChromaUntilGamut` behavior and for `adjustLForContrast` reaching expected ratios.

5) Extract core package (optional)
   - If we want to reuse the generator across packages, split the core into `@repo/palette-core` and keep UI in `@repo/palette-generator`.

6) Polishing & UX
   - Keyboard support for `ColorCanvas` (arrow keys to nudge marker).
   - Add export buttons (copy CSS vars, download tokens JSON).
   - Add Storybook stories for `ColorCanvas`, `ColorPicker`, `Swatch`, and `Controls`.

If you want, I can take items 1–3 next, commit each change, and open a PR/branch for review. Say "proceed with 1" (Swatch) or "commit now" to commit the current changes.