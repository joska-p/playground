import { ErrorBoundary } from '@repo/tlc/components/display';
import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';

import { MosaicControlsPanel } from './components/controls/MosaicControlsPanel';
import { MosaicDisplay } from './components/MosaicDisplay';

function App() {
    return (
        <ErrorBoundary>
            <Shell>
                <ShellCanvas>
                    <MosaicDisplay />
                </ShellCanvas>
                <ShellPanels>
                    <MosaicControlsPanel />
                </ShellPanels>
            </Shell>
        </ErrorBoundary>
    );
}

export { App };
