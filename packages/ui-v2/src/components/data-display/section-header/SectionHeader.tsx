import { ArrowRight } from 'lucide-react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../../lib/colorVariant';

type SectionHeaderProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
  linkText?: ReactNode;
  variant?: ColorVariant;
  align?: 'left' | 'center';
  ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

function SectionHeader({
  title,
  description,
  icon,
  href,
  linkText = 'View all',
  variant = 'primary',
  align = 'left',
  className,
  style,
  ref,
  ...props
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-2 font-mono',
        isCenter ? 'items-center text-center' : 'items-start',
        className
      )}
      style={colorVarStyle(variant, style)}
      {...props}
    >
      <div className={cn('flex items-center gap-3', isCenter && 'justify-center')}>
        {icon && (
          <span
            className="flex shrink-0 items-center justify-center"
            style={{ color: 'var(--_color)' }}
          >
            {icon}
          </span>
        )}
        <h2
          className="m-0 text-xs font-bold tracking-wide uppercase"
          style={{ color: 'var(--_color)' }}
        >
          {title}
        </h2>
      </div>

      {description && (
        <p
          className={cn(
            'text-foreground-muted max-w-xl text-sm leading-relaxed',
            isCenter && 'text-center',
            icon && !isCenter ? 'ml-10' : ''
          )}
        >
          {description}
        </p>
      )}

      {href && (
        <a
          href={href}
          className={cn(
            'group mt-1 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase',
            icon && !isCenter ? 'ml-10' : ''
          )}
        >
          <span className="text-[var(--_color)] opacity-60 transition-[opacity,color] group-hover:opacity-100">
            {linkText}
          </span>
          <ArrowRight className="h-4 w-4 text-[var(--_color)] opacity-60 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-100" />
        </a>
      )}
    </div>
  );
}

export { SectionHeader };
export type { SectionHeaderProps };
