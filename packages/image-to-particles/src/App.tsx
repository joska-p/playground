import { ErrorBoundary } from '@repo/ui/feedback';
import { ImageToParticles } from './components/ImageToParticles';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <ImageToParticles />
      </div>
    </ErrorBoundary>
  );
}

export { App };
