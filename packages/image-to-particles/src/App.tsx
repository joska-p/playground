import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { ImageToParticles } from './components/ImageToParticles';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground min-h-screen">
        <ImageToParticles />
      </div>
    </ErrorBoundary>
  );
}

export { App };
