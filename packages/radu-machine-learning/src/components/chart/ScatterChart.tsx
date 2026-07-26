import type { ReactNode } from 'react';
import { computeChartBounds, createScalers, getTicks } from './chart-utils';
import { HEIGHT, MARGIN, WIDTH } from './constants';
import { ScatterDot } from './ScatterDot';
import { Tooltip } from './Tooltip';
import type { ChartPoint } from './types';
import { Xaxis } from './Xaxis';
import { Yaxis } from './Yaxis';

type ScatterChartProps = {
  data: ChartPoint[];
  xName?: string;
  yName?: string;
  renderDot: (point: ChartPoint, coords: { cx: number; cy: number }) => ReactNode;
};

function ScatterChart({ data, xName, yName, renderDot }: ScatterChartProps) {
  const domain = computeChartBounds(data);
  const xDomain = domain.xDomain;
  const yDomain = domain.yDomain;

  const { xScale, yScale } = createScalers(xDomain, yDomain, {
    width: WIDTH,
    height: HEIGHT,
    margin: MARGIN
  });

  const xTicks = getTicks(xDomain, 5);
  const yTicks = getTicks(yDomain, 5);

  return (
    <div className="relative aspect-3/2 w-full">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${String(WIDTH)} ${String(HEIGHT)}`}
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      >
        <Xaxis
          xTicks={xTicks}
          xScale={xScale}
          xName={xName}
        />

        <Yaxis
          yTicks={yTicks}
          yScale={yScale}
          yName={yName}
        />

        <ScatterDot
          data={data}
          xScale={xScale}
          yScale={yScale}
          renderDot={renderDot}
        />
      </svg>

      <Tooltip />
    </div>
  );
}

export { ScatterChart };
