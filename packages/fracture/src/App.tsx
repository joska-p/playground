import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';
import { Activity } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { DoubleSplitScene } from './components/DoubleSplitScene';
import { OriginalScene } from './components/OriginalScene';
import { PerturbationScene } from './components/PerturbationScene';
import { useRenderer } from './stores/viewStore';

function App() {
    const renderer = useRenderer();

    return (
        <Shell>
            <ShellCanvas>
                <Activity mode={renderer === 'double-single' ? 'visible' : 'hidden'}>
                    {<DoubleSplitScene />}
                </Activity>
                <Activity mode={renderer === 'perturbation' ? 'visible' : 'hidden'}>
                    <PerturbationScene />
                </Activity>
                <Activity mode={renderer === 'original' ? 'visible' : 'hidden'}>
                    <OriginalScene />
                </Activity>
            </ShellCanvas>

            <ShellPanels>
                <ControlPanel />
            </ShellPanels>
        </Shell>
    );
}

export { App };
