import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/iconMap';

type CategoryCardProps = {
  href: string;
  id: string;
  label: string;
  description?: string;
  iconName: IconName;
  count: number;
  delay?: number;
} & Omit<ComponentProps<'a'>, 'href'>;

function CategoryCard({
  href,
  id,
  label,
  description,
  iconName,
  count,
  className,
  ...props
}: CategoryCardProps) {
  const accentStyle = `var(--category-${id})`;

  return (
    <a
      data-tilt
      href={href}
      className={cn(
        'group border-border/30 bg-card relative flex cursor-pointer flex-col rounded-lg border',
        'transition-[border-color,box-shadow] duration-300 select-none',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        'hover:border-border hover:shadow-[0_0_28px_-6px_var(--accent)]',
        className
      )}
      style={{ '--border': accentStyle, '--accent': accentStyle } as React.CSSProperties}
      {...props}
    >
      {/* Icon area */}
      <div
        className="text-accent flex items-center justify-center px-4 pt-5 pb-3"
        aria-hidden="true"
      >
        <div className="w-full max-w-22">
          <Icon name={iconName} />
        </div>
      </div>

      {/* Divider line — transitions to accent color on hover */}
      <div className="bg-muted group-hover:bg-accent mx-4 h-px transition-colors duration-300" />

      {/* Content */}
      <div className="space-y-0.5 px-4 pt-3 pb-4">
        <p className="text-muted-foreground truncate text-sm leading-none tracking-wider uppercase">
          {label}
        </p>
        {description && (
          <p className="text-muted-foreground/60 hidden truncate text-xs sm:block">{description}</p>
        )}
        <div className="flex items-baseline gap-1 pt-1">
          <span className="text-accent text-xl leading-none font-bold transition-colors duration-300">
            {count}
          </span>
          <span className="text-muted-foreground/60 text-xs"> exp </span>
        </div>
      </div>
    </a>
  );
}

export { CategoryCard };
export type { CategoryCardProps };
