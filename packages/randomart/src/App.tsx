import { ErrorBoundary } from '@repo/tlc/components/display';
import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';
import { ControlPanel } from './components/controls/ControlPanel';
import { RandomArtCanvas } from './components/RandomArtCanvas';
import { TestMode } from './components/testMode/TestMode';
import { useMode } from './stores/randomart/selectors';

function App() {
    const mode = useMode();

    return (
        <ErrorBoundary>
            <Shell>
                <ShellCanvas>{mode === 'test' ? <TestMode /> : <RandomArtCanvas />}</ShellCanvas>

                <ShellPanels>
                    <ControlPanel />
                </ShellPanels>
            </Shell>
        </ErrorBoundary>
    );
}

export { App };
