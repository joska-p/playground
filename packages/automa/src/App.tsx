import { ErrorBoundary } from '@repo/tlc/components/display';
import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';

import { CellMesh } from './components/canvas/CellMesh.tsx';
import { ControlPanel } from './components/controls/ControlPanel';

function App() {
    return (
        <ErrorBoundary>
            <Shell>
                <ShellCanvas>
                    <CellMesh />
                </ShellCanvas>
                <ShellPanels>
                    <ControlPanel />
                </ShellPanels>
            </Shell>
        </ErrorBoundary>
    );
}

export { App };
