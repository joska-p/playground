import { cn } from "@/lib/utils";
import { defaultPalette } from "../tiles/default-options";
import { Palette } from "./Palette";

type Props = {
  palettes: string[][];
  currentPalette: string[];
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
        checked={defaultPalette.join(",") === currentPalette.join(",")}
        aria-label="Default palette"
      />
      {palettes.map((palette) => (
        <Palette
          key={palette.toSorted().join(",")}
          palette={palette}
          handleSetNewColors={handleSetNewColors}
          checked={palette.join(",") === currentPalette.join(",")}
          aria-label={palette.join(",")}
        />
      ))}
    </fieldset>
  );
};

export { PalettePicker };
