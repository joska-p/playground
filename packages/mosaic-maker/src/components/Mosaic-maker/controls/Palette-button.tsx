import { useMosaicMakerContext } from "../Mosaic-context.js";
import type { Palette } from "../config.js";
import { arePalettesEqual, getPaletteId } from "../lib/palette-utils.js";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  palette: Palette;
}

function PaletteButton({ palette }: Props) {
  const { currentPalette, updatePalette } = useMosaicMakerContext();

  return (
    <label
      className={twMerge(
        "mm:flex mm:w-fit mm:flex-row",
        "mm:lg:flex-col",
        "mm:has-checked:ring-primary mm:has-checked:ring-4",
        "mm:has-focus-visible:bg-accent mm:has-focus-visible:text-accent-foreground",
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
          className="mm:h-6 mm:w-6 mm:md:h-6 mm:md:w-6"
        />
      ))}
    </label>
  );
}

export { PaletteButton };
