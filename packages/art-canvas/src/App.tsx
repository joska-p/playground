import { ErrorBoundary } from '@repo/ui/feedback';
import { ArtCanvas } from './components/ArtCanvas';

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
