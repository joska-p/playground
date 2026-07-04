import type { DetailsHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../lib/cn';
import { colorVarStyle, type ColorVariant } from '../lib/colorVariant';

export interface AccordionItemProps extends Omit<
  DetailsHTMLAttributes<HTMLDetailsElement>,
  'title'
> {
  title: ReactNode;
  children: ReactNode;
  /** Colors the chevron indicator. Defaults to a neutral grey, matching
   *  the source design (accordions are a structural pattern, not a
   *  status one — color is a subtle accent here, not the main signal). */
  variant?: ColorVariant;
  ref?: Ref<HTMLDetailsElement>;
}

/**
 * AccordionItem — a native <details>/<summary> pair. This is the pattern
 * called out explicitly in the source design's own react-guide: "keep
 * <details>, use open prop." The browser owns the open/closed state
 * entirely — this component is a stateless wrapper that only renders
 * markup from props (pass `open`/`defaultOpen`-style native attributes
 * as needed).
 */
export function AccordionItem({
  className,
  title,
  children,
  variant = 'default',
  style,
  ref,
  ...props
}: AccordionItemProps) {
  return (
    <details
      ref={ref}
      className={cn('bg-surface overflow-hidden rounded-lg', className)}
      style={colorVarStyle(variant, style)}
      {...props}
    >
      <summary className="accordion-trigger text-foreground flex items-center justify-between px-5 py-4 text-[13px] font-medium">
        {title}
      </summary>
      <div className="accordion-body text-foreground-muted px-5 pb-4 text-[13px] leading-relaxed">
        {children}
      </div>
    </details>
  );
}

export function Accordion({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>;
}
