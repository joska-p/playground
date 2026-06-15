import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { PipelineDocs } from './components/pipeline-docs/PipelineDocs';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground min-h-screen">
        <PipelineDocs />
      </div>
    </ErrorBoundary>
  );
}

export { App };
