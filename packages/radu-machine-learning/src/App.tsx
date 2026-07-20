import { ErrorBoundary } from '@repo/ui/feedback';
import { RaduMachineLearning } from './components/RaduMachineLearning';

function App() {
  return (
    <ErrorBoundary>
      <RaduMachineLearning />
    </ErrorBoundary>
  );
}

export { App };
