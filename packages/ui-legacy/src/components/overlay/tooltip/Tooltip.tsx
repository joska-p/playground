import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { tooltipVariants } from './tooltipVariants';

type TooltipProps = {
  content: string;
  children: ReactNode;
} & ComponentProps<'span'> &
  VariantProps<typeof tooltipVariants>;

function Tooltip({ content, variant, children, className }: TooltipProps) {
  return (
    <span
      className={cn(tooltipVariants({ variant }), className)}
      data-tooltip={content}
    >
      {children}
    </span>
  );
}

export { Tooltip };
