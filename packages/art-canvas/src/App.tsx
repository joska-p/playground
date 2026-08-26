import { ErrorBoundary } from '@repo/tlc/components/display';
import { FieldRow, Select } from '@repo/tlc/components/forms';
import { Panel } from '@repo/tlc/layout';
import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';
import { Atlas } from './modules/atlas/Atlas';
import { AtlasControls } from './modules/atlas/controls/AtlasControls';
import { FoldedSpace } from './modules/folded-space/FoldedSpace';
import { Manual } from './modules/manual/Manual';
import { ManualControls } from './modules/manual/ManualControls';
import { SeedCanvas } from './modules/seed/SeedCanvas';
import { SeedControls } from './modules/seed/SeedControls';
import { Spirale } from './modules/spirale/Spirale';
import { SpiraleControls } from './modules/spirale/SpiraleControls';
import { setInpuMode, useInputMode } from './stores/ui/store';
import type { InputMode } from './stores/ui/store';

const inputModes: InputMode[] = ['spirale', 'seed', 'folded-space', 'atlas', 'manual'];
const inputModeOptions = inputModes.map((mode) => ({
    label: mode.charAt(0).toUpperCase() + mode.slice(1),
    value: mode
}));

function App() {
    const inputMode = useInputMode();

    return (
        <ErrorBoundary>
            <Shell>
                <ShellCanvas>
                    {inputMode === 'spirale' && <Spirale />}
                    {inputMode === 'seed' && <SeedCanvas />}
                    {inputMode === 'folded-space' && <FoldedSpace />}
                    {inputMode === 'atlas' && <Atlas />}
                    {inputMode === 'manual' && <Manual />}
                </ShellCanvas>

                <ShellPanels>
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
                </ShellPanels>
            </Shell>
        </ErrorBoundary>
    );
}

export { App };
