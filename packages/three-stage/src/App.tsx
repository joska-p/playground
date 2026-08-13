import { ErrorBoundary } from '@repo/ui/feedback';
//import { Scene } from './components/scene/Scene';
import { GetStarted } from './components/GetStarted';

/**
 * Main application component for Three Stage — renders interactive 3D scenes within an error
 * boundary.
 */
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
