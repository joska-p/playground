import { getRule } from '@repo/automa-engine/discrete/rules/registry';
import { useRuleId } from '../../stores/simulation/selectors';
import { setStateColor } from '../../stores/ui/actions';
import { useStateColors } from '../../stores/ui/selectors';

type ColorRowProps = {
  label: string;
  color: string;
  onChange: (color: string) => void;
};

function ColorRow({ label, color, onChange }: ColorRowProps) {
  return (
    <label className="grid w-full grid-cols-3 items-center justify-items-start text-xs">
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

function StateColorPicker() {
  const ruleId = useRuleId();
  const rule = getRule(ruleId);
  const stateColors = useStateColors();

  if (!rule) return null;

  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
}

export { StateColorPicker };
