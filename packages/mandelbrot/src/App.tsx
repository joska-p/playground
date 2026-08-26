import { ErrorBoundary } from '@repo/tlc/components/display';
import { MandelbrotViewer } from './components/mandelbrot-viewer';

function App() {
    return (
        <ErrorBoundary>
            <MandelbrotViewer />
        </ErrorBoundary>
    );
}

export { App };
