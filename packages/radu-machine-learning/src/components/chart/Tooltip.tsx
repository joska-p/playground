import { HEIGHT, WIDTH } from './constants';
import type { ChartPoint } from './types';

function Tooltip({ hovered }: { hovered: { point: ChartPoint; cx: number; cy: number } | null }) {
  if (!hovered) return null;

  return (
    <div
      className="bg-surface-raised text-foreground pointer-events-none absolute z-20 block -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded p-2 text-xs whitespace-nowrap shadow-lg transition-all duration-75"
      style={{
        left: `${String((hovered.cx / WIDTH) * 100)}%`,
        top: `${String((hovered.cy / HEIGHT) * 100)}%`
      }}
    >
      <div className="font-bold capitalize">{hovered.point.label}</div>
      <div>x: {hovered.point.x.toFixed(2)}</div>
      <div>y: {hovered.point.y.toFixed(2)}</div>
    </div>
  );
}

export { Tooltip };
