import { ColorPalette } from "@repo/ui/ColorPalette";
import {
  updateMosaicPalette,
  useMosaicCurrentPalette,
  useMosaicCurrentPalettes,
} from "../../store/mosaicStore";
import { arePalettesEqual } from "../../utils/arePalettesEqual";
import { getPaletteId } from "../../utils/getPaletteId";

function PaletteControls() {
  const currentPalettes = useMosaicCurrentPalettes();
  const currentPalette = useMosaicCurrentPalette();

  return (
    <fieldset className="border-border/30 mt-4 flex flex-wrap items-center justify-center gap-2 border-t p-4">
      {currentPalettes.map((palette) => (
        <ColorPalette
          key={getPaletteId(palette)}
          colors={Object.values(palette)}
          checked={arePalettesEqual(palette, currentPalette)}
          onChange={() => updateMosaicPalette(palette)}
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
