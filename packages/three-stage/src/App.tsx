import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Scene } from './components/scene/Scene';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground h-screen">
        <Scene />
      </div>
    </ErrorBoundary>
  );
}

export { App };
