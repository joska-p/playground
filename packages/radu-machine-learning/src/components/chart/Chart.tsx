import { cn } from '@repo/ui/lib/cn';
import { labelToColorMap } from '../../constants';
import { features } from '../../data/dataset/ts_objects/features';
import { setShowTooltipAt, useShowTooltipAt } from '../../stores/chart-ui';
import { scrollToDrawing, useSelectedDrawingId } from '../../stores/selection';
import { useSketchpadPathCount, useSketchpadPointCount } from '../../stores/sketchpad';
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
  const currentDrawingPathCount = useSketchpadPathCount();
  const currentDrawingPointCount = useSketchpadPointCount();
  const showTooltipAt = useShowTooltipAt();

  const data: ChartPoint[] = samples.map(({ label, point, id }) => ({
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
    if (point.drawingId !== null) {
      scrollToDrawing(point.drawingId);
    }
  };

  return (
    <div className="relative aspect-4/3 w-full">
      <ScatterChart
        data={data}
        xName={featureNames[0]}
        yName={featureNames[1]}
        renderDot={(point, { cx, cy }) => {
          const isHovered = showTooltipAt?.point.drawingId === point.drawingId;
          return (
            <circle
              data-drawing-id-point={point.drawingId}
              cx={cx}
              cy={cy}
              r={dotRadius(selectedDrawingId, point.drawingId, isHovered)}
              fill={point.label === 'current' ? 'var(--destructive)' : labelToColorMap[point.label]}
              className={cn(
                'cursor-pointer opacity-25 transition-[r_opacity] duration-200 hover:opacity-100',
                { 'opacity-100': selectedDrawingId === point.drawingId }
              )}
              onMouseEnter={() => {
                setShowTooltipAt({ point, cx, cy });
              }}
              onMouseLeave={() => {
                setShowTooltipAt(null);
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
