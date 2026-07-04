import { forwardRef, type DetailsHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface AccordionItemProps
  extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "title"> {
  title: ReactNode;
  children: ReactNode;
}

/**
 * AccordionItem — a native <details>/<summary> pair. This is the pattern
 * called out explicitly in the source design's own react-guide: "keep
 * <details>, use open prop." No JS state, no ARIA to hand-roll — the
 * browser provides all of it, and it degrades perfectly with CSS disabled.
 */
export const AccordionItem = forwardRef<HTMLDetailsElement, AccordionItemProps>(
  ({ className, title, children, ...props }, ref) => (
    <details ref={ref} className={cn("bg-surface rounded-lg overflow-hidden", className)} {...props}>
      <summary className="accordion-trigger text-foreground flex items-center justify-between px-5 py-4 text-[13px] font-medium">
        {title}
      </summary>
      <div className="accordion-body text-foreground-muted px-5 pb-4 text-[13px] leading-relaxed">
        {children}
      </div>
    </details>
  )
);
AccordionItem.displayName = "AccordionItem";

export function Accordion({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}
