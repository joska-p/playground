import { ErrorBoundary } from '@repo/ui/feedback';
import { RaduMachineLearning } from './components/RaduMachineLearning';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground h-dvh">
        <RaduMachineLearning />
      </div>
    </ErrorBoundary>
  );
}

export { App };
