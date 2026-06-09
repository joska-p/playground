import type { Palette } from '../../core/palette.schema';

function getPaletteId(palette: Palette): string {
  return palette.id;
}

export { getPaletteId };
