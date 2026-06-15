import type { VariantProps } from 'class-variance-authority';
import type { ErrorInfo, ReactNode } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { DefaultFallback } from './DefaultFallback';
import type { defaultFallbackVariants } from './defaultFallbackVariants';

type ErrorBoundaryProps = {
  children: ReactNode;
  variant?: VariantProps<typeof defaultFallbackVariants>['variant'];
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

function ErrorBoundary({ children, variant, ...props }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      fallbackRender={(fallbackProps: FallbackProps) => (
        <DefaultFallback
          {...fallbackProps}
          variant={variant}
        />
      )}
      {...props}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export { ErrorBoundary };
export type { ErrorBoundaryProps };
