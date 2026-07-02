import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { popoverContentVariants } from './popoverVariants';

type PopoverProps = {
  children: ReactNode;
} & ComponentProps<'div'>;

function Popover({ children, className, ...props }: PopoverProps) {
  return (
    <div
      className={cn('group relative inline-block', className)}
      {...props}
    >
      {children}
    </div>
  );
}

type PopoverTriggerProps = {
  children: ReactNode;
} & ComponentProps<'div'>;

function PopoverTrigger({ children, className, ...props }: PopoverTriggerProps) {
  return (
    <div
      className={cn('inline-flex', className)}
      {...props}
    >
      {children}
    </div>
  );
}

type PopoverContentProps = {
  children: ReactNode;
} & ComponentProps<'div'> &
  VariantProps<typeof popoverContentVariants>;

function PopoverContent({ children, className, side, variant, ...props }: PopoverContentProps) {
  return (
    <div
      className={cn(popoverContentVariants({ side, variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export { Popover };
export type { PopoverContentProps, PopoverProps, PopoverTriggerProps };
