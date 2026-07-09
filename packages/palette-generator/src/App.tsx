import { ErrorBoundary } from '@repo/ui/feedback';
import { PaletteGenerator } from './components/PaletteGenerator';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <PaletteGenerator />
      </div>
    </ErrorBoundary>
  );
}

export { App };
