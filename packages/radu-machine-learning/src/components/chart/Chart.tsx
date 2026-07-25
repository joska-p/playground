import { useState } from 'react';
import { CHART_SAMPLE_LIMIT, CURRENT_DRAWING_ID, labelToColorMap } from '../../constants';
import type { Label } from '../../core/types';
import { features } from '../../data/dataset/ts_objects/features';
import {
  setSelectedDrawingId,
  useCurrentDrawingPathCount,
  useCurrentDrawingPointCount,
  useSelectedDrawingId
} from '../../stores/radu';
import { ScatterChart } from './ScatterChart';
import type { ChartPoint } from './types';

const { featureNames, samples } = features;

function dotRadius(selectedDrawingId: number | null, pointDrawingId: number) {
  return selectedDrawingId === pointDrawingId ? 8 : 4;
}

function Chart() {
  const selectedDrawingId = useSelectedDrawingId();
  const currentDrawingPathCount = useCurrentDrawingPathCount();
  const currentDrawingPointCount = useCurrentDrawingPointCount();
  const [hovered, setHovered] = useState<{
    point: ChartPoint;
    cx: number;
    cy: number;
  } | null>(null);

  const data: ChartPoint[] = samples.toSpliced(CHART_SAMPLE_LIMIT).map(({ label, point, id }) => ({
    drawingId: id,
    label,
    x: point[0],
    y: point[1]
  }));

  const augmentedData =
    currentDrawingPointCount > 0
      ? [
          ...data,
          {
            drawingId: CURRENT_DRAWING_ID,
            label: 'current',
            x: currentDrawingPathCount,
            y: currentDrawingPointCount
          }
        ]
      : data;

  const handleScatterClick = (point: ChartPoint) => {
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
        data={augmentedData}
        xName={featureNames[0]}
        yName={featureNames[1]}
        hovered={hovered}
        renderDot={(point, { cx, cy }) => (
          <circle
            data-drawing-id-point={point.drawingId}
            cx={cx}
            cy={cy}
            r={dotRadius(selectedDrawingId, point.drawingId)}
            fill={point.label === 'current' ? 'red' : labelToColorMap[point.label as Label]}
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
