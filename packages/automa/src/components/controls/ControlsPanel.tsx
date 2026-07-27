import { ControlPanel } from '@repo/ui/control-panel';
import { CreatureSection } from './CreatureSection';
import { DebugSection } from './DebugSection';
import { EditSection } from './EditSection';
import { PlaybackSection } from './PlaybackSection';
import { RuleSection } from './RuleSection';

function ControlsPanel() {
  return (
    <ControlPanel title="controls">
      <PlaybackSection />
      <EditSection />
      <CreatureSection />
      <RuleSection />
      <DebugSection />
    </ControlPanel>
  );
}

export { ControlsPanel };
