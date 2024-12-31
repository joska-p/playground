import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLLabelElement> & {
  palette: string[];
  disabled?: boolean;
  checked: boolean;
  handleSetNewColors: (palette?: string[]) => void;
};

const Palette = ({ palette, className, disabled, checked, handleSetNewColors }: Props) => {
  return (
    <label
      className={cn(
        "flex w-fit flex-row has-[:focus-visible]:bg-accent has-[:focus-visible]:text-accent-foreground has-[:checked]:ring-4 has-[:checked]:ring-accent md:flex-col",
        className
      )}
    >
      <input
        type="radio"
        name="palette"
        value={palette.join(",")}
        className="sr-only"
        disabled={disabled}
        checked={checked}
        onChange={() => handleSetNewColors(palette)}
        aria-label={palette.join(",")}
      />
      {palette.map((color, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          style={{ backgroundColor: color }}
          className="h-6 w-6 md:h-6 md:w-6"
        />
      ))}
    </label>
  );
};

export { Palette };
