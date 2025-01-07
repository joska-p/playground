import type { initialPalette } from "../config";

const getPaletteId = (palette: typeof initialPalette): string => Object.values(palette).sort().join("-");

const arePalettesEqual = (a: typeof initialPalette, b: typeof initialPalette): boolean =>
  getPaletteId(a) === getPaletteId(b);

export { getPaletteId, arePalettesEqual };
