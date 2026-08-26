import { ErrorBoundary } from '@repo/tlc';

import { Docs } from './components/Docs';

function App() {
    return (
        <ErrorBoundary>
            <div className="min-h-screen">
                <Docs />
            </div>
        </ErrorBoundary>
    );
}

export { App };
