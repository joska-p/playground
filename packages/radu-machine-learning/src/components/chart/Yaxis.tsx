import { HEIGHT, MARGIN } from './constants';

function Yaxis({
  yTicks,
  yScale,
  yName = 'y'
}: {
  yTicks: number[];
  yScale: (value: number) => number;
  yName?: string;
}) {
  return (
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
  );
}

export { Yaxis };
