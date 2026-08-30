import styles from './visuals.module.css';
import { cn } from '../lib/cn';
import type { CardGraphic } from './core/types';
import type { ReactNode, Ref } from 'react';

export interface VisualSvgProps {
    graphic: CardGraphic;
    className?: string;
    color?: string;
    svgRef?: Ref<SVGSVGElement>;
}

const animationClass: Record<string, string | undefined> = {
    'snake-path': styles['snake-path'],
    'weave-path': styles['weave-path'],
    'orbit-dash': styles['orbit-dash'],
    'constellation-line': styles['constellation-line'],
    'lattice-line': styles['lattice-line'],
    twinkle: styles['twinkle'],
    'contour-ring': styles['contour-ring'],
    'radar-sweep': styles['radar-sweep'],
    'spec-bar': styles['spec-bar'],
    blip: styles['blip']
};

function animate(className?: string): string | undefined {
    return className ? animationClass[className] : undefined;
}

function round(value: number): number {
    return Math.round(value * 10) / 10;
}

function renderGraphic(graphic: CardGraphic): ReactNode {
    return (
        <>
            {graphic.rects.map((rect, i) => (
                <rect
                    key={`r-${String(i)}`}
                    x={round(rect.x)}
                    y={round(rect.y)}
                    width={round(rect.width)}
                    height={round(rect.height)}
                    rx={rect.rx}
                    fill={rect.fill ?? 'currentColor'}
                    fillOpacity={rect.fillOpacity}
                    opacity={rect.opacity}
                    className={animate(rect.className)}
                    style={rect.style}
                />
            ))}
            {graphic.lines.map((line, i) => (
                <line
                    key={`l-${String(i)}`}
                    x1={round(line.x1)}
                    y1={round(line.y1)}
                    x2={round(line.x2)}
                    y2={round(line.y2)}
                    stroke="currentColor"
                    strokeWidth={line.strokeWidth != null ? round(line.strokeWidth) : 0.4}
                    opacity={line.opacity}
                    className={animate(line.className)}
                    style={line.style}
                />
            ))}
            {graphic.ellipses.map((el, i) => (
                <ellipse
                    key={`e-${String(i)}`}
                    cx={round(el.cx)}
                    cy={round(el.cy)}
                    rx={round(el.rx)}
                    ry={round(el.ry)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={el.strokeWidth != null ? round(el.strokeWidth) : 0.6}
                    strokeDasharray={el.strokeDasharray}
                    opacity={el.opacity}
                    className={animate(el.className)}
                    style={el.style}
                    transform={
                        el.rotate != null
                            ? `rotate(${String(round(el.rotate))} ${String(round(el.cx))} ${String(round(el.cy))})`
                            : undefined
                    }
                />
            ))}
            {graphic.paths.map((path, i) => (
                <path
                    key={`p-${String(i)}`}
                    d={path.d}
                    fill={path.fill ?? 'none'}
                    fillOpacity={path.fillOpacity}
                    stroke={path.stroke ?? 'currentColor'}
                    strokeWidth={path.strokeWidth != null ? round(path.strokeWidth) : 0.6}
                    strokeOpacity={path.strokeOpacity}
                    strokeLinecap={path.strokeLinecap ?? 'round'}
                    strokeLinejoin={path.strokeLinejoin ?? 'round'}
                    strokeDasharray={path.strokeDasharray}
                    className={animate(path.className)}
                    style={path.style}
                />
            ))}
            {graphic.circles.map((c, i) => (
                <circle
                    key={`c-${String(i)}`}
                    cx={round(c.cx)}
                    cy={round(c.cy)}
                    r={round(c.r)}
                    fill={c.fill ?? 'currentColor'}
                    fillOpacity={c.fillOpacity}
                    stroke={c.stroke}
                    strokeWidth={c.strokeWidth}
                    opacity={c.opacity}
                    className={animate(c.className)}
                    style={
                        c.className === 'twinkle' && !c.style
                            ? { animationDelay: `${String((i % 7) * 0.35)}s` }
                            : c.style
                    }
                />
            ))}
        </>
    );
}

export function VisualSvg({ graphic, className = '', color, svgRef }: VisualSvgProps) {
    return (
        <svg
            ref={svgRef}
            viewBox="0 0 300 300"
            preserveAspectRatio="none"
            aria-hidden="true"
            className={cn(styles['svg'], className)}
            style={color ? { color } : undefined}
        >
            {renderGraphic(graphic)}
        </svg>
    );
}
