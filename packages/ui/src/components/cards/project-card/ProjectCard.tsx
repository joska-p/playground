import type { ComponentProps, Ref } from 'react';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/iconMap';
import { CardBody } from '../card-body/CardBody';
import { CardDescription } from '../card-description/CardDescription';
import { CardLink } from '../card-link/CardLink';
import { CardTitle } from '../card-title/CardTitle';

export type ProjectCardProps = {
  ref?: Ref<HTMLAnchorElement>;
  title: string;
  description?: string;
  iconName: IconName;
  tags?: string[];
} & Omit<ComponentProps<typeof CardLink>, 'children'>;

/**
 * A project/experiment card — icon top-right, a gradient hairline that
 * sweeps in on hover, tags along the bottom. No `category` prop
 * anymore: color comes in through CardLink's `accent`, same as every
 * other card. This component doesn't know or care what "generative"
 * or "shader" means — that mapping lives with whoever's calling it.
 */
function ProjectCard({
  ref,
  title,
  description,
  iconName,
  tags = [],
  className,
  ...props
}: ProjectCardProps) {
  return (
    <CardLink
      ref={ref}
      data-variant="experiment"
      className={className}
      {...props}
    >
      {/* Gradient line — present at rest, sharpens on hover */}
      <div
        className="h-1 w-full opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--variant-color) 30%, var(--variant-color) 70%, transparent)'
        }}
        aria-hidden="true"
      />

      <CardBody className="flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle>{title}</CardTitle>
          <div
            className="mt-0.5 shrink-0 text-(--variant-color) [&_svg]:h-10 [&_svg]:w-10"
            aria-hidden="true"
          >
            <Icon name={iconName} />
          </div>
        </div>
        {description && <CardDescription className="line-clamp-2">{description}</CardDescription>}
      </CardBody>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-4 py-2.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-muted-foreground/60 rounded px-1.5 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Arrow icon on hover */}
      <Icon
        name="arrow-diagonal"
        className="absolute right-5 bottom-5 h-4 w-4 text-(--variant-color) opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
    </CardLink>
  );
}

export { ProjectCard };
