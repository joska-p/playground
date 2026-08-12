import { ErrorBoundary } from '@repo/ui/feedback';
import { ArtCanvas } from './components/ArtCanvas';

/**
 * The Art Canvas explorer — a full-screen shader art playground. A controls
 * panel switches between four input modes (seed, folded-space, atlas, manual)
 * and drives each mode's own parameters.
 */
function App() {
    return (
        <div className="bg-background text-foreground relative h-screen">
            <ErrorBoundary>
                <ArtCanvas />
            </ErrorBoundary>
        </div>
    );
}

export { App };
