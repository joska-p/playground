import { ErrorBoundary } from '@repo/tlc/components/display';
import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';

import { ControlsPanel } from './components/layout/ControlsPanel';
import { Outputs } from './components/output/Outputs';

function App() {
    return (
        <ErrorBoundary>
            <Shell>
                <ShellCanvas>
                    <Outputs />
                </ShellCanvas>

                <ShellPanels>
                    <ControlsPanel />
                </ShellPanels>
            </Shell>
        </ErrorBoundary>
    );
}

export { App };
