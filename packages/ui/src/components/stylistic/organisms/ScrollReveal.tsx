import type { ComponentProps, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { scrollRevealVariants } from './scrollRevealVariants';

type ScrollRevealProps = {
  children: ReactNode;
  threshold?: number;
} & ComponentProps<'section'>;

function ScrollReveal({ children, threshold = 0.08, className, ...props }: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);

    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [threshold]);

  return (
    <section
      ref={ref}
      className={cn(scrollRevealVariants(), visible && 'translate-y-0 opacity-100', className)}
      {...props}
    >
      {children}
    </section>
  );
}

export { ScrollReveal };
export type { ScrollRevealProps };
