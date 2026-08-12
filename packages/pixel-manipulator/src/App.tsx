import { ImageManipulator } from './components/layout/ImageManipulator';

/**
 * Self-contained image-manipulation workbench: upload an image, chain manipulation steps into a
 * workflow, run it, and inspect each step's result.
 */
function App() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <ImageManipulator />
        </div>
    );
}

export { App };
