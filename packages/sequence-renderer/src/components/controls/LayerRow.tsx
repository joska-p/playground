import type { JSX } from 'react';
import type { LayerMeta, ParamDescriptor } from '../../core/visualizations/types';
import { LayerOptionsPanel } from './LayerOptionsPanel';

type LayerRowProps = {
  meta: LayerMeta<Record<string, unknown>>;
  enabled: boolean;
  params: Record<string, unknown>;
  isExpanded: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  canRemove: boolean;
  onToggle: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onToggleExpand: () => void;
  onParamChange: (key: string, value: unknown) => void;
};

function LayerRow({
  meta,
  enabled,
  params,
  isExpanded,
  canMoveUp,
  canMoveDown,
  canRemove,
  onToggle,
  onMoveUp,
  onMoveDown,
  onRemove,
  onToggleExpand,
  onParamChange
}: LayerRowProps): JSX.Element {
  return (
    <div className="flex flex-col rounded border border-zinc-700 bg-zinc-800/50 px-2 py-1.5">
      <div className="flex items-center gap-1.5">
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
          className="h-3.5 w-3.5 cursor-pointer accent-zinc-400"
        />

        <span
          className={`flex-1 text-xs font-medium ${
            enabled ? 'text-zinc-200' : 'text-zinc-500'
          }`}
        >
          {meta.name}
        </span>

        <button
          type="button"
          onClick={onToggleExpand}
          className={`rounded px-1 py-0.5 text-xs transition-colors hover:bg-zinc-700 ${
            isExpanded ? 'text-zinc-200' : 'text-zinc-400'
          }`}
          title="Options"
        >
          &#9881;
        </button>

        <button
          type="button"
          onClick={onMoveUp}
          disabled={!canMoveUp}
          className="rounded px-1 py-0.5 text-xs text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-zinc-300 disabled:opacity-20 disabled:cursor-not-allowed"
          title="Move up"
        >
          &#9650;
        </button>

        <button
          type="button"
          onClick={onMoveDown}
          disabled={!canMoveDown}
          className="rounded px-1 py-0.5 text-xs text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-zinc-300 disabled:opacity-20 disabled:cursor-not-allowed"
          title="Move down"
        >
          &#9660;
        </button>

        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          className="rounded px-1 py-0.5 text-xs text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed"
          title="Remove layer"
        >
          &#10005;
        </button>
      </div>

      {isExpanded && (
        <LayerOptionsPanel
          params={meta.params as Record<string, ParamDescriptor>}
          values={params}
          onChange={onParamChange}
        />
      )}
    </div>
  );
}

export { LayerRow };
