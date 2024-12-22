import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLLabelElement> & {
  palette: string[];
  disabled?: boolean;
  checked: boolean;
  handleSetNewColors: (palette?: string[]) => void;
};
const Palette = ({
  palette,
  className,
  disabled,
  checked,
  handleSetNewColors,
  ...props
}: Props) => {
  return (
    <Label className={cn("has-[:checked]:ring-4", className)} {...props}>
      <input
        type="radio"
        name="palette"
        value={palette.join(",")}
        className="sr-only"
        disabled={disabled}
        checked={checked}
        onChange={() => handleSetNewColors(palette)}
      />
      {palette.map((color, index) => (
        <div key={index} style={{ backgroundColor: color }} className="h-8 w-8" />
      ))}
    </Label>
  );
};

export default Palette;
