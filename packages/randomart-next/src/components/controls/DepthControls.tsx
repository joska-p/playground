import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Slider } from '@repo/ui/data-entry';
import { setMaxDepth, setMinDepth } from '../../stores/randomart/actions/config';
import { useMaxDepth, useMinDepth } from '../../stores/randomart/selectors';

function DepthControls() {
  const minDepth = useMinDepth();
  const maxDepth = useMaxDepth();

  return (
    <ControlSection
      title="Depth"
      defaultOpen={false}
    >
      <ControlRow label={`Min: ${String(minDepth)}`}>
        <div className="flex items-center gap-2">
          <Slider
            min={1}
            max={12}
            step={1}
            value={minDepth}
            onChange={setMinDepth}
          />
          <span className="text-foreground-dim w-6 text-right font-mono text-xs">{minDepth}</span>
        </div>
      </ControlRow>

      <ControlRow label={`Max: ${String(maxDepth)}`}>
        <div className="flex items-center gap-2">
          <Slider
            min={1}
            max={16}
            step={1}
            value={maxDepth}
            onChange={setMaxDepth}
          />
          <span className="text-foreground-dim w-6 text-right font-mono text-xs">{maxDepth}</span>
        </div>
      </ControlRow>
    </ControlSection>
  );
}

export { DepthControls };
