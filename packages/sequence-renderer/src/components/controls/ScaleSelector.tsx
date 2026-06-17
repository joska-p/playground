import { Button } from '@repo/ui/Button';
import { Select } from '@repo/ui/Select';
import type { ChangeEvent, JSX } from 'react';
import { getAllScaleMetas } from '../../core/visualizations/scales/registry';
import type {
  ParamDescriptor,
  ScaleConfigEntry
} from '../../core/visualizations/types';
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
    <div className="border-border bg-card flex flex-col gap-2 rounded border px-2 py-1.5">
      <div className="flex items-center gap-2">
        <Select
          variant="secondary"
          value={scale.id}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onChange(e.target.value)
          }
          className="flex-1"
        >
          {allScales.map((s) => (
            <option
              key={s.id}
              value={s.id}
            >
              {s.name}
              {scale.autoDetected ? ' (auto)' : ''}
            </option>
          ))}
        </Select>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleExpand}
          title="Scale options"
          className={`shrink-0 ${expanded ? 'text-foreground' : 'text-muted-foreground'}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </Button>
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
