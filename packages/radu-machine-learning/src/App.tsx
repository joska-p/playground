import { ErrorBoundary } from '@repo/ui/feedback';

import { ControlPanel } from './components/ControlPanel';
import { Samples } from './components/Samples';
import { setBaseUrl } from './stores/selection';

function App({ baseUrl = '/' }: { baseUrl?: string }) {
    setBaseUrl(baseUrl);

    return (
        <ErrorBoundary>
            <div className="bg-background text-foreground relative h-screen overflow-hidden">
                <Samples />
                <ControlPanel />
            </div>
        </ErrorBoundary>
    );
}

export { App };
