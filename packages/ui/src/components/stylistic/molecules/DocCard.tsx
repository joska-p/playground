import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/iconMap';

type DocCardProps = {
  href: string;
  title: string;
  description?: string;
  type?: string;
  iconName?: IconName;
} & Omit<ComponentProps<'a'>, 'href'>;

function DocCard({
  href,
  title,
  description,
  type = 'reference',
  iconName,
  className,
  ...props
}: DocCardProps) {
  const accentColor = `var(--category-${type}, var(--primary))`;

  return (
    <a
      href={href}
      data-variant="doc"
      className={cn(
        'group border-border/30 bg-card relative flex flex-col overflow-hidden rounded-lg border',
        'shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        'hover:border-border',
        className
      )}
      style={{ '--border': accentColor, '--card-accent': accentColor } as React.CSSProperties}
      {...props}
    >
      {/* Folded-corner triangle decoration */}
      <span
        className="pointer-events-none absolute top-0 right-0 h-0 w-0 opacity-50 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          borderWidth: '0 28px 28px 0',
          borderStyle: 'solid',
          borderColor: 'transparent var(--card-accent) transparent transparent'
        }}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Type badge */}
        <div
          className="flex w-fit items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold text-(--card-accent) uppercase"
          style={{
            background: 'color-mix(in srgb, var(--card-accent) 12%, transparent)',
            border: '1px solid color-mix(in srgb, var(--card-accent) 25%, transparent)'
          }}
        >
          {iconName && (
            <Icon
              name={iconName}
              className="h-4 w-4"
            />
          )}
          <span>{type}</span>
        </div>

        <h3 className="text-card-foreground font-semibold">{title}</h3>
        {description && (
          <p className="text-muted-foreground line-clamp-2 flex-1 text-sm">{description}</p>
        )}
      </div>

      {/* Arrow icon on hover */}
      <Icon
        name="arrow-diagonal"
        className="absolute right-5 bottom-5 h-4 w-4 text-(--card-accent) opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
    </a>
  );
}

export { DocCard };
export type { DocCardProps };
