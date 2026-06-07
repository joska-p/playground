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
        <button
          key={value}
          onClick={() => setBrushMode(value)}
          className={`rounded px-2 py-1 text-xs font-medium ${
            brushMode === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          title={`${label} (${key})`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export { BrushModeSelector };
