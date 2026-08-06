import type { HTMLAttributes } from 'react';
import { cn } from '../../../lib/cn';
import { Badge } from '../../data-display';
import { generateSciFiPaths } from './generateSciFiPaths';
import styles from './SciFiCard.module.css';
import { sciFiCardVariants, type SciFiCardVariantProps } from './variants';

export interface SciFiCardProps extends HTMLAttributes<HTMLDivElement>, SciFiCardVariantProps {
    seed: number;
    cardId?: string;
    cardTitle?: string;
    classification: string;
    density: string;
    resolution: string;
    color?: string;
}

export function SciFiCard({
    variant,
    seed,
    cardId = 'Sci-Fi card id',
    cardTitle = 'Sci-Fi card title',
    classification,
    density,
    resolution,
    color,
    className,
    ...props
}: SciFiCardProps) {
    const paths = generateSciFiPaths(seed);

    return (
        <div
            className={cn(sciFiCardVariants({ variant }), className)}
            style={color ? ({ '--variant-color': color } as React.CSSProperties) : undefined}
            {...props}
        >
            <svg
                className="absolute inset-0 z-0 h-full w-full opacity-90 drop-shadow-[0_0_6px_var(--variant-color)] transition-opacity group-hover:opacity-100"
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
                    className={styles['snakePath']}
                />
                <path
                    d={paths.closedPaths}
                    fill="none"
                    stroke="var(--variant-color)"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles['snakePath']}
                />
                {paths.dots.map((dot, i) => (
                    <circle
                        key={i}
                        cx={dot.cx}
                        cy={dot.cy}
                        r={dot.r}
                        fill="var(--variant-color)"
                        className="animate-pulse"
                    />
                ))}
            </svg>

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
                    <p className="text-foreground mb-1.5 font-light tracking-tight">
                        {classification}
                    </p>
                    <div className="mt-3 flex justify-between border-t border-(--variant-color) pt-3 text-sm tracking-wider text-(--variant-color)">
                        <span>{resolution}</span>
                        <span>{density}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
