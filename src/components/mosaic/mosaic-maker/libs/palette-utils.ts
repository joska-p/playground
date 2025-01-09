import type { initialPalette } from "../config";

function getPaletteId(palette: typeof initialPalette): string {
  return Object.values(palette).sort().join("-");
}

function arePalettesEqual(a: typeof initialPalette, b: typeof initialPalette): boolean {
  return getPaletteId(a) === getPaletteId(b);
}

export { arePalettesEqual, getPaletteId };
