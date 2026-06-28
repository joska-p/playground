import { ColorPalette } from '@repo/ui/ColorPalette';
import { applyPalette } from '../../stores/mosaic/actions';
import { useCurrentPalette, useCurrentPalettes } from '../../stores/mosaic/selectors';

function PaletteControls() {
  const currentPalettes = useCurrentPalettes();
  const currentPalette = useCurrentPalette();

  return (
    <>
      <h3 className="text-foreground/60 sr-only text-xs">Palettes</h3>
      <div className="grid h-16 grid-flow-col grid-rows-2 gap-2 overflow-x-auto p-2 lg:flex lg:h-auto lg:flex-wrap lg:justify-center">
        {currentPalettes.map((palette) => (
          <ColorPalette
            key={palette.id}
            colors={Object.values(palette).filter((item) => item !== palette.id)}
            checked={palette.id === currentPalette.id}
            onChange={() => applyPalette(palette)}
            variant="primary"
            size="sm"
            orientation="horizontal"
            className="shrink-0 transition-transform duration-150 hover:scale-105 lg:flex-col lg:[--cell-size:--spacing(6)]"
          />
        ))}
      </div>
    </>
  );
}

export { PaletteControls };
