import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { heroVariants, type HeroVariants } from './variants';

const COLOR_GRADIENT_FROM = {
  default: 'from-foreground-dim',
  primary: 'from-primary',
  secondary: 'from-secondary',
  accent: 'from-accent',
  warning: 'from-warning',
  destructive: 'from-destructive',
  ghost: 'from-foreground',
  outline: 'from-foreground-dim'
};

interface HeroProps extends HTMLAttributes<HTMLElement>, HeroVariants {
  badgeText?: string;
  title?: string;
  highlight?: string;
  description?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

function Hero({
  badgeText,
  title = 'Creative',
  highlight = 'Playground',
  description,
  children,
  variant,
  className,
  style,
  ref,
  ...props
}: HeroProps) {
  const fromColor = COLOR_GRADIENT_FROM[variant ?? 'default'];

  return (
    <section
      ref={ref}
      className={cn(
        'relative flex min-h-[65vh] flex-col justify-center overflow-hidden px-6 py-[clamp(5rem,8vw,8rem)] font-mono',
        heroVariants({ variant }),
        className
      )}
      style={style}
      {...props}
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {badgeText && (
          <div className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase shadow-xs">
            {badgeText}
          </div>
        )}

        <h1
          className={cn(
            'text-[clamp(2.75rem,7.5vw,5.5rem)]',
            'bg-linear-to-br bg-clip-text leading-tight font-black text-transparent',
            fromColor,
            'via-accent to-secondary'
          )}
        >
          <span className="block text-[clamp(0.75rem,5.5vw,3.5rem)] font-black">{highlight}</span>
          {title}
          <span className="ml-1 animate-ping font-light">_</span>
        </h1>

        {description && (
          <p className="text-foreground-muted mt-6 max-w-xl text-[clamp(1rem,2.5vw,1.125rem)]">
            {description}
          </p>
        )}

        {children && <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>}
      </div>
    </section>
  );
}

export { Hero };
export type { HeroProps };
