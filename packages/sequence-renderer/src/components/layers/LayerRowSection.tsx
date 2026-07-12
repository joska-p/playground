import { ControlGrid, ControlSubsection } from '@repo/ui/control-panel';
import { Button, Switch } from '@repo/ui/data-entry';
import type { VisualLayer } from '../../core/types';
import { LayerOptionSection } from './LayerOptionSection';

type LayerRowSectionProps = {
  meta: VisualLayer;
  enabled: boolean;
  params: Record<string, unknown>;
  isExpanded: boolean;
  onToggle: () => void;
  onToggleExpand: () => void;
  onParamChange: (key: string, value: unknown) => void;
  onRemove: () => void;
};

function LayerRowSection({
  meta,
  enabled,
  params,
  isExpanded,
  onToggle,
  onToggleExpand,
  onParamChange,
  onRemove
}: LayerRowSectionProps) {
  return (
    <ControlSubsection title={meta.name}>
      <ControlGrid
        columns={3}
        className="items-center"
      >
        <Switch
          variant="secondary"
          checked={enabled}
          onChange={onToggle}
        />

        <Button
          variant="default"
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
          variant="default"
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
      </ControlGrid>

      {isExpanded && (
        <LayerOptionSection
          params={meta.params}
          values={params}
          onChange={onParamChange}
        />
      )}
    </ControlSubsection>
  );
}

export { LayerRowSection };
