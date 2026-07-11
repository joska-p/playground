import type { HTMLAttributes, MouseEvent } from 'react';
import { useMemo, useRef } from 'react';
import { cn } from '../../../lib/cn';
import { AtlasCardContent } from './AtlasCardContent';
import { AtlasCardVisual } from './AtlasCardVisual';
import { generateAtlasPaths } from './generateAtlasPaths';
import type { AtlasCardBaseProps } from './types';
import { atlasCardVariants } from './variants';

export interface AtlasCardProps extends HTMLAttributes<HTMLDivElement>, AtlasCardBaseProps {
  /** Enables mouse-tracking glow + pulsing sample dots. Defaults to false. */
  cardId?: string;
  cardTitle?: string;
  animated?: boolean;
}

export function AtlasCard({
  variant,
  seed,
  cardId = 'Atlas card id',
  cardTitle = 'Atlas card title',
  classification,
  density,
  resolution,
  color,
  animated = false,
  className,
  onMouseMove,
  ...props
}: AtlasCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const paths = useMemo(() => generateAtlasPaths(seed), [seed]);

  const handleMouseMove = !animated
    ? onMouseMove
    : (e: MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
          el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
        }
        onMouseMove?.(e);
      };

  return (
    <div
      ref={animated ? cardRef : undefined}
      onMouseMove={handleMouseMove}
      className={cn(atlasCardVariants({ variant }), className)}
      style={
        {
          borderColor: 'color-mix(in oklch, var(--variant-color) 22%, transparent)',
          backgroundColor: 'color-mix(in oklch, var(--variant-color) 5%, transparent)',
          backdropFilter: 'blur(8px)',
          '--mx': '50%',
          '--my': '50%',
          ...(color && { '--variant-color': color })
        } as React.CSSProperties
      }
      {...props}
    >
      <AtlasCardVisual
        paths={paths}
        animateDots={animated}
        animateLines={animated}
      />
      <AtlasCardContent
        cardId={cardId}
        cardTitle={cardTitle}
        classification={classification}
        density={density}
        resolution={resolution}
      />
    </div>
  );
}
