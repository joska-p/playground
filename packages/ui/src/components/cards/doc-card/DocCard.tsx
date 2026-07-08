import type { ComponentProps, Ref } from 'react';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/iconMap';
import { CardBody } from '../card-body/CardBody';
import { CardDescription } from '../card-description/CardDescription';
import { CardLink } from '../card-link/CardLink';
import { CardTitle } from '../card-title/CardTitle';

export type DocCardProps = {
  ref?: Ref<HTMLAnchorElement>;
  title: string;
  description?: string;
  type?: string;
  iconName?: IconName;
} & Omit<ComponentProps<typeof CardLink>, 'children'>;

/**
 * A doc card — folded-corner decoration, a type badge, the same
 * hover arrow as ProjectCard. `type` is now purely a display label
 * (it used to double as the lookup key for `--category-${type}`);
 * color comes in separately through CardLink's `accent`.
 */
function DocCard({
  ref,
  title,
  description,
  type = 'reference',
  iconName,
  className,
  ...props
}: DocCardProps) {
  return (
    <CardLink
      ref={ref}
      data-variant="doc"
      className={className}
      {...props}
    >
      {/* Folded-corner triangle decoration */}
      <span
        className="pointer-events-none absolute top-0 right-0 h-0 w-0 opacity-50 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          borderWidth: '0 28px 28px 0',
          borderStyle: 'solid',
          borderColor: 'transparent var(--variant-color) transparent transparent'
        }}
        aria-hidden="true"
      />

      <CardBody className="flex-1 flex-col gap-4">
        {/* Type badge */}
        <div
          className="flex w-fit items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold text-(--variant-color) uppercase"
          style={{
            background: 'color-mix(in srgb, var(--variant-color) 12%, transparent)',
            border: '1px solid color-mix(in srgb, var(--variant-color) 25%, transparent)'
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

        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription className="line-clamp-2 flex-1">{description}</CardDescription>
        )}
      </CardBody>

      {/* Arrow icon on hover */}
      <Icon
        name="arrow-diagonal"
        className="absolute right-5 bottom-5 h-4 w-4 text-(--variant-color) opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
    </CardLink>
  );
}

export { DocCard };
