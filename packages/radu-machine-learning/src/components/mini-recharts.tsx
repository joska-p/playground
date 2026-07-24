import React, { createContext, useContext, useState } from 'react';

export type Point = {
  drawingId: string | number;
  label: string;
  x: number;
  y: number;
};
type HoveredPoint = Point & { cx: number; cy: number };

type ChartContextType = {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  xScale: (val: number) => number;
  yScale: (val: number) => number;
  xDomain: [number, number];
  yDomain: [number, number];
  hoveredPoint: HoveredPoint | null;
  setHoveredPoint: (p: HoveredPoint | null) => void;
};

const ChartContext = createContext<ChartContextType | null>(null);
const useChart = () => useContext(ChartContext);

function findChildOfType<P>(
  children: React.ReactNode,
  type: React.ComponentType<P>
): React.ReactElement<P> | undefined {
  return React.Children.toArray(children).find(
    (child): child is React.ReactElement<P> => React.isValidElement(child) && child.type === type
  );
}

const WIDTH = 500;
const HEIGHT = 500;
const MARGIN = { top: 20, right: 20, bottom: 40, left: 40 };

type ScatterChartProps = {
  children: React.ReactNode;
  showTooltip?: boolean;
};

export const ScatterChart = ({ children, showTooltip = false }: ScatterChartProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<HoveredPoint | null>(null);

  const scatter = findChildOfType(children, Scatter);
  const data: Point[] = scatter?.props.data ?? [];

  if (!data.length) throw new Error('ScatterChart requires a Scatter child with data prop.');

  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);

  const xPad = (Math.max(...xs) - Math.min(...xs)) * 0.05 || 1;
  const yPad = (Math.max(...ys) - Math.min(...ys)) * 0.05 || 1;

  const xDomain: [number, number] = [Math.min(...xs) - xPad, Math.max(...xs) + xPad];
  const yDomain: [number, number] = [Math.min(...ys) - yPad, Math.max(...ys) + yPad];

  const xScale = (v: number) =>
    MARGIN.left +
    ((v - xDomain[0]) / (xDomain[1] - xDomain[0])) * (WIDTH - MARGIN.left - MARGIN.right);
  const yScale = (v: number) =>
    HEIGHT -
    MARGIN.bottom -
    ((v - yDomain[0]) / (yDomain[1] - yDomain[0])) * (HEIGHT - MARGIN.top - MARGIN.bottom);

  const ctxValue = {
    width: WIDTH,
    height: HEIGHT,
    margin: MARGIN,
    xScale,
    yScale,
    xDomain,
    yDomain,
    hoveredPoint,
    setHoveredPoint
  };

  return (
    <ChartContext.Provider value={ctxValue}>
      {/* Wrapper div to ensure tooltips position properly relative to the chart */}
      <div className="relative h-full w-full">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${String(WIDTH)} ${String(HEIGHT)}`}
          preserveAspectRatio="xMidYMid meet" // Preserves accurate aspect ratio alignment
          className="overflow-visible"
        >
          {children}
        </svg>
        {showTooltip && hoveredPoint && <TooltipRenderer />}
      </div>
    </ChartContext.Provider>
  );
};

export const XAxis = ({ name, fontSize = 12 }: { name?: string; fontSize?: number }) => {
  const ctx = useChart();
  if (!ctx) return null;
  const { xDomain, xScale, margin, width, height } = ctx;
  const ticks = Array.from(
    { length: 5 },
    (_, i) => xDomain[0] + (i * (xDomain[1] - xDomain[0])) / 4
  );

  return (
    <g>
      <line
        x1={margin.left}
        y1={height - margin.bottom}
        x2={width - margin.right}
        y2={height - margin.bottom}
        stroke="currentColor"
        className="text-gray-300"
      />
      {ticks.map((tick, i) => (
        <g key={i}>
          <line
            x1={xScale(tick)}
            y1={height - margin.bottom}
            x2={xScale(tick)}
            y2={height - margin.bottom + 5}
            stroke="currentColor"
            className="text-gray-300"
          />
          <text
            x={xScale(tick)}
            y={height - margin.bottom + 8}
            textAnchor="middle"
            dominantBaseline="hanging"
            fontSize={fontSize}
            fill="currentColor"
            className="text-gray-500"
          >
            {tick.toFixed(1)}
          </text>
        </g>
      ))}
      {name && (
        <text
          x={width - margin.right}
          y={height - margin.bottom + 30}
          textAnchor="end"
          fontSize={fontSize}
          fill="currentColor"
          className="font-medium text-gray-600"
        >
          {name}
        </text>
      )}
    </g>
  );
};

export const YAxis = ({ name, fontSize = 12 }: { name: string; fontSize?: number }) => {
  const ctx = useChart();
  if (!ctx) return null;
  const { yDomain, yScale, margin, height } = ctx;
  const ticks = Array.from(
    { length: 5 },
    (_, i) => yDomain[0] + (i * (yDomain[1] - yDomain[0])) / 4
  );

  return (
    <g>
      <line
        x1={margin.left}
        y1={margin.top}
        x2={margin.left}
        y2={height - margin.bottom}
        stroke="currentColor"
        className="text-gray-300"
      />
      {ticks.map((tick, i) => (
        <g key={i}>
          <line
            x1={margin.left - 5}
            y1={yScale(tick)}
            x2={margin.left}
            y2={yScale(tick)}
            stroke="currentColor"
            className="text-gray-300"
          />
          <text
            x={margin.left - 8}
            y={yScale(tick)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={fontSize}
            fill="currentColor"
            className="text-gray-500"
          >
            {tick.toFixed(1)}
          </text>
        </g>
      ))}
      {name && (
        <text
          x={margin.left}
          y={margin.top - 8}
          textAnchor="start"
          fontSize={fontSize}
          fill="currentColor"
          className="font-medium text-gray-600"
        >
          {name}
        </text>
      )}
    </g>
  );
};

type ScatterProps = {
  data: Point[];
  shape: React.ReactElement<{ cx: number; cy: number; payload: Point }>;
  onClick: (arg: { payload: Point }) => void;
};

export const Scatter = ({ data, shape, onClick }: ScatterProps) => {
  const ctx = useChart();
  if (!ctx) return null;

  return (
    <g>
      {data.map((point) => {
        const cx = ctx.xScale(point.x);
        const cy = ctx.yScale(point.y);

        return (
          <g
            key={point.drawingId} // Prefer unique IDs over array indices
            onMouseEnter={() => {
              ctx.setHoveredPoint({ ...point, cx, cy });
            }}
            onMouseLeave={() => {
              ctx.setHoveredPoint(null);
            }}
            onClick={() => {
              onClick({ payload: point });
            }}
            className="cursor-pointer"
          >
            {React.cloneElement(shape, { cx, cy, payload: point })}
          </g>
        );
      })}
    </g>
  );
};

const TooltipRenderer = () => {
  const ctx = useChart();
  if (!ctx?.hoveredPoint) return null;

  const point = ctx.hoveredPoint;
  const leftPct = (point.cx / ctx.width) * 100;
  const topPct = (point.cy / ctx.height) * 100;

  return (
    <div
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded bg-black/80 p-2 text-xs whitespace-nowrap text-white shadow-lg transition-all duration-75"
      style={{ left: `${String(leftPct)}%`, top: `${String(topPct)}%` }}
    >
      {point.label && <div className="font-bold capitalize">{point.label}</div>}
      <div>x: {point.x.toFixed(2)}</div>
      <div>y: {point.y.toFixed(2)}</div>
    </div>
  );
};
