import { cn } from "@lib/utils";
import { initialPalette } from "../config";
import { PaletteButton } from "./palette-button";
import { arePalettesEqual, getPaletteId } from "../lib/palette-utils";

type Props = {
  palettes: (typeof initialPalette)[];
  currentPalette: typeof initialPalette;
  setCurrentPalette: React.Dispatch<React.SetStateAction<typeof initialPalette>>;
};

const PaletteControls = ({ palettes, currentPalette, setCurrentPalette }: Props) => {
  return (
    <fieldset
      className={cn(
        "flex h-[176px] w-full flex-col flex-wrap justify-center gap-2 overflow-x-auto p-2",
        "lg:h-auto lg:flex-row lg:gap-4",
        "has-[:focus-visible]:bg-accent/20"
      )}
    >
      <legend className="sr-only">Choose a color palette</legend>

      <PaletteButton
        id={getPaletteId(initialPalette)}
        palette={initialPalette}
        setCurrentPalette={setCurrentPalette}
        checked={arePalettesEqual(initialPalette, currentPalette)}
        aria-label="Default palette"
      />
      {palettes.map((palette) => (
        <PaletteButton
          key={getPaletteId(palette)}
          id={getPaletteId(palette)}
          palette={palette}
          setCurrentPalette={setCurrentPalette}
          checked={arePalettesEqual(palette, currentPalette)}
        />
      ))}
    </fieldset>
  );
};

export { PaletteControls };