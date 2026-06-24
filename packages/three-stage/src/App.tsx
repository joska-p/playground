import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
//import { Scene } from './components/scene/Scene';
import { GetStarted } from './components/GetStarted';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground h-screen">
        <GetStarted />
      </div>
    </ErrorBoundary>
  );
}

export { App };
