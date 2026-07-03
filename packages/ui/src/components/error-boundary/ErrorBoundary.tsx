import { type VariantProps } from 'class-variance-authority';
import type { ErrorInfo, ReactNode } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { DefaultFallback } from './DefaultFallback';
import type { defaultFallbackVariants } from './defaultFallbackVariants';

export type ErrorBoundaryProps = {
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
} & VariantProps<typeof defaultFallbackVariants>;

function ErrorBoundary({ children, variant, ...props }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      fallbackRender={(fallbackProps: FallbackProps) => (
        <DefaultFallback
          variant={variant}
          {...fallbackProps}
        />
      )}
      {...props}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export { ErrorBoundary };
