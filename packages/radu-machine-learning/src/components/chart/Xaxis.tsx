import { HEIGHT, MARGIN, WIDTH } from './constants';

function Xaxis({
  xTicks,
  xScale,
  xName = 'x'
}: {
  xTicks: number[];
  xScale: (value: number) => number;
  xName?: string;
}) {
  return (
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
  );
}

export { Xaxis };
