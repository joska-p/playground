import { ArrowRight } from 'lucide-react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import type { IconName } from '../../icons';
import { Icon } from '../../icons';
import { sectionHeaderVariants, type SectionHeaderVariants } from './variants';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement>, SectionHeaderVariants {
  title: string;
  description?: string;
  iconName?: IconName;
  href?: string;
  linkText?: ReactNode;
  align?: 'left' | 'center';
  ref?: Ref<HTMLDivElement>;
}

export function SectionHeader({
  title,
  description,
  iconName = 'home',
  href,
  linkText = 'View all',
  variant,
  align,
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
        sectionHeaderVariants({ variant }),
        isCenter ? 'items-center text-center' : 'items-start',
        className
      )}
      style={style}
      {...props}
    >
      <div className={cn('flex items-center gap-3', isCenter && 'justify-center')}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center">
          <Icon name={iconName} />
        </span>
        <h2 className="m-0 text-xs font-bold tracking-wide uppercase">{title}</h2>
      </div>

      {description && (
        <p
          className={cn(
            'max-w-xl text-sm leading-relaxed',
            { 'text-center': isCenter },
            { 'ml-10': !isCenter }
          )}
          style={{
            color: `color-mix(in srgb, var(--variant-color, currentColor) 80%, transparent)`
          }}
        >
          {description}
        </p>
      )}

      {href && (
        <a
          href={href}
          className={cn(
            'group mt-1 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase',
            { 'ml-10': !isCenter }
          )}
        >
          <span className="opacity-60 transition-[opacity,color] group-hover:opacity-100">
            {linkText}
          </span>
          <ArrowRight className="h-4 w-4 opacity-60 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-100" />
        </a>
      )}
    </div>
  );
}
