import type { HTMLAttributes, MouseEvent } from 'react';
import { useMemo, useRef } from 'react';
import { cn } from '../../../lib/cn';
import { Badge } from '../../data-display';
import { generateSciFiPaths, type SciFiCardPaths } from './generateSciFiPaths';
import { sciFiCardVariants, type SciFiCardVariantProps } from './variants';

export interface SciFiCardProps extends HTMLAttributes<HTMLDivElement>, SciFiCardVariantProps {
  flavor?: 'edge' | 'atlas';
  animated?: boolean;
  seed: number;
  cardId?: string;
  cardTitle?: string;
  classification: string;
  density: string;
  resolution: string;
  color?: string;
}

function SciFiCardVisual({
  paths,
  animateDots,
  animateLines
}: {
  paths: SciFiCardPaths;
  animateDots: boolean;
  animateLines: boolean;
}) {
  return (
    <>
      {animateLines && (
        <style>{`
          @keyframes scifi-draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      )}

      {/* Radial mouse-tracking glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--mx) var(--my), color-mix(in oklch, var(--variant-color) 18%, transparent), transparent 50%)'
        }}
      />

      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-450 group-hover:opacity-100"
        style={{
          boxShadow:
            '0 0 50px color-mix(in oklch, var(--variant-color) 25%, transparent), inset 0 0 60px color-mix(in oklch, var(--variant-color) 6%, transparent)',
          border: '1px solid color-mix(in oklch, var(--variant-color) 75%, transparent)'
        }}
      />

      {/* Generated SVG artwork */}
      <svg
        className="absolute inset-0 z-0 h-full w-full opacity-40 transition-all duration-500 group-hover:opacity-100"
        style={{ filter: 'drop-shadow(0 0 6px var(--variant-color))' }}
        viewBox="0 0 300 300"
        preserveAspectRatio="none"
      >
        <path
          d={paths.openPaths}
          fill="none"
          stroke="var(--variant-color)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          strokeDasharray={animateLines ? paths.openPathLength : undefined}
          strokeDashoffset={animateLines ? paths.openPathLength : undefined}
          style={
            animateLines
              ? { animation: 'scifi-draw 60s ease-out 0.1s alternate infinite' }
              : undefined
          }
        />
        <path
          d={paths.closedPaths}
          fill="none"
          stroke="var(--variant-color)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          strokeDasharray={animateLines ? paths.closedPathLength : undefined}
          strokeDashoffset={animateLines ? paths.closedPathLength : undefined}
          style={
            animateLines
              ? { animation: 'scifi-draw 60s ease-out 0.9s alternate infinite' }
              : undefined
          }
        />
        {paths.dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="var(--variant-color)"
            opacity="0.55"
            className={animateDots ? 'animate-pulse' : undefined}
            style={
              animateDots ? { animationDelay: dot.delay, animationDuration: '2.4s' } : undefined
            }
          />
        ))}
      </svg>
    </>
  );
}

function SciFiCardContent({
  flavor,
  cardId,
  cardTitle,
  classification,
  density,
  resolution
}: {
  flavor: 'edge' | 'atlas';
  cardId: string;
  cardTitle: string;
  classification: string;
  density: string;
  resolution: string;
}) {
  if (flavor === 'atlas') {
    return (
      <div className="relative z-20 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <Badge
            appearance="outline"
            className="border-(--variant-color) text-(--variant-color)"
          >
            {cardId}
          </Badge>
          <h3 className="text-foreground border border-(--variant-color) px-2 py-1 text-base tracking-wider uppercase">
            {cardTitle}
          </h3>
        </div>

        <div className="mt-auto">
          <p className="text-foreground mb-1.5 font-light tracking-tight transition-colors">
            {classification}
          </p>
          <div className="mt-3 flex justify-between border-t border-(--variant-color) pt-3 text-sm tracking-wider text-(--variant-color)">
            <span>{resolution}</span>
            <span>{density}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-20 flex h-full flex-col justify-between">
      <div className="flex items-start justify-between">
        <Badge
          appearance="soft"
          variant="primary"
          style={{ '--primary': 'var(--variant-color)' } as React.CSSProperties}
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

export function SciFiCard({
  variant,
  flavor = 'edge',
  animated = false,
  seed,
  cardId = 'Sci-Fi card id',
  cardTitle = 'Sci-Fi card title',
  classification,
  density,
  resolution,
  color,
  className,
  onMouseMove,
  ...props
}: SciFiCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const paths = useMemo(() => generateSciFiPaths(seed), [seed]);

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
      className={cn(sciFiCardVariants({ variant }), className)}
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
      <SciFiCardVisual
        paths={paths}
        animateDots={animated}
        animateLines={animated}
      />
      <SciFiCardContent
        flavor={flavor}
        cardId={cardId}
        cardTitle={cardTitle}
        classification={classification}
        density={density}
        resolution={resolution}
      />
    </div>
  );
}
