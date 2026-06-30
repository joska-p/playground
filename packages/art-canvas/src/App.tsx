import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { ArtCanvas } from './components/ArtCanvas';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <ErrorBoundary>
        <ArtCanvas />
      </ErrorBoundary>
    </div>
  );
}

export { App };
