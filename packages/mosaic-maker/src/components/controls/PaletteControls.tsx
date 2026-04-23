import { ColorPalette } from "@repo/ui";
import { useMosaicStore, updatePalette } from "../../store/useMosaicStore.js";
import { useShallow } from "zustand/shallow";
import { arePalettesEqual, getPaletteId } from "../../utils/palette-utils.js";

function PaletteControls() {
  const { currentPalettes, currentPalette } = useMosaicStore(
    useShallow((state) => ({
      currentPalettes: state.currentPalettes,
      currentPalette: state.currentPalette,
    }))
  );

  return (
    <fieldset className="border-border/30 mt-4 flex flex-wrap items-center justify-center gap-2 border-t p-4">
      {currentPalettes.map((palette) => (
        <ColorPalette
          key={getPaletteId(palette)}
          colors={Object.values(palette)}
          checked={arePalettesEqual(palette, currentPalette)}
          onChange={() => updatePalette(palette)}
          variant="primary"
          size="sm"
          orientation="horizontal"
          className="transition-transform hover:scale-105 lg:flex-col lg:[--cell-size:--spacing(6)]"
        />
      ))}
    </fieldset>
  );
}

export { PaletteControls };
