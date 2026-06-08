import { setGlowColor } from '../../stores/ui/actions.ts';
import { useGlowColor } from '../../stores/ui/selectors.ts';

type ColorRowProps = {
  label: string;
  color: string;
  onChange: (color: string) => void;
};

function ColorRow({ label, color, onChange }: ColorRowProps) {
  return (
    <label className="grid grid-cols-3 place-content-center gap-2 w-full text-xs">
      <span className="text-right text-muted-foreground">{label}</span>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="h-5 cursor-pointer rounded border-none"
      />
      <span className="text-muted-foreground">{color}</span>
    </label>
  );
}

function ShaderPropsControls() {
  const glowColor = useGlowColor();

  return (
    <div className="flex flex-col gap-1">
      <ColorRow
        label="Glow"
        color={glowColor}
        onChange={setGlowColor}
      />
    </div>
  );
}

export { ShaderPropsControls };
