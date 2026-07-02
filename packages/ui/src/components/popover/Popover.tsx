import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type PopoverProps = {
  children: ReactNode;
} & ComponentProps<'div'>;

function Popover({ children, className, ...props }: PopoverProps) {
  return (
    <div className={cn('group relative inline-block', className)} {...props}>
      {children}
    </div>
  );
}

type PopoverTriggerProps = {
  children: ReactNode;
} & ComponentProps<'div'>;

function PopoverTrigger({ children, className, ...props }: PopoverTriggerProps) {
  return (
    <div className={cn('inline-flex', className)} {...props}>
      {children}
    </div>
  );
}

type PopoverContentProps = {
  children: ReactNode;
} & ComponentProps<'div'>;

function PopoverContent({ children, className, ...props }: PopoverContentProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] z-50',
        'opacity-0 transition-all duration-200',
        'group-hover:pointer-events-auto group-hover:opacity-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export { Popover };
export type { PopoverProps, PopoverTriggerProps, PopoverContentProps };
