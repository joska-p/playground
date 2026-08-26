import { ErrorBoundary } from '@repo/tlc/components/display';

import { GetStarted } from './components/GetStarted';

function App() {
    return (
        <div className="h-screen">
            <ErrorBoundary>
                <GetStarted />
            </ErrorBoundary>
        </div>
    );
}

export { App };
