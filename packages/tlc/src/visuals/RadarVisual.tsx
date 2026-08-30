import { generateCardVisual } from './core/generate';
import { VisualSvg } from './VisualSvg';
import type { Ref } from 'react';

export interface RadarVisualProps {
    seed: string | number;
    className?: string;
    color?: string;
    svgRef?: Ref<SVGSVGElement>;
}

export function RadarVisual({ seed, className = '', color = '', svgRef }: RadarVisualProps) {
    const visual = generateCardVisual(seed, 'radar');

    return (
        <VisualSvg
            graphic={visual.graphic}
            className={className}
            color={color}
            {...(svgRef != null ? { svgRef } : {})}
        />
    );
}
