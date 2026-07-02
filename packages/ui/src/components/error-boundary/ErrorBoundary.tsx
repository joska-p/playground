import type { ErrorInfo, ReactNode } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { DefaultFallback } from './DefaultFallback';

type ErrorBoundaryProps = {
  children: ReactNode;
  onError?: (error: unknown, info: ErrorInfo) => void;
  onReset?: (
    details:
      | { reason: 'imperative-api'; args: unknown[] }
      | {
          reason: 'keys';
          prev: unknown[] | undefined;
          next: unknown[] | undefined;
        }
  ) => void;
  resetKeys?: unknown[];
};

function ErrorBoundary({ children, ...props }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      fallbackRender={(fallbackProps: FallbackProps) => (
        <DefaultFallback {...fallbackProps} />
      )}
      {...props}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export { ErrorBoundary };
export type { ErrorBoundaryProps };
