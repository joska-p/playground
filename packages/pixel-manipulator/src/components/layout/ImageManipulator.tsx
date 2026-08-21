import { ErrorBoundary } from '@repo/ui/feedback';

import { ControlsPanel } from './ControlsPanel';
import { Outputs } from '../output/Outputs';

function ImageManipulator() {
    return (
        <ErrorBoundary>
            <div className="flex min-h-dvh">
                <main className="min-w-0 flex-1 landscape:mr-72">
                    <Outputs />
                </main>
                <ControlsPanel />
            </div>
        </ErrorBoundary>
    );
}

export { ImageManipulator };
