import type { Palette } from "../config";
import { arePalettesEqual, getPaletteId } from "../libs/palette-utils";
import { useMosaicMakerContext } from "../mosaic-context";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  palette: Palette;
}

function PaletteButton({ palette }: Props) {
  const { currentPalette, updatePalette } = useMosaicMakerContext();

  return (
    <label
      className={cn(
        "flex w-fit flex-row",
        "lg:flex-col",
        "has-[:checked]:ring-4 has-[:checked]:ring-primary",
        "has-[:focus-visible]:bg-accent has-[:focus-visible]:text-accent-foreground"
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
        <div key={index} style={{ backgroundColor: color }} className="h-6 w-6 md:h-6 md:w-6" />
      ))}
    </label>
  );
}

export { PaletteButton };
