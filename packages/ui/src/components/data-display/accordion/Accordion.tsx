import type { DetailsHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { accordionItemVariants, type AccordionItemVariants } from './variants';

export interface AccordionItemProps
  extends DetailsHTMLAttributes<HTMLDetailsElement>, AccordionItemVariants {
  title: string;
  children: ReactNode;
  ref?: Ref<HTMLDetailsElement>;
}

export function AccordionItem({
  className,
  title,
  children,
  variant,
  ref,
  ...props
}: AccordionItemProps) {
  return (
    <details
      ref={ref}
      className={cn('group bg-surface overflow-hidden rounded-lg', className)}
      {...props}
    >
      <summary className="text-foreground flex cursor-pointer items-center justify-between px-5 py-4 font-medium">
        {title}
        <span className={cn(accordionItemVariants({ variant }))} />
      </summary>
      <div className={'accordion-body text-foreground-muted px-5 pb-4 leading-relaxed'}>
        {children}
      </div>
    </details>
  );
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function Accordion({ className, children, ref, ...props }: AccordionProps) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}
