import type { Palette } from "../core/initialPalette";

function getPaletteId(palette: Palette): string {
  return Object.values(palette).sort().join("-");
}

export { getPaletteId };
