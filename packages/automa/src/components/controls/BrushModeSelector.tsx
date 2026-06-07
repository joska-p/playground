import { Button } from '@repo/ui/Button';
import { useSetBrushMode } from '../../stores/automaton/actions.ts';
import { useBrushMode } from '../../stores/automaton/selectors.ts';
import type { BrushMode } from '../../stores/automaton/types.ts';

const brushModes: { value: BrushMode; label: string; key: string }[] = [
  { value: 'draw', label: 'Draw', key: 'D' },
  { value: 'erase', label: 'Erase', key: 'E' },
];

function BrushModeSelector() {
  const brushMode = useBrushMode();
  const setBrushMode = useSetBrushMode();

  return (
    <div className="flex items-center gap-1">
      {brushModes.map(({ value, label, key }) => (
        <Button
          key={value}
          variant={brushMode === value ? 'primary' : 'ghost'}
          size="small"
          onClick={() => setBrushMode(value)}
          title={`${label} (${key})`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

export { BrushModeSelector };
