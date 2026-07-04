import type { HTMLAttributes, ReactNode } from 'react';
import { useScrollRevealState } from '../../../hooks/useScrollRevealState';
import { cn } from '../../../lib/cn';

export type ScrollRevealProps = {
  children: ReactNode;
  threshold?: number;
} & HTMLAttributes<HTMLElement>;

function ScrollReveal({ children, threshold = 0.08, className, ...props }: ScrollRevealProps) {
  const { ref, visible } = useScrollRevealState(threshold);

  return (
    <section
      ref={ref}
      className={cn(
        'translate-y-4 font-mono opacity-0 transition-all duration-500 ease-out',
        visible && 'translate-y-0 opacity-100',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export { ScrollReveal };
