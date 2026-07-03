import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/iconMap';
import { projectCardVariants } from './projectCardVariants';

type ProjectCardProps = {
  href: string;
  title: string;
  description?: string;
  iconName: IconName;
  category?: string;
  tags?: string[];
} & Omit<ComponentProps<'a'>, 'href'>;

function ProjectCard({
  href,
  title,
  description,
  iconName,
  category = 'generative',
  tags = [],
  className,
  ...props
}: ProjectCardProps) {
  const accentColor = `var(--category-${category}, var(--primary))`;

  return (
    <a
      href={href}
      data-variant="experiment"
      className={cn(projectCardVariants(), className)}
      style={{ '--border': accentColor, '--card-accent': accentColor } as React.CSSProperties}
      {...props}
    >
      {/* Hover gradient line */}
      <div
        className="h-1 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--card-accent) 30%, var(--card-accent) 70%, transparent)'
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-card-foreground font-semibold">{title}</h3>
          <div
            className="mt-0.5 shrink-0 text-(--card-accent) [&_svg]:h-10 [&_svg]:w-10"
            aria-hidden="true"
          >
            <Icon name={iconName} />
          </div>
        </div>

        {description && <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>}
      </div>

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
        className="absolute right-5 bottom-5 h-4 w-4 text-(--card-accent) opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
    </a>
  );
}

export { ProjectCard };
export type { ProjectCardProps };
