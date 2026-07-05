import { ErrorBoundary } from '@repo/ui/feedback';
import { Docs } from './components/Docs';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground min-h-screen">
        <Docs />
      </div>
    </ErrorBoundary>
  );
}

export { App };
