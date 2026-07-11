import { ControlSection } from '@repo/ui/control-panel';
import { useStepTimer } from '../../hooks/useStepTimer';
import { useCols, useGeneration, useRows } from '../../stores/simulation/selectors';

function DebugSection() {
  const generation = useGeneration();
  const cols = useCols();
  const rows = useRows();
  const { stepTime, roundTripTime } = useStepTimer(generation);

  return (
    <ControlSection
      title="Debug"
      defaultOpen={false}
    >
      <div className="border-border text-muted-foreground flex flex-col gap-0.5 border-t px-4 py-3 text-xs">
        <div>generation: {generation}</div>
        <div>
          grid: {cols}&times;{rows}
        </div>
        <div>step: {stepTime.toFixed(1)}ms</div>
        <div>rtt: {roundTripTime.toFixed(1)}ms</div>
      </div>
    </ControlSection>
  );
}

export { DebugSection };
