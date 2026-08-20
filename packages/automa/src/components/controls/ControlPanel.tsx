import { ControlPanel as Panel } from '@repo/ui/control-panel';
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
