import { Panel } from '@repo/tlc/layout';

import { SequenceSection } from './SequenceSection';
import { ViewportSection } from './ViewportSection';
import { LayerStackEditor } from '../layers/LayerStackEditor';

function ControlsPanel() {
    return (
        <Panel title="controls">
            <SequenceSection />
            <ViewportSection />
            <LayerStackEditor />
        </Panel>
    );
}

export { ControlsPanel };
