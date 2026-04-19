import { useMosaicMakerContext } from "../Mosaic-context.js";
import type { Palette } from "../config.js";
import { arePalettesEqual, getPaletteId } from "../lib/palette-utils.js";
import { twMerge } from "tailwind-merge";

export interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  palette: Palette;
}

function PaletteButton({ palette }: Props) {
  const { currentPalette, updatePalette } = useMosaicMakerContext();

  return (
    <label
      className={twMerge(
        "flex w-fit flex-row",
        "lg:flex-col",
        "has-checked:ring-primary has-checked:ring-4",
        "has-focus-visible:bg-accent has-focus-visible:text-accent-foreground",
      )}
    >
      <input
        type="radio"
        name="palette"
        value={getPaletteId(palette)}
        className="sr-only"
        checked={arePalettesEqual(palette, currentPalette)}
        onChange={() => updatePalette(palette)}
        aria-label={`Color palette ${getPaletteId(palette)}`}
      />
      {Object.values(palette).map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color }}
          className="h-6 w-6 md:h-6 md:w-6"
        />
      ))}
    </label>
  );
}

export { PaletteButton };
