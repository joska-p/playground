import { ErrorBoundary } from '@repo/ui/feedback';
import { Docs } from './components/Docs';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Docs />
      </div>
    </ErrorBoundary>
  );
}

export { App };
