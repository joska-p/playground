import { ErrorBoundary } from '@repo/ui/feedback';
import { SequenceCanvas } from './components/SequenceCanvas';
import { ControlsPanel } from './components/controls/ControlsPanel';
import { register } from './modules/fourier';

register();

/**
 * Full-screen sequence visualizer: a zoomable/panable canvas plus a controls panel for picking a
 * rule, step count, seed, and the active layer stack.
 */
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
