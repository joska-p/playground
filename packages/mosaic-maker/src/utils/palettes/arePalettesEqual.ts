import type { Palette } from '../../core/palette.schema';

function arePalettesEqual(a: Palette, b: Palette): boolean {
  return a.id === b.id;
}

export { arePalettesEqual };
