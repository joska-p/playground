import { ControlSection } from '@repo/ui/control-panel';
import { Select, Slider } from '@repo/ui/data-entry';
import type { ArgPreset } from './store';
import { setArgPreset, setGlobalT, useArgPreset, useGlobalT } from './store';

const PRESET_OPTIONS: { value: ArgPreset; label: string }[] = [
  { value: 'gradient', label: 'Gradient (x, y, t)' },
  { value: 'symmetric', label: 'Symmetric (x, x*y, t)' },
  { value: 'interactive', label: 'Interactive (x, t, 0)' }
];

function TestModeControls() {
  const globalT = useGlobalT();
  const argPreset = useArgPreset();

  return (
    <ControlSection
      title="config"
      defaultOpen={true}
    >
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-foreground-muted text-xs">Global Constant (t)</span>
          <span className="text-foreground font-mono text-xs">{globalT.toFixed(2)}</span>
        </div>
        <Slider
          min={-1}
          max={1}
          step={0.01}
          value={globalT}
          onChange={setGlobalT}
        />
      </div>

      <Select
        value={argPreset}
        onChange={(e) => {
          setArgPreset(e.target.value as ArgPreset);
        }}
      >
        {PRESET_OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </ControlSection>
  );
}

export { TestModeControls };
