import { ControlPanel } from '@repo/ui/control-panel';

import { SequenceSection } from './SequenceSection';
import { ViewportSection } from './ViewportSection';
import { LayerStackEditor } from '../layers/LayerStackEditor';

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
