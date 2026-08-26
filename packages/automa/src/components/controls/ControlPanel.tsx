import { Panel } from '@repo/tlc/layout';

import { CreatureSection } from './CreatureSection';
import { EditSection } from './EditSection';
import { PlaybackSection } from './PlaybackSection';
import { RuleSection } from './RuleSection';

function ControlPanel() {
    return (
        <Panel title="controls">
            <PlaybackSection />
            <EditSection />
            <CreatureSection />
            <RuleSection />
        </Panel>
    );
}

export { ControlPanel };
