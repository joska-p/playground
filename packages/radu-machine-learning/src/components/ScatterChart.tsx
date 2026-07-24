import React, { useMemo, useState } from 'react';
import { computeChartBounds, createScalers, getTicks, type Point } from './chart-utils';

const WIDTH = 500;
const HEIGHT = 500;
const MARGIN = { top: 25, right: 25, bottom: 45, left: 45 };

type ScatterChartProps = {
  data: Point[];
  xName?: string;
  yName?: string;
  showTooltip?: boolean;
  renderDot: (point: Point, coords: { cx: number; cy: number }) => React.ReactNode;
  onPointClick?: (point: Point) => void;
};

export const ScatterChart = ({
  data,
  xName,
  yName,
  showTooltip = false,
  renderDot,
  onPointClick
}: ScatterChartProps) => {
  const [hovered, setHovered] = useState<{ point: Point; cx: number; cy: number } | null>(null);

  const domain = computeChartBounds(data);
  const xDomain = domain.xDomain;
  const yDomain = domain.yDomain;

  const { xScale, yScale } = useMemo(
    () =>
      createScalers(xDomain, yDomain, {
        width: WIDTH,
        height: HEIGHT,
        margin: MARGIN
      }),
    [xDomain, yDomain]
  );

  const xTicks = useMemo(() => getTicks(xDomain, 5), [xDomain]);
  const yTicks = useMemo(() => getTicks(yDomain, 5), [yDomain]);

  return (
    <div className="relative h-full w-full">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${String(WIDTH)} ${String(HEIGHT)}`}
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      >
        {/* X Axis */}
        <g>
          <line
            x1={MARGIN.left}
            y1={HEIGHT - MARGIN.bottom}
            x2={WIDTH - MARGIN.right}
            y2={HEIGHT - MARGIN.bottom}
            stroke="currentColor"
            className="text-gray-300"
          />
          {xTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={xScale(tick)}
                y1={HEIGHT - MARGIN.bottom}
                x2={xScale(tick)}
                y2={HEIGHT - MARGIN.bottom + 5}
                stroke="currentColor"
                className="text-gray-300"
              />
              <text
                x={xScale(tick)}
                y={HEIGHT - MARGIN.bottom + 8}
                textAnchor="middle"
                dominantBaseline="hanging"
                fontSize={12}
                fill="currentColor"
                className="text-gray-500"
              >
                {tick.toFixed(1)}
              </text>
            </g>
          ))}
          {xName && (
            <text
              x={WIDTH - MARGIN.right}
              y={HEIGHT - MARGIN.bottom + 32}
              textAnchor="end"
              fontSize={12}
              fill="currentColor"
              className="font-medium text-gray-600"
            >
              {xName}
            </text>
          )}
        </g>

        {/* Y Axis */}
        <g>
          <line
            x1={MARGIN.left}
            y1={MARGIN.top}
            x2={MARGIN.left}
            y2={HEIGHT - MARGIN.bottom}
            stroke="currentColor"
            className="text-gray-300"
          />
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={MARGIN.left - 5}
                y1={yScale(tick)}
                x2={MARGIN.left}
                y2={yScale(tick)}
                stroke="currentColor"
                className="text-gray-300"
              />
              <text
                x={MARGIN.left - 8}
                y={yScale(tick)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={12}
                fill="currentColor"
                className="text-gray-500"
              >
                {tick.toFixed(1)}
              </text>
            </g>
          ))}
          {yName && (
            <text
              x={MARGIN.left}
              y={MARGIN.top - 12}
              textAnchor="start"
              fontSize={12}
              fill="currentColor"
              className="font-medium text-gray-600"
            >
              {yName}
            </text>
          )}
        </g>

        {/* Scatter Points */}
        <g>
          {data.map((point) => {
            const cx = xScale(point.x);
            const cy = yScale(point.y);

            return (
              <g
                key={point.drawingId}
                onMouseEnter={() => {
                  setHovered({ point, cx, cy });
                }}
                onMouseLeave={() => {
                  setHovered(null);
                }}
                onClick={() => onPointClick?.(point)}
              >
                {renderDot(point, { cx, cy })}
              </g>
            );
          })}
        </g>
      </svg>

      {showTooltip && hovered && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded bg-black/80 p-2 text-xs whitespace-nowrap text-white shadow-lg transition-all duration-75"
          style={{
            left: `${String((hovered.cx / WIDTH) * 100)}%`,
            top: `${String((hovered.cy / HEIGHT) * 100)}%`
          }}
        >
          {hovered.point.label && <div className="font-bold capitalize">{hovered.point.label}</div>}
          <div>x: {hovered.point.x.toFixed(2)}</div>
          <div>y: {hovered.point.y.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
};
