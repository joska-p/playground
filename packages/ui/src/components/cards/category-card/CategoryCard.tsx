import type { ComponentProps, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/iconMap';
import { CardBody } from '../card-body/CardBody';
import { CardLink } from '../card-link/CardLink';

export type CategoryCardProps = {
  ref?: Ref<HTMLAnchorElement>;
  label: string;
  description?: string;
  iconName: IconName;
  count?: number;
} & Omit<ComponentProps<typeof CardLink>, 'children'>;

/**
 * A category tile — centered icon, a divider that switches to the
 * accent color on hover, count + label below. Unlike ProjectCard/
 * DocCard it doesn't lift on hover, just glows, so it cancels
 * CardLink's base `hover:-translate-y-0.5` with `hover:translate-y-0`
 * (same specificity group, `cn`'s tailwind-merge resolves it — the
 * standard way to opt a composed card out of one shared behavior
 * without forking the base component). `id` is gone along with it:
 * accent comes in through CardLink, same as everywhere else.
 */
function CategoryCard({
  ref,
  label,
  description,
  iconName,
  count = 0,
  className,
  ...props
}: CategoryCardProps) {
  return (
    <CardLink
      ref={ref}
      data-tilt
      className={cn('hover:translate-y-0', className)}
      {...props}
    >
      <div
        className="flex items-center justify-center px-4 pt-5 pb-3"
        aria-hidden="true"
      >
        <div className="w-full max-w-22 text-(--variant-color)">
          <Icon name={iconName} />
        </div>
      </div>

      {/* Divider line — a tint at rest, full accent on hover */}
      <div
        className="mx-4 h-px transition-colors duration-300 group-hover:bg-(--variant-color)"
        style={{ background: 'color-mix(in srgb, var(--variant-color) 30%, var(--muted))' }}
      />

      <CardBody className="flex-col gap-0.5 space-y-0.5 px-4 pt-3 pb-4">
        <p className="text-muted-foreground truncate text-sm leading-none tracking-wider uppercase">
          {label}
        </p>
        {description && (
          <p className="text-muted-foreground/60 hidden truncate text-xs sm:block">{description}</p>
        )}
        <div className="flex items-baseline gap-1 pt-1">
          <span className="text-xl leading-none font-bold text-(--variant-color) transition-colors duration-300">
            {count}
          </span>
          <span className="text-muted-foreground/60 text-xs"> exp </span>
        </div>
      </CardBody>
    </CardLink>
  );
}

export { CategoryCard };
