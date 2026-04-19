import { ColorPalette } from "@repo/ui";
import { useMosaicMakerContext } from "../Mosaic-context.js";
import { arePalettesEqual, getPaletteId } from "../lib/palette-utils.js";

function PaletteControls() {
  const { currentPalettes, currentPalette, updatePalette } =
    useMosaicMakerContext();

  return (
    <fieldset className="flex flex-wrap items-center justify-center gap-2 p-4 border-t border-border/30 mt-4">
      {currentPalettes.map((palette) => (
        <ColorPalette
          key={getPaletteId(palette)}
          colors={Object.values(palette)}
          checked={arePalettesEqual(palette, currentPalette)}
          onChange={() => updatePalette(palette)}
          aria-label={`Color palette ${getPaletteId(palette)}`}
          // Default (mobile): Horizontal + Small
          size="sm"
          orientation="horizontal"
          // Responsive (desktop): Vertical + Medium
          className="lg:flex-col lg:[--cell-size:--spacing(6)] hover:scale-105 transition-transform"
        />
      ))}
    </fieldset>
  );
}

export { PaletteControls };
