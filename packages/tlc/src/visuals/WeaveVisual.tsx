import { generateCardVisual } from './core/generate';
import { VisualSvg } from './VisualSvg';
import type { Ref } from 'react';

export interface WeaveVisualProps {
    seed: string | number;
    className?: string;
    color?: string;
    svgRef?: Ref<SVGSVGElement>;
}

export function WeaveVisual({ seed, className = '', color = '', svgRef }: WeaveVisualProps) {
    const visual = generateCardVisual(seed, 'weave');

    return (
        <VisualSvg
            graphic={visual.graphic}
            className={className}
            color={color}
            {...(svgRef != null ? { svgRef } : {})}
        />
    );
}
