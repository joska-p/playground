import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { getErrorMessage } from 'react-error-boundary';
import { cn } from '../../utils/cn';
import { Button } from '../button/Button';
import { defaultFallbackVariants } from './defaultFallbackVariants';

type DefaultFallbackProps = FallbackProps &
  VariantProps<typeof defaultFallbackVariants> &
  ComponentProps<'div'>;

function DefaultFallback({
  error,
  resetErrorBoundary,
  className,
  variant,
  ...props
}: DefaultFallbackProps) {
  return (
    <div
      className={cn(defaultFallbackVariants({ variant }), className)}
      role="alert"
      {...props}
    >
      <div className="bg-card text-card-foreground flex h-full w-full max-w-sm flex-col gap-4 rounded-lg border p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-destructive/10 text-destructive flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
              <line
                x1="12"
                y1="8"
                x2="12"
                y2="12"
              />
              <line
                x1="12"
                y1="16"
                x2="12.01"
                y2="16"
              />
            </svg>
          </div>
          <h3 className="text-card-foreground text-lg font-semibold">
            Something went wrong
          </h3>
        </div>
        <p className="text-muted-foreground text-sm">
          {getErrorMessage(error)}
        </p>
        {resetErrorBoundary && (
          <Button
            onClick={resetErrorBoundary}
            variant="destructive"
            size="sm"
          >
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}

export { DefaultFallback };
export type { DefaultFallbackProps };
