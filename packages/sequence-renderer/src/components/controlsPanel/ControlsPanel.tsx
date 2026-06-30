import type { ControlSection } from '@repo/ui/ControlPanel';
import { ControlPanel } from '@repo/ui/ControlPanel';
import { LayerStackEditor } from '../layers/LayerStackEditor';
import { useSequenceSection } from './useSequenceSection';
import { useViewportSection } from './useViewportSection';

function ControlsPanel() {
  const sequenceSection = useSequenceSection();
  const viewportSection = useViewportSection();

  const sections: ControlSection[] = [
    sequenceSection,
    viewportSection,
  ];

  return (
    <ControlPanel
      sections={sections}
      accordion={false}
      footer={<LayerStackEditor />}
    />
  );
}

export { ControlsPanel };
