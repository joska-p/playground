import { ColorPalette } from '@repo/ui/ColorPalette';
import { applyPalette } from '../../stores/mosaic/actions';
import {
  useCurrentPalette,
  useCurrentPalettes,
} from '../../stores/mosaic/selectors';

function PaletteControls() {
  const currentPalettes = useCurrentPalettes();
  const currentPalette = useCurrentPalette();

  return (
    <>
      <h3 className="text-foreground/60 text-xs">Palettes</h3>
      <div className="flex min-h-12 flex-nowrap items-center justify-between gap-2 overflow-x-auto p-2 md:flex-wrap md:overflow-x-hidden">
        {currentPalettes.map((palette) => (
          <ColorPalette
            key={palette.id}
            colors={Object.values(palette).filter(
              (item) => item !== palette.id
            )}
            checked={palette.id === currentPalette.id}
            onChange={() => applyPalette(palette)}
            variant="primary"
            size="sm"
            orientation="horizontal"
            className="shrink-0 transition-transform duration-150 hover:scale-105 md:flex-col md:[--cell-size:--spacing(6)]"
          />
        ))}
      </div>
    </>
  );
}

export { PaletteControls };
