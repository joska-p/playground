import { ColorPalette } from '@repo/ui/ColorPalette';
import { applyPalette } from '../../stores/mosaic/actions';
import {
  useCurrentPalette,
  useCurrentPalettes,
} from '../../stores/mosaic/selectors';
import { arePalettesEqual } from '../../utils/palettes/arePalettesEqual';
import { getPaletteId } from '../../utils/palettes/getPaletteId';

function PaletteControls() {
  const currentPalettes = useCurrentPalettes();
  const currentPalette = useCurrentPalette();

  return (
    <fieldset className="border-border/30 mt-4 flex flex-wrap items-center justify-center gap-2 border-t p-4">
      {currentPalettes.map((palette) => (
        <ColorPalette
          key={getPaletteId(palette)}
          colors={Object.values(palette)}
          checked={arePalettesEqual(palette, currentPalette)}
          onChange={() => applyPalette(palette)}
          variant="primary"
          size="small"
          orientation="horizontal"
          className="transition-transform hover:scale-105 lg:flex-col lg:[--cell-size:--spacing(6)]"
        />
      ))}
    </fieldset>
  );
}

export { PaletteControls };
