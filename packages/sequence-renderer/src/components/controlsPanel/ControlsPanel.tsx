import { ControlPanel } from '@repo/ui/ControlPanel';
import { LayerStackEditor } from '../layers/LayerStackEditor';
import { SequenceSection } from './SequenceSection';
import { ViewportSection } from './ViewportSection';

function ControlsPanel() {
  return (
    <ControlPanel>
      <SequenceSection />
      <ViewportSection />
      <LayerStackEditor />
    </ControlPanel>
  );
}

export { ControlsPanel };
