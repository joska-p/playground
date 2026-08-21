import { Activity } from 'react';

import { ControlPanel } from './components/ControlPanel';
import { DoubleSplitScene } from './components/DoubleSplitScene';
import { OriginalScene } from './components/OriginalScene';
import { PerturbationScene } from './components/PerturbationScene';
import { useRenderer } from './stores/viewStore';

/**
 * High-precision GLSL fractal renderer application component.
 *
 * Toggles between standard, double-single, and perturbation GLSL scene renderers.
 */
function App() {
    const renderer = useRenderer();

    return (
        <div className="bg-background text-foreground min-h-screen grid place-items-center relative">
            <Activity mode={renderer === 'double-single' ? 'visible' : 'hidden'}>
                {<DoubleSplitScene />}
            </Activity>
            <Activity mode={renderer === 'perturbation' ? 'visible' : 'hidden'}>
                <PerturbationScene />
            </Activity>
            <Activity mode={renderer === 'original' ? 'visible' : 'hidden'}>
                <OriginalScene />
            </Activity>
            <ControlPanel />
        </div>
    );
}

export { App };
