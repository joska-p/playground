import { cn } from "@/lib/utils";
import { initialPalette } from "../options";
import { Palette } from "./palette";

type Props = {
  palettes: (typeof initialPalette)[];
  currentPalette: typeof initialPalette;
  setCurrentPalette: React.Dispatch<React.SetStateAction<typeof initialPalette>>;
};

const PalettePicker = ({ palettes, currentPalette, setCurrentPalette }: Props) => {
  return (
    <fieldset
      className={cn(
        "flex h-[176px] w-full flex-col flex-wrap justify-center gap-2 overflow-x-auto p-2",
        "lg:h-auto lg:flex-row lg:gap-4",
        "has-[:focus-visible]:bg-accent/20"
      )}
    >
      <Palette
        palette={initialPalette}
        setCurrentPalette={setCurrentPalette}
        checked={
          Object.values(initialPalette).join(",") === Object.values(currentPalette).join(",")
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
            setCurrentPalette={setCurrentPalette}
            checked={newPaletteId === currentPaletteId}
            aria-label={newPaletteId}
          />
        );
      })}
    </fieldset>
  );
};

export { PalettePicker };
