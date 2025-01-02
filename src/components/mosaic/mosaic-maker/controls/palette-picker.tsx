import { cn } from "@/lib/utils";
import { defaultPalette } from "../tiles/default-options";
import { Palette } from "./palette";

type Props = {
  palettes: Record<string, string>[];
  currentPalette: Record<string, string>;
  handleSetNewColors: () => void;
};

const PalettePicker = ({ palettes, currentPalette, handleSetNewColors }: Props) => {
  return (
    <fieldset
      className={cn(
        "flex h-[176px] w-full flex-col flex-wrap justify-center gap-2 overflow-x-auto p-2",
        "lg:h-auto lg:flex-row lg:gap-4",
        "has-[:focus-visible]:bg-accent/20"
      )}
    >
      <Palette
        palette={defaultPalette}
        handleSetNewColors={handleSetNewColors}
        checked={
          Object.values(defaultPalette).join(",") === Object.values(currentPalette).join(",")
        }
        aria-label="Default palette"
      />
      {palettes.map((palette) => {
        const newPaletteId = Object.values(palette).join(",");
        const currentPaletteId = Object.values(currentPalette).join(",");

        return (
          <Palette
            key={newPaletteId}
            palette={palette}
            handleSetNewColors={handleSetNewColors}
            checked={newPaletteId === currentPaletteId}
            aria-label={newPaletteId}
          />
        );
      })}
    </fieldset>
  );
};

export { PalettePicker };
