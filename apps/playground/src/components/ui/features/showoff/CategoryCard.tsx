import { Icon } from '@repo/ui/icons';
import type { Category } from '../../../../data/projects';
import { CATEGORIES } from '../../../../data/projects';

type CategoryCardProps = {
  id: Category;
  label: string;
  description: string;
  count: number;
  index: number;
};

export function CategoryCard({
  id,
  label,
  description,
  count,
}: CategoryCardProps) {
  return (
    <article
      className="group border-border bg-card hover:border-accent) relative flex cursor-default flex-col rounded-lg border transition-[border-color,box-shadow] duration-300 select-none hover:shadow-[0_0_28px_-6px_var(--accent)]"
      style={{ '--accent': `var(--category-${id})` } as React.CSSProperties}
    >
      <div
        className="text-accent flex items-center justify-center px-4 pt-5 pb-3"
        aria-hidden
      >
        <div className="w-full max-w-22">
          <Icon name={CATEGORIES[id as keyof typeof CATEGORIES].icon} />
        </div>
      </div>

      <div className="bg-muted group-hover:bg-accent mx-4 h-px transition-colors duration-300" />

      <div className="space-y-0.5 px-4 pt-3 pb-4">
        <p className="text-muted-foreground truncate text-sm leading-none tracking-wider uppercase">
          {label}
        </p>
        <p className="text-muted-foreground/60 hidden truncate text-xs sm:block">
          {description}
        </p>
        <div className="flex items-baseline gap-1 pt-1">
          <span className="text-accent text-xl leading-none font-bold transition-colors duration-300">
            {count}
          </span>
          <span className="text-muted-foreground/60 text-xs">
            {count === 1 ? 'exp' : 'exp'}
          </span>
        </div>
      </div>
    </article>
  );
}
