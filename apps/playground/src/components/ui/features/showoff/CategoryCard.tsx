import { useState } from 'react';
import { CategoryIcon } from './CategoryIcon';
import type { Category, GroupedCategory } from './types';

interface CategoryCardProps extends GroupedCategory {
  index: number;
}

/**
 * Resolves the CSS variable for a given category accent color.
 * Keeps the inline style typed and co-located with the card.
 */
function accentStyle(id: Category): React.CSSProperties {
  return { color: `var(--category-${id})` };
}

function borderStyle(id: Category, active: boolean): React.CSSProperties {
  return {
    borderColor: active ? `var(--category-${id})` : '#504945',
    boxShadow: active ? `0 0 28px -6px var(--category-${id})` : 'none',
  };
}

export function CategoryCard({
  id,
  label,
  description,
  count,
}: CategoryCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="relative flex cursor-default flex-col overflow-hidden rounded-lg border bg-[#282828] transition-[border-color,box-shadow] duration-300 select-none"
      style={borderStyle(id, hovered)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Illustration area */}
      <div
        className="flex items-center justify-center px-4 pt-5 pb-3"
        style={accentStyle(id)}
        aria-hidden
      >
        <div className="w-full max-w-22">
          <CategoryIcon
            category={id}
            hovered={hovered}
          />
        </div>
      </div>

      {/* Divider */}
      <div
        className="mx-4 h-px transition-colors duration-300"
        style={{
          backgroundColor: hovered ? `var(--category-${id})` : '#3c3836',
        }}
      />

      {/* Text area */}
      <div className="space-y-0.5 px-4 pt-3 pb-4">
        <p
          className="truncate font-mono text-[11px] leading-none tracking-wider text-[#a89984] uppercase"
          title={label}
        >
          {label}
        </p>
        <p
          className="hidden truncate font-mono text-[10px] text-[#665c54] sm:block"
          title={description}
        >
          {description}
        </p>
        <div className="flex items-baseline gap-1 pt-1">
          <span
            className="font-mono text-xl leading-none font-bold transition-colors duration-300"
            style={accentStyle(id)}
          >
            {count}
          </span>
          <span className="font-mono text-[10px] text-[#665c54]">
            {count === 1 ? 'exp' : 'exp'}
          </span>
        </div>
      </div>
    </article>
  );
}
