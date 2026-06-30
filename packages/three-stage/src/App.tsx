import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
//import { Scene } from './components/scene/Scene';
import { GetStarted } from './components/GetStarted';

function App() {
  return (
    <div className="bg-background text-foreground h-screen">
      <ErrorBoundary>
        <GetStarted />
      </ErrorBoundary>
    </div>
  );
}

export { App };
