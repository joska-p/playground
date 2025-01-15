import type { initialPalette } from "../config";
import { arePalettesEqual, getPaletteId } from "../libs/palette-utils";
import { updateElementStyles } from "../libs/style-utils";
import { useMosaicMakerContext } from "../mosaic-context";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  palette: typeof initialPalette;
}

function PaletteButton({ palette }: Props) {
  const { mosaicRef, currentPalette } = useMosaicMakerContext();

  const setCurrentPalette = (palette: typeof initialPalette) => {
    if (!mosaicRef.current) return;
    currentPalette.value = palette;
    updateElementStyles(mosaicRef.current, palette);
  };

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
        checked={arePalettesEqual(palette, currentPalette.value)}
        onChange={() => setCurrentPalette(palette)}
        aria-label={`Color palette ${getPaletteId(palette)}`}
      />
      {Object.values(palette).map((color, index) => (
        <div key={index} style={{ backgroundColor: color }} className="h-6 w-6 md:h-6 md:w-6" />
      ))}
    </label>
  );
}

export { PaletteButton };
