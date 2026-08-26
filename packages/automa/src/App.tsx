import { ErrorBoundary } from '@repo/tlc/components/display';

import { CellMesh } from './components/canvas/CellMesh.tsx';
import { ControlPanel } from './components/controls/ControlPanel';

function App() {
    return (
        <div className="relative h-screen overflow-hidden">
            <ErrorBoundary>
                <CellMesh />
                <ControlPanel />
            </ErrorBoundary>
        </div>
    );
}

export { App };
