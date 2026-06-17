import type { JSX } from 'react';
import { getAllScaleMetas } from '../../core/visualizations/scales/registry';
import type { ScaleConfigEntry, ParamDescriptor } from '../../core/visualizations/types';
import { LayerOptionsPanel } from './LayerOptionsPanel';

type ScaleSelectorProps = {
  scale: ScaleConfigEntry;
  expanded: boolean;
  onToggleExpand: () => void;
  onChange: (id: string) => void;
  onParamChange: (key: string, value: unknown) => void;
};

function ScaleSelector({
  scale,
  expanded,
  onToggleExpand,
  onChange,
  onParamChange
}: ScaleSelectorProps): JSX.Element {
  const allScales = getAllScaleMetas();
  const currentMeta = allScales.find((s) => s.id === scale.id);

  return (
    <div className="flex flex-col rounded border border-zinc-700 bg-zinc-800/50 px-2 py-1.5">
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-zinc-300 shrink-0">
          Scale:
        </label>

        <select
          value={scale.id}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded border border-zinc-600 bg-zinc-800 px-2 py-1 text-xs text-zinc-200"
        >
          {allScales.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
              {scale.autoDetected ? ' (auto)' : ''}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onToggleExpand}
          className={`rounded px-1 py-0.5 text-xs transition-colors hover:bg-zinc-700 ${
            expanded ? 'text-zinc-200' : 'text-zinc-400'
          }`}
          title="Scale options"
        >
          &#9881;
        </button>
      </div>

      {expanded && currentMeta && (
        <LayerOptionsPanel
          params={currentMeta.params as Record<string, ParamDescriptor>}
          values={scale.params}
          onChange={onParamChange}
        />
      )}
    </div>
  );
}

export { ScaleSelector };
