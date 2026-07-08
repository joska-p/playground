import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../../lib/colorVariant';

type HeroProps = {
  badgeText?: string;
  title?: string;
  highlight?: string;
  description?: string;
  children?: ReactNode;
  variant?: ColorVariant;
  ref?: Ref<HTMLElement>;
} & HTMLAttributes<HTMLElement>;

function Hero({
  badgeText,
  title = 'Creative',
  highlight = 'Playground',
  description,
  children,
  variant = 'primary',
  className,
  style,
  ref,
  ...props
}: HeroProps) {
  return (
    <section
      ref={ref}
      className={cn(
        'relative flex min-h-[65vh] flex-col justify-center overflow-hidden px-6 py-[clamp(5rem,8vw,8rem)] font-mono',
        className
      )}
      style={colorVarStyle(variant, style)}
      {...props}
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {badgeText && (
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase shadow-xs"
            style={{
              background: 'color-mix(in srgb, var(--_color) 15%, transparent)',
              color: 'var(--_color)'
            }}
          >
            {badgeText}
          </div>
        )}

        <h1
          className="via-accent to-secondary from-(--_color bg-linear-to-br bg-clip-text leading-tight font-black text-transparent"
          style={{ fontSize: 'clamp(2.75rem,7.5vw,5.5rem)' }}
        >
          <span
            className="block font-black"
            style={{ fontSize: 'clamp(0.75rem,5.5vw,3.5rem)' }}
          >
            {highlight}
          </span>
          {title}
          <span className="ml-1 animate-ping font-light">_</span>
        </h1>

        {description && (
          <p
            className="text-foreground-muted mt-6 max-w-xl"
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
