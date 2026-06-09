import { setGlowColor } from '../../stores/ui/actions.ts';
import { useGlowColor } from '../../stores/ui/selectors';

type ColorRowProps = {
  label: string;
  color: string;
  onChange: (color: string) => void;
};

function ColorRow({ label, color, onChange }: ColorRowProps) {
  return (
    <label className="grid w-full grid-cols-3 items-center justify-items-start gap-2 text-xs">
      <span className="text-muted-foreground text-right">{label}</span>
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
    <div className="flex flex-col gap-2">
      <ColorRow
        label="Glow"
        color={glowColor}
        onChange={setGlowColor}
      />
    </div>
  );
}

export { ShaderPropsControls };
