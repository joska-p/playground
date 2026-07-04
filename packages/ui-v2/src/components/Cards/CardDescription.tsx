import type { ComponentProps, Ref } from 'react';
import { cn } from '../../lib/cn';

export interface CardDescriptionProps extends ComponentProps<'p'> {
  ref?: Ref<HTMLParagraphElement>;
}

/**
 * A card's supporting text — typography only, no props beyond
 * standard paragraph attributes. Doesn't clamp by default: both
 * ProjectCard and DocCard already pass `line-clamp-2` via `className`
 * where they want it, so a card that wants the full description
 * un-truncated gets that for free instead of having to fight a
 * built-in clamp.
 */
export function CardDescription({ ref, className, children, ...props }: CardDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    >
      {children}
    </p>
  );
}
