import { ErrorBoundary } from '@repo/tlc/components/display';

import { ImageToParticles } from './components/ImageToParticles';

function App() {
    return (
        <ErrorBoundary>
            <div className="min-h-screen">
                <ImageToParticles />
            </div>
        </ErrorBoundary>
    );
}

export { App };
