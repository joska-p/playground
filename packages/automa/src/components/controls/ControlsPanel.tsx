import { ControlPanel } from '@repo/ui';
import { useStepTimer } from '../../hooks/useStepTimer';
import { useCols, useGeneration, useRows } from '../../stores/simulation/selectors';
import { useShowDebug } from '../../stores/ui/selectors';
import { CreatureSection } from './CreatureSection';
import { DebugSection } from './DebugSection';
import { EditSection } from './EditSection';
import { PlaybackSection } from './PlaybackSection';
import { RuleSection } from './RuleSection';
import { ShaderSection } from './ShaderSection';

function ControlsPanel() {
  const showDebug = useShowDebug();
  const generation = useGeneration();
  const cols = useCols();
  const rows = useRows();
  const { stepTime, roundTripTime } = useStepTimer(generation);

  return (
    <ControlPanel title="controls">
      <PlaybackSection />
      <EditSection />
      <CreatureSection />
      <RuleSection />
      <ShaderSection />
      <DebugSection />
      {showDebug && (
        <div className="border-border text-muted-foreground flex flex-col gap-0.5 border-t px-4 py-3 text-xs">
          <div>generation: {generation}</div>
          <div>
            grid: {cols}&times;{rows}
          </div>
          <div>step: {stepTime.toFixed(1)}ms</div>
          <div>rtt: {roundTripTime.toFixed(1)}ms</div>
        </div>
      )}
    </ControlPanel>
  );
}

export { ControlsPanel };
