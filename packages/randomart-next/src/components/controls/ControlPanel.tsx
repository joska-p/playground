import { Panel, PanelHeader } from '@repo/tlc/layout';

import { ActionControls } from './ActionControls';
import { BehaviorControls } from './BehaviorControls';
import { ConfigControls } from './ConfigControls';
import { DepthControls } from './DepthControls';
import { OperatorControls } from './OperatorControls';
import { PlaybackControls } from './PlaybackControls';
import { setMode } from '../../stores/randomart/actions/config';
import { useMode } from '../../stores/randomart/selectors';

import type { Mode } from '../../stores/randomart/types';

const modeOptions = [
    { value: 'play', label: 'Play' },
    { value: 'test', label: 'Test' }
] as const;

function ModeSelect() {
    const mode = useMode();

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMode(e.target.value as Mode);
    };

    return (
        <select
            value={mode}
            onChange={handleOnChange}
        >
            {modeOptions.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}

function PlayModeControlPanel() {
    return (
        <>
            <ConfigControls />
            <ActionControls />
            <PlaybackControls />
            <DepthControls />
            <OperatorControls />
            <BehaviorControls />
        </>
    );
}

function ControlPanel() {
    const mode = useMode();

    return (
        <Panel className="h-full">
            <PanelHeader>
                <ModeSelect />
            </PanelHeader>
            <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">
                {mode === 'play' && <PlayModeControlPanel />}
            </div>
        </Panel>
    );
}

export { ControlPanel };
