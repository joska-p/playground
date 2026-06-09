import { getRule } from '../../core/rules/registry.ts';
import { useRuleId } from '../../stores/simulation/selectors';
import { setGlowColor, setStateColor } from '../../stores/ui/actions.ts';
import { useGlowColor, useStateColors } from '../../stores/ui/selectors';

type ColorRowProps = {
  label: string;
  color: string;
  onChange: (color: string) => void;
};

function ColorRow({ label, color, onChange }: ColorRowProps) {
  return (
    <label className="flex items-center gap-2 font-mono text-xs">
      <span className="text-foreground/70 w-10 text-right">{label}</span>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="h-5 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
      />
      <span className="text-foreground/50">{color}</span>
    </label>
  );
}

function ColorPicker() {
  const ruleId = useRuleId();
  const rule = getRule(ruleId);
  const stateColors = useStateColors();
  const glowColor = useGlowColor();

  if (!rule) return null;

  return (
    <div className="flex flex-col gap-1">
      {stateColors.slice(0, rule.stateCount).map((color, i) => {
        const label = i === 0 ? 'Dead' : i === 1 ? 'Alive' : `State ${i}`;
        return (
          <ColorRow
            key={i}
            label={label}
            color={color}
            onChange={(c) => setStateColor(i, c)}
          />
        );
      })}
      <ColorRow
        label="Glow"
        color={glowColor}
        onChange={setGlowColor}
      />
    </div>
  );
}

export { ColorPicker };
