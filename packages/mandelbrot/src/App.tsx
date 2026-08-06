import { ErrorBoundary } from '@repo/ui/feedback';
import { MandelbrotViewer } from './components/mandelbrot-viewer';

function App() {
    return (
        <ErrorBoundary>
            <MandelbrotViewer />
        </ErrorBoundary>
    );
}

export { App };
