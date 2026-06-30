import type { ControlSection } from '@repo/ui/ControlPanel';
import { ControlPanel } from '@repo/ui/ControlPanel';
import { useStepTimer } from '../../hooks/useStepTimer';
import { useCreatureSection } from './useCreatureSection';
import { useDebugSection } from './useDebugSection';
import { useEditSection } from './useEditSection';
import { usePlaybackSection } from './usePlaybackSection';
import { useRuleSection } from './useRuleSection';
import { useShadersSection } from './useShadersSection';

import { useCols, useGeneration, useRows } from '../../stores/simulation/selectors';
import { useShowDebug } from '../../stores/ui/selectors';

function ControlsPanel() {
  const showDebug = useShowDebug();
  const generation = useGeneration();
  const cols = useCols();
  const rows = useRows();
  const { stepTime, roundTripTime } = useStepTimer(generation);

  const playbackSection = usePlaybackSection();
  const editSection = useEditSection();
  const creatureSection = useCreatureSection();
  const ruleSection = useRuleSection();
  const shadersSection = useShadersSection();
  const debugSection = useDebugSection();

  const sections: ControlSection[] = [
    playbackSection,
    editSection,
    creatureSection,
    ruleSection,
    shadersSection,
    debugSection
  ];

  return (
    <ControlPanel
      sections={sections}
      accordion={false}
      footer={
        showDebug && (
          <div className="border-border text-muted-foreground flex flex-col gap-0.5 border-t px-4 py-3 text-xs">
            <div>generation: {generation}</div>
            <div>
              grid: {cols}&times;{rows}
            </div>
            <div>step: {stepTime.toFixed(1)}ms</div>
            <div>rtt: {roundTripTime.toFixed(1)}ms</div>
          </div>
        )
      }
    />
  );
}

export { ControlsPanel };
