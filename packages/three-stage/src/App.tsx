import { ErrorBoundary } from '@repo/ui/feedback';
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
