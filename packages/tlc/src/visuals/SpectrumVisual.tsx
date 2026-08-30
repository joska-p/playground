import { generateCardVisual } from './core/generate';
import { VisualSvg } from './VisualSvg';
import type { Ref } from 'react';

export interface SpectrumVisualProps {
    seed: string | number;
    className?: string;
    color?: string;
    svgRef?: Ref<SVGSVGElement>;
}

export function SpectrumVisual({ seed, className = '', color = '', svgRef }: SpectrumVisualProps) {
    const visual = generateCardVisual(seed, 'spectrum');

    return (
        <VisualSvg
            graphic={visual.graphic}
            className={className}
            color={color}
            {...(svgRef != null ? { svgRef } : {})}
        />
    );
}
