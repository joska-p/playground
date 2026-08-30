import { generateCardVisual } from './core/generate';
import { VisualSvg } from './VisualSvg';
import type { Ref } from 'react';

export interface ContourVisualProps {
    seed: string | number;
    className?: string;
    color?: string;
    svgRef?: Ref<SVGSVGElement>;
}

export function ContourVisual({ seed, className = '', color = '', svgRef }: ContourVisualProps) {
    const visual = generateCardVisual(seed, 'contour');

    return (
        <VisualSvg
            graphic={visual.graphic}
            className={className}
            color={color}
            {...(svgRef != null ? { svgRef } : {})}
        />
    );
}
