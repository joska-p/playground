import { ControlPanel as Panel } from '@repo/ui/ControlPanel';

import { AnimationSection } from './AnimationSection';
import { ConfigSection } from './ConfigSection';
import { DisplaySection } from './DisplaySection';
import { GrammarSection } from './GrammarSection';
import { PlaybackSection } from './PlaybackSection';

function ControlPanel() {
  return (
    <Panel>
      <ConfigSection />
      <PlaybackSection />
      <DisplaySection />
      <GrammarSection />
      <AnimationSection />
    </Panel>
  );
}

export { ControlPanel };
