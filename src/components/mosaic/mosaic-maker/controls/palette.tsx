import type { initialPalette } from "../options";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLLabelElement> & {
  palette: typeof initialPalette;
  disabled?: boolean;
  checked: boolean;
  setCurrentPalette: React.Dispatch<React.SetStateAction<typeof initialPalette>>;
};

const Palette = ({ palette, className, disabled, checked, setCurrentPalette }: Props) => {
  const paletteId = Object.values(palette).join(",");
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
        value={paletteId}
        className="sr-only"
        disabled={disabled}
        checked={checked}
        onChange={() => setCurrentPalette(palette)}
        aria-label={paletteId}
      />
      {Object.values(palette).map((color, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: no other way
          key={index}
          style={{ backgroundColor: color }}
          className="h-6 w-6 md:h-6 md:w-6"
        />
      ))}
    </label>
  );
};

export { Palette };
