import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { PaletteGenerator } from './components/PaletteGenerator';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground min-h-screen">
        <PaletteGenerator />
      </div>
    </ErrorBoundary>
  );
}

export { App };
