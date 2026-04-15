import type { Palette } from "../config.js";

function getPaletteId(palette: Palette): string {
  return Object.values(palette).sort().join("-");
}

function arePalettesEqual(a: Palette, b: Palette): boolean {
  return getPaletteId(a) === getPaletteId(b);
}

export { arePalettesEqual, getPaletteId };
