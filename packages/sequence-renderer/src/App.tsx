import { ErrorBoundary } from '@repo/tlc/components/display';

import { ControlsPanel } from './components/controls/ControlsPanel';
import { SequenceCanvas } from './components/SequenceCanvas';
import { register } from './modules/fourier';

register();

function App() {
    return (
        <div className="relative h-screen overflow-hidden">
            <ErrorBoundary>
                <SequenceCanvas />
                <ControlsPanel />
            </ErrorBoundary>
        </div>
    );
}

export { App };
