import { ErrorBoundary } from '@repo/tlc/components/display';

import { ArtCanvas } from './components/ArtCanvas';

function App() {
    return (
        <div className="bg-background text-foreground relative h-screen">
            <ErrorBoundary>
                <ArtCanvas />
            </ErrorBoundary>
        </div>
    );
}

export { App };
