import { ErrorBoundary } from '@repo/ui/feedback';
import { Docs } from './components/Docs';

/** Interactive workbench for exploring the engine: browse manipulations and run live demos. */
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
