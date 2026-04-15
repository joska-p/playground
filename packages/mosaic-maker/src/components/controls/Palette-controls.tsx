import { useMosaicMakerContext } from "../Mosaic-context.js";
import { initialPalette } from "../config.js";
import { getPaletteId } from "../lib/palette-utils.js";
import { PaletteButton } from "./Palette-button.js";

function PaletteControls() {
  const { currentPalettes } = useMosaicMakerContext();

  return (
    <fieldset className="mm:has-focus-visible:bg-accent/20 mm:flex mm:h-44 mm:w-full mm:flex-col mm:flex-wrap mm:justify-center mm:gap-2 mm:overflow-x-auto mm:p-2 mm:lg:h-auto mm:lg:flex-row mm:lg:gap-4">
      <legend className="mm:sr-only">Choose a color palette</legend>

      <PaletteButton palette={initialPalette} aria-label="Default palette" />
      {currentPalettes.map((palette) => (
        <PaletteButton key={getPaletteId(palette)} palette={palette} />
      ))}
    </fieldset>
  );
}

export { PaletteControls };
