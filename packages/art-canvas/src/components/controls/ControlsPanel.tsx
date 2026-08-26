import { FieldRow, Select } from '@repo/tlc/components/forms';
import { Panel } from '@repo/tlc/layout';

import { AtlasControls } from '../../modules/atlas/controls/AtlasControls';
import { ManualControls } from '../../modules/manual/ManualControls';
import { SeedControls } from '../../modules/seed/SeedControls';
import { SpiraleControls } from '../../modules/spirale/SpiraleControls';
import { setInpuMode, useInputMode } from '../../stores/ui/store';

import type { InputMode } from '../../stores/ui/store';

const inputModes: InputMode[] = ['spirale', 'seed', 'folded-space', 'atlas', 'manual'];
const inputModeOptions = inputModes.map((mode) => ({
    label: mode.charAt(0).toUpperCase() + mode.slice(1),
    value: mode
}));

function ControlsPanel() {
    const inputMode = useInputMode();

    return (
        <Panel title="controls">
            <FieldRow label="Mode">
                <Select
                    value={inputMode}
                    onChange={(val) => {
                        setInpuMode(val as InputMode);
                    }}
                    options={inputModeOptions}
                />
            </FieldRow>

            {inputMode === 'spirale' && <SpiraleControls />}
            {inputMode === 'seed' && <SeedControls />}
            {inputMode === 'atlas' && <AtlasControls />}
            {inputMode === 'manual' && <ManualControls />}
        </Panel>
    );
}

export { ControlsPanel };
