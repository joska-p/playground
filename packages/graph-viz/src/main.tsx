import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { App } from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div className="text-foreground p-8">Something went wrong.</div>}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
