import { cn } from "@/lib/utils";
import type { initialPalette } from "../config";

type Props = React.HTMLAttributes<HTMLLabelElement> & {
  id: string;
  palette: typeof initialPalette;
  checked: boolean;
  setCurrentPalette: (palette: typeof initialPalette) => void;
};

function PaletteButton({ id, palette, className, checked, setCurrentPalette }: Props) {
  return (
    <label
      className={cn(
        "flex w-fit flex-row",
        "lg:flex-col",
        "has-[:checked]:ring-4 has-[:checked]:ring-primary",
        "has-[:focus-visible]:bg-accent has-[:focus-visible]:text-accent-foreground",
        className
      )}
    >
      <input
        type="radio"
        name="palette"
        value={id}
        className="sr-only"
        checked={checked}
        onChange={() => setCurrentPalette(palette)}
        aria-label={`Color palette ${id}`}
      />
      {Object.values(palette).map((color, index) => (
        <div key={index} style={{ backgroundColor: color }} className="h-6 w-6 md:h-6 md:w-6" />
      ))}
    </label>
  );
}

export { PaletteButton };
