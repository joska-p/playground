import { Badge } from '../../data-display';
import type { AtlasCardContentProps } from './types';

/** Badge / title / footer layout shared by AtlasCard and AtlasCardAnimated. */
export function AtlasCardContent({
  cardId,
  cardTitle,
  classification,
  density,
  resolution
}: AtlasCardContentProps) {
  return (
    <div className="relative z-20 flex h-full flex-col justify-between">
      <div className="flex items-start justify-between">
        <Badge
          appearance="solid"
          color="var(--variant-color)"
        >
          {cardId}
        </Badge>
        <span className="border border-(--variant-color) px-2 py-1 text-xs tracking-wider text-(--variant-color) uppercase">
          {classification}
        </span>
      </div>

      <div className="mt-auto">
        <h3 className="text-foreground mb-1.5 text-xl font-light tracking-tight transition-colors group-hover:text-(--variant-color)">
          {cardTitle}
        </h3>
        <div className="text-foreground-dim mt-3 flex justify-between border-t border-(--variant-color) pt-3 text-sm tracking-wider">
          <span>{resolution}</span>
          <span>{density}</span>
        </div>
      </div>
    </div>
  );
}
