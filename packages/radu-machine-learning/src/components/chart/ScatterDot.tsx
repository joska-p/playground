import type { Point } from './types';

type ScatterDotProps = {
  data: Point[];
  xScale: (value: number) => number;
  yScale: (value: number) => number;
  renderDot: (point: Point, coords: { cx: number; cy: number }) => React.ReactNode;
  onPointClick?: (point: Point) => void;
  setHovered: React.Dispatch<
    React.SetStateAction<{
      point: Point;
      cx: number;
      cy: number;
    } | null>
  >;
};

function ScatterDot({
  data,
  xScale,
  yScale,
  renderDot,
  onPointClick,
  setHovered
}: ScatterDotProps) {
  return (
    <g>
      {data.map((point) => {
        const cx = xScale(point.x);
        const cy = yScale(point.y);

        return (
          <g
            key={point.drawingId}
            className="cursor-pointer transition-[r] duration-200"
            onMouseEnter={(e) => {
              setHovered({ point, cx, cy });
              e.currentTarget.setAttribute('r', '8');
            }}
            onMouseLeave={(e) => {
              setHovered(null);
              e.currentTarget.setAttribute('r', '4');
            }}
            onClick={() => onPointClick?.(point)}
          >
            {renderDot(point, { cx, cy })}
          </g>
        );
      })}
    </g>
  );
}

export { ScatterDot };
