import type { Palette } from "../core/config";

function getPaletteId(palette: Palette): string {
  return Object.values(palette).sort().join("-");
}

function arePalettesEqual(a: Palette, b: Palette): boolean {
  return getPaletteId(a) === getPaletteId(b);
}

export { arePalettesEqual, getPaletteId };
