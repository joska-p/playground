import { useSetToolMode } from '../../stores/automaton/actions.ts';
import { useToolMode } from '../../stores/automaton/selectors.ts';
import type { ToolMode } from '../../stores/automaton/types.ts';

const toolModes: { value: ToolMode; label: string; key: string }[] = [
  { value: 'draw', label: 'Draw', key: 'D' },
  { value: 'erase', label: 'Erase', key: 'E' },
  { value: 'pan', label: 'Pan', key: 'P' },
];

function ToolModeSelector() {
  const toolMode = useToolMode();
  const setToolMode = useSetToolMode();

  return (
    <div className="flex items-center gap-1">
      {toolModes.map(({ value, label, key }) => (
        <button
          key={value}
          onClick={() => setToolMode(value)}
          className={`rounded px-2 py-1 text-xs font-medium ${
            toolMode === value
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

export { ToolModeSelector };
