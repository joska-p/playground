import { generateCardVisual } from './core/generate';
import { VisualSvg } from './VisualSvg';
import type { Ref } from 'react';

export interface GlyphVisualProps {
    seed: string | number;
    className?: string;
    color?: string;
    svgRef?: Ref<SVGSVGElement>;
}

export function GlyphVisual({ seed, className = '', color = '', svgRef }: GlyphVisualProps) {
    const visual = generateCardVisual(seed, 'glyph');

    return (
        <VisualSvg
            graphic={visual.graphic}
            className={className}
            color={color}
            {...(svgRef != null ? { svgRef } : {})}
        />
    );
}
