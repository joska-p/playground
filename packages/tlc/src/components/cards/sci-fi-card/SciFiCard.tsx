import { generateSciFiPaths } from './generateSciFiPaths';
import styles from './SciFiCard.module.css';
import { sciFiCardVariants, type SciFiCardVariantProps } from './variants';
import { cn } from '../../../lib/cn';
import { Badge } from '../../display';

import type { HTMLAttributes } from 'react';

export interface SciFiCardProps extends HTMLAttributes<HTMLDivElement>, SciFiCardVariantProps {
    seed: number;
    cardId?: string;
    cardTitle?: string;
    classification: string;
    density: string;
    resolution: string;
}

export function SciFiCard({
    variant,
    seed,
    cardId = 'Sci-Fi card id',
    cardTitle = 'Sci-Fi card title',
    classification,
    density,
    resolution,
    className,
    ...props
}: SciFiCardProps) {
    const paths = generateSciFiPaths(seed);

    const variantColors: Record<string, string> = {
        default: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        destructive: 'var(--destructive)'
    };
    const strokeColor = variantColors[variant ?? 'primary'];

    return (
        <div
            className={cn(sciFiCardVariants({ variant }), className)}
            {...props}
        >
            <svg
                className="absolute inset-0 z-0 h-full w-full opacity-90 drop-shadow-[0_0_6px_currentcolor] transition-opacity group-hover:opacity-100"
                viewBox="0 0 300 300"
                preserveAspectRatio="none"
                style={{ color: strokeColor }}
            >
                <path
                    d={paths.openPaths}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles['snakePath']}
                />
                <path
                    d={paths.closedPaths}
                    fill="none"
                    stroke="currentColor"
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
                        fill="currentColor"
                        className="animate-pulse"
                    />
                ))}
            </svg>

            <div className="relative z-20 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                    <Badge
                        variant={variant === 'default' ? 'secondary' : variant}
                        className="border-current text-current"
                    >
                        {cardId}
                    </Badge>
                    <h3 className="text-foreground border border-current px-2 py-1 text-base tracking-wider uppercase">
                        {cardTitle}
                    </h3>
                </div>

                <div className="mt-auto">
                    <p className="text-foreground mb-1.5 font-light tracking-tight">
                        {classification}
                    </p>
                    <div className="mt-3 flex justify-between border-t border-current pt-3 text-sm tracking-wider text-muted-foreground">
                        <span>{resolution}</span>
                        <span>{density}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
