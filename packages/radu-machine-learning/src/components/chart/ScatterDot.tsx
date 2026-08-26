import { cn } from '@repo/tlc/lib/cn';

import { labelToColorMap } from '../../constants';
import { setScrollTarget, useSelectedDrawingId } from '../../stores/selection';

import type { ChartPoint } from './types';

type ScatterDotProps = {
    data: ChartPoint[];
    xScale: (value: number) => number;
    yScale: (value: number) => number;
};

function ScatterDot({ data, xScale, yScale }: ScatterDotProps) {
    const selectedDrawingId = useSelectedDrawingId();

    return (
        <g>
            {data.map((point, index) => {
                const drawingId = point.drawingId;
                const cx = xScale(point.x);
                const cy = yScale(point.y);
                const isSelected = selectedDrawingId === drawingId;

                return (
                    <g
                        key={index}
                        className="group cursor-pointer transition-[r] duration-200"
                        onClick={() => {
                            if (!drawingId) return;

                            setScrollTarget(drawingId);
                        }}
                    >
                        <circle
                            data-drawing-id-point={point.drawingId}
                            cx={cx}
                            cy={cy}
                            r="4"
                            fill={
                                point.label === 'current'
                                    ? 'var(--destructive)'
                                    : labelToColorMap[point.label]
                            }
                            className={cn(
                                'opacity-25 transition-[r_opacity] duration-200 group-hover:opacity-100 group-hover:[r:8]',
                                isSelected && 'opacity-100 [r:8]'
                            )}
                        />
                        <foreignObject
                            x={cx - 80 / 2}
                            y={cy - 80}
                            width={80}
                            height={70}
                            className="pointer-events-none min-w-fit opacity-0 transition-opacity duration-75 group-hover:opacity-100"
                        >
                            <div className="bg-surface-raised text-foreground flex w-fit justify-center rounded p-2 text-sm whitespace-nowrap shadow-lg">
                                <div>
                                    <div className="font-bold capitalize">{point.label}</div>
                                    <div>x: {point.x.toFixed()}</div>
                                    <div>y: {point.y.toFixed()}</div>
                                </div>
                            </div>
                        </foreignObject>
                    </g>
                );
            })}
        </g>
    );
}

export { ScatterDot };
