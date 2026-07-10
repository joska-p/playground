import { TriangleAlert } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../data-entry/button/Button';
import type { DefaultFallbackVariants } from './variants';
import { defaultFallbackVariants, fallbackIconColor } from './variants';

export interface DefaultFallbackProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, DefaultFallbackVariants {
  error: Error;
  reset: () => void;
  title?: ReactNode;
  description?: ReactNode;
  resetLabel?: string;
  className?: string;
}

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
        <TriangleAlert className={cn('h-4 w-4 shrink-0', fallbackIconColor[key])} />
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
