import { ErrorBoundary } from '@repo/tlc/components/display';
import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';
import { ControlsPanel } from './components/controls/ControlsPanel';
import { SequenceCanvas } from './components/SequenceCanvas';
import { register } from './modules/fourier';

register();

function App() {
    return (
        <Shell>
            <ErrorBoundary>
                <ShellCanvas>
                    <SequenceCanvas />
                </ShellCanvas>

                <ShellPanels>
                    <ControlsPanel />
                </ShellPanels>
            </ErrorBoundary>
        </Shell>
    );
}

export { App };
