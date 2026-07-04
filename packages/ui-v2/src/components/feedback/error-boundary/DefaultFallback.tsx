import type { VariantProps } from 'class-variance-authority';
import { TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../../data-entry/button/Button';
import { cn } from '../../lib/cn';
import { defaultFallbackVariants, fallbackIconColor } from './DefaultFallback.variants';

export type DefaultFallbackProps = {
  error: Error;
  reset: () => void;
  title?: ReactNode;
  description?: ReactNode;
  /** Label for the recovery button. Defaults to "try again". */
  resetLabel?: string;
  className?: string;
} & VariantProps<typeof defaultFallbackVariants>

/**
 * DefaultFallback — the panel <ErrorBoundary> renders when it catches an
 * error and no custom `fallback` prop was given. Stateless: purely a
 * function of `error`/`reset`/`variant`, exactly like every other
 * component in this library — the class-component state lives in
 * ErrorBoundary alone (see that file for why).
 */
export function DefaultFallback({
  error,
  reset,
  variant = 'destructive',
  title = 'something went wrong',
  description,
  resetLabel = 'try again',
  className
}: DefaultFallbackProps) {
  const key = variant ?? 'destructive';
  return (
    <div
      className={cn(defaultFallbackVariants({ variant }), className)}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <TriangleAlert className={cn('h-4 w-4 flex-shrink-0', fallbackIconColor[key])} />
        <p className="text-foreground text-[14px] font-medium">{title}</p>
      </div>
      <p className="text-foreground-muted text-[12px] leading-relaxed">
        {description ?? error.message}
      </p>
      <Button
        variant={variant ?? 'destructive'}
        size="sm"
        onClick={reset}
      >
        {resetLabel}
      </Button>
    </div>
  );
}
