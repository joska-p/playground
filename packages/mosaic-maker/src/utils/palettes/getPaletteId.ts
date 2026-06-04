import type { Palette } from '../../core/initialPalette';

// Palettes from nice-color-palettes have no stable ID — fingerprint by sorted hex values.
// Collisions are effectively impossible (5 hex values per palette).
function getPaletteId(palette: Palette): string {
  return Object.values(palette).sort().join('-');
}

export { getPaletteId };
