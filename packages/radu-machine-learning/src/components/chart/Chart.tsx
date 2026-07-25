import { useState } from 'react';
import type { Label } from '../../core/types';
import { features } from '../../data/dataset/ts_objects/features';
import { setSelectedDrawingId, useSelectedDrawingId } from '../../stores/radu';
import { ScatterChart } from './ScatterChart';
import type { Point } from './types';

const { featureNames, samples } = features;

const data: Point[] = samples.toSpliced(100).map(({ label, point, id }) => ({
  drawingId: id,
  label,
  x: point[0],
  y: point[1]
}));

function dotRadius(selectedDrawingId: number | null, pointDrawingId: number) {
  return selectedDrawingId === pointDrawingId ? 8 : 4;
}

const labelToColorMap: Record<Label, string> = {
  car: 'var(--color-red)',
  fish: 'var(--color-blue)',
  house: 'var(--color-primary)',
  tree: 'var(--color-green)',
  bicycle: 'var(--color-yellow)',
  guitar: 'var(--color-purple)',
  pencil: 'var(--color-aqua)',
  clock: 'var(--color-orange)'
};

function Chart() {
  const selectedDrawingId = useSelectedDrawingId();
  const [hovered, setHovered] = useState<{
    point: Point;
    cx: number;
    cy: number;
  } | null>(null);

  const handleScatterClick = (point: Point) => {
    const { drawingId } = point;
    const targetElement = document.querySelector(`[data-drawing-id="${String(drawingId)}"]`);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
      setSelectedDrawingId(drawingId);
    }
  };

  return (
    <div className="relative aspect-4/3 w-full">
      <ScatterChart
        data={data}
        xName={featureNames[0]}
        yName={featureNames[1]}
        hovered={hovered}
        renderDot={(point, { cx, cy }) => (
          <circle
            data-drawing-id-point={point.drawingId}
            cx={cx}
            cy={cy}
            r={dotRadius(selectedDrawingId, point.drawingId)}
            fill={labelToColorMap[point.label as Label]}
            className="cursor-pointer transition-[r] duration-200"
            onMouseEnter={(e) => {
              setHovered({ point, cx, cy });
              e.currentTarget.setAttribute('r', '8');
            }}
            onMouseLeave={(e) => {
              setHovered(null);
              e.currentTarget.setAttribute('r', '4');
            }}
            onClick={() => {
              handleScatterClick(point);
            }}
          />
        )}
      />
    </div>
  );
}

export { Chart };
