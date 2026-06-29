import { Button } from '@repo/ui/Button';
import { Switch } from '@repo/ui/Switch';
import type { VisualLayer } from '../../core/types';
import { LayerOptionsPanel } from './LayerOptionsPanel';

type LayerRowProps = {
  meta: VisualLayer;
  enabled: boolean;
  params: Record<string, unknown>;
  isExpanded: boolean;
  onToggle: () => void;
  onToggleExpand: () => void;
  onParamChange: (key: string, value: unknown) => void;
  onRemove: () => void;
};

function LayerRow({
  meta,
  enabled,
  params,
  isExpanded,
  onToggle,
  onToggleExpand,
  onParamChange,
  onRemove
}: LayerRowProps) {
  return (
    <div className="border-border bg-card flex flex-col gap-2 rounded border px-2 py-1.5">
      <div className="flex items-center gap-1.5">
        <Switch
          variant="secondary"
          size="sm"
          checked={enabled}
          onCheckedChange={onToggle}
        />

        <span
          className={`flex-1 cursor-pointer text-xs font-medium ${
            enabled ? 'text-foreground' : 'text-muted-foreground'
          }`}
          onClick={onToggle}
        >
          {meta.name}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleExpand}
          title="Options"
          className={isExpanded ? 'text-foreground' : 'text-muted-foreground'}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle
              cx="12"
              cy="5"
              r="1"
            />
            <circle
              cx="12"
              cy="12"
              r="1"
            />
            <circle
              cx="12"
              cy="19"
              r="1"
            />
          </svg>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          title="Remove layer"
          className="text-muted-foreground hover:text-destructive"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </Button>
      </div>

      {isExpanded && (
        <LayerOptionsPanel
          params={meta.params} // No unsafe casting needed anymore!
          values={params}
          onChange={onParamChange}
        />
      )}
    </div>
  );
}

export { LayerRow };
