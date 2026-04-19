import { useMosaicMakerContext } from "../Mosaic-context.js";
import { initialPalette } from "../config.js";
import { getPaletteId } from "../lib/palette-utils.js";
import { PaletteButton } from "./Palette-button.js";

function PaletteControls() {
  const { currentPalettes } = useMosaicMakerContext();

  return (
    <fieldset className="has-focus-visible:bg-accent/20 flex h-44 w-full flex-col flex-wrap justify-center gap-2 overflow-x-auto p-2 lg:h-auto lg:flex-row lg:gap-4">
      <legend className="sr-only">Choose a color palette</legend>

      <PaletteButton palette={initialPalette} aria-label="Default palette" />
      {currentPalettes.map((palette) => (
        <PaletteButton key={getPaletteId(palette)} palette={palette} />
      ))}
    </fieldset>
  );
}

export { PaletteControls };
