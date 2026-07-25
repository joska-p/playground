import { useState } from 'react';
import { CHART_SAMPLE_LIMIT, labelToColorMap } from '../../constants';
import { features } from '../../data/dataset/ts_objects/features';
import {
  setSelectedDrawingId,
  useCurrentDrawingPathCount,
  useCurrentDrawingPointCount,
  useSelectedDrawingId
} from '../../stores/store';
import { ScatterChart } from './ScatterChart';
import type { ChartPoint } from './types';

const { featureNames, samples } = features;

function dotRadius(
  selectedDrawingId: number | null,
  pointDrawingId: number | null,
  isHovered: boolean
) {
  if (isHovered || selectedDrawingId === pointDrawingId) return 8;
  return 4;
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

  if (currentDrawingPointCount > 0) {
    data.push({
      drawingId: null,
      label: 'current',
      x: currentDrawingPathCount,
      y: currentDrawingPointCount
    });
  }

  const handleScatterClick = (point: ChartPoint) => {
    const targetElement = document.querySelector(`[data-drawing-id="${String(point.drawingId)}"]`);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
      setSelectedDrawingId(point.drawingId);
    }
  };

  return (
    <div className="relative aspect-4/3 w-full">
      <ScatterChart
        data={data}
        xName={featureNames[0]}
        yName={featureNames[1]}
        hovered={hovered}
        renderDot={(point, { cx, cy }) => {
          const isHovered = hovered?.point.drawingId === point.drawingId;
          return (
            <circle
              data-drawing-id-point={point.drawingId}
              cx={cx}
              cy={cy}
              r={dotRadius(selectedDrawingId, point.drawingId, isHovered)}
              fill={point.label === 'current' ? 'red' : labelToColorMap[point.label]}
              className="cursor-pointer transition-[r] duration-200"
              onMouseEnter={() => {
                setHovered({ point, cx, cy });
              }}
              onMouseLeave={() => {
                setHovered(null);
              }}
              onClick={() => {
                handleScatterClick(point);
              }}
            />
          );
        }}
      />
    </div>
  );
}

export { Chart };
