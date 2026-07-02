import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { accordionVariants, accordionItemVariants } from './accordionVariants';

type AccordionProps = {
  children: ReactNode;
} & ComponentProps<'div'> &
  VariantProps<typeof accordionVariants>;

function Accordion({ children, className, variant, ...props }: AccordionProps) {
  return (
    <div className={cn(accordionVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}

type AccordionItemProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
} & ComponentProps<'details'> &
  VariantProps<typeof accordionItemVariants>;

function AccordionItem({ title, defaultOpen, children, className, variant, ...props }: AccordionItemProps) {
  return (
    <details
      open={defaultOpen}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    >
      <summary
        className={cn(
          'text-foreground flex items-center justify-between px-5 py-4 text-sm font-medium cursor-pointer',
          'list-none [&::-webkit-details-marker]:hidden',
          'after:block after:w-2 after:h-2 after:shrink-0',
          'after:border-r-2 after:border-b-2 after:border-muted-foreground',
          'after:-rotate-45 after:transition-transform after:duration-200',
          'group-open:after:rotate-45'
        )}
      >
        {title}
      </summary>
      <div
        className={cn(
          'px-5 pb-4 text-sm text-muted-foreground leading-relaxed',
          'starting:opacity-0 starting:-translate-y-1.5',
          'animate-[accordionIn_0.25s_ease]'
        )}
      >
        {children}
      </div>
    </details>
  );
}

Accordion.Item = AccordionItem;

export { Accordion };
export type { AccordionProps, AccordionItemProps };
