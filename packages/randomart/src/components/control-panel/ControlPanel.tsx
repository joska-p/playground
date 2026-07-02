import { ControlPanel as Panel } from '@repo/ui/ControlPanel';
import type { ControlSection } from '@repo/ui/ControlPanel/types';
import { useAnimationSection } from './useAnimationSection';
import { useConfigSection } from './useConfigSection';
import { useDisplaySection } from './useDisplaySection';
import { useGrammarSection } from './useGrammarSection';
import { usePlaybackSection } from './usePlaybackSection';

function ControlPanel() {
  const configSection = useConfigSection();
  const playbackSection = usePlaybackSection();
  const displaySection = useDisplaySection();
  const grammarSection = useGrammarSection();
  const animationSection = useAnimationSection();

  const sections: ControlSection[] = [
    configSection,
    playbackSection,
    displaySection,
    grammarSection,
    animationSection
  ];

  return (
    <Panel
      sections={sections}
      accordion={false}
    />
  );
}

export { ControlPanel };
