import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/iconMap';
import { sectionHeaderVariants } from './sectionHeaderVariants';

type SectionHeaderProps = {
  title: string;
  description?: string;
  iconName?: IconName;
  href?: string;
  linkText?: ReactNode;
  category?: string;
} & Omit<ComponentProps<'div'>, 'children'> &
  VariantProps<typeof sectionHeaderVariants>;

function SectionHeader({
  title,
  description,
  iconName,
  href,
  linkText = 'View all',
  category,
  align = 'left',
  className,
  ...props
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  const accentColor = category ? `var(--category-${category}, var(--primary))` : `var(--primary)`;

  return (
    <div
      className={cn(sectionHeaderVariants({ align }), className)}
      style={{ '--accent': accentColor } as React.CSSProperties}
      {...props}
    >
      <div className={cn('flex items-center gap-3', isCenter && 'justify-center')}>
        {iconName && (
          <span className="text-accent flex shrink-0 items-center justify-center">
            <Icon
              name={iconName}
              className="h-7 w-7"
            />
          </span>
        )}
        <h2 className="text-accent m-0 text-xs font-bold uppercase">{title}</h2>
        <span className="bg-border h-px flex-1" />
      </div>

      {description && (
        <p
          className={cn(
            'text-muted-foreground max-w-xl text-sm',
            isCenter && 'text-center',
            iconName && !isCenter ? 'ml-10' : ''
          )}
        >
          {description}
        </p>
      )}

      {href && (
        <a
          href={href}
          className={cn(
            'group text-accent/60 hover:text-accent mt-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase transition-colors',
            iconName && !isCenter ? 'ml-10' : ''
          )}
        >
          {linkText}
          <Icon
            name="arrow-right"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </a>
      )}
    </div>
  );
}

export { SectionHeader };
export type { SectionHeaderProps };
