import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { heroVariants } from './heroVariants';

type HeroProps = {
  badgeText?: string;
  title?: string;
  highlight?: string;
  description?: string;
  children?: ReactNode;
} & ComponentProps<'section'>;

function Hero({
  badgeText,
  title = 'Creative',
  highlight = 'Playground',
  description,
  children,
  className,
  ...props
}: HeroProps) {
  return (
    <section
      className={cn(heroVariants(), className)}
      {...props}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(to right, var(--border) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem'
        }}
        aria-hidden="true"
      />

      {/* Radial fade mask */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 50%, var(--background) 100%)'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {badgeText && (
          <div className="border-primary/20 bg-primary/5 text-primary mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase backdrop-blur-sm">
            {badgeText}
          </div>
        )}

        <div className="flex gap-4">
          <h1
            className="from-primary via-accent to-secondary bg-linear-to-br bg-clip-text leading-tight font-black text-transparent"
            style={{ fontSize: 'clamp(2.75rem,7.5vw,5.5rem)' }}
          >
            <span
              className="block font-black"
              style={{ fontSize: 'clamp(0.75rem,5.5vw,3.5rem)' }}
            >
              {highlight}
            </span>
            {title}
            <span className="cursor ml-1 font-light">_</span>
          </h1>
        </div>

        {description && (
          <p
            className="text-muted-foreground mt-6 max-w-xl"
            style={{ fontSize: 'clamp(1rem,2.5vw,1.125rem)' }}
          >
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
