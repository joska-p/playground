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
      <div className="flex items-start justify-between gap-4">
        <Badge appearance="outline">{cardId}</Badge>
        <h3 className="text-foreground border border-(--variant-color) px-2 py-1 text-xl tracking-wider uppercase">
          {cardTitle}
        </h3>
      </div>

      <div className="mt-auto">
        <p className="text-foreground mb-1.5 font-light tracking-tight transition-colors group-hover:text-(--variant-color)">
          {classification}
        </p>
        <div className="text-foreground-dim mt-3 flex justify-between border-t border-(--variant-color) pt-3 text-sm tracking-wider">
          <span>{resolution}</span>
          <span>{density}</span>
        </div>
      </div>
    </div>
  );
}
