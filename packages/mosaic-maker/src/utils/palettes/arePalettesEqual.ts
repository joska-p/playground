import type { Palette } from '../../core/palette.schema';
import { getPaletteId } from './getPaletteId';

function arePalettesEqual(a: Palette, b: Palette): boolean {
  return getPaletteId(a) === getPaletteId(b);
}

export { arePalettesEqual };
