import type React from 'react';
import type { ChartPoint } from './types';

type ScatterDotProps = {
  data: ChartPoint[];
  xScale: (value: number) => number;
  yScale: (value: number) => number;
  renderDot: (point: ChartPoint, coords: { cx: number; cy: number }) => React.ReactNode;
};

function ScatterDot({ data, xScale, yScale, renderDot }: ScatterDotProps) {
  return (
    <g>
      {data.map((point) => {
        const cx = xScale(point.x);
        const cy = yScale(point.y);

        return (
          <g
            key={point.drawingId}
            className="cursor-pointer transition-[r] duration-200"
          >
            {renderDot(point, { cx, cy })}
          </g>
        );
      })}
    </g>
  );
}

export { ScatterDot };
