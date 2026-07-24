import { ControlSection } from '@repo/ui/control-panel';
import { useRef } from 'react';
import type { Label } from '../core/types';
import { features } from '../data/dataset/ts_objects/features';
import { ScatterChart } from './ScatterChart';
import type { Point } from './chart-utils';

const { featureNames, samples } = features;

const data: Point[] = samples.toSpliced(100).map(({ label, point, id }) => ({
  drawingId: id,
  label,
  x: point[0],
  y: point[1]
}));

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
  const activeElementRef = useRef<HTMLElement | null>(null);

  const handleScatterClick = (point: Point) => {
    const { drawingId, label } = point;
    const elementId = `drawing-${String(drawingId)}`;
    const targetElement = document.getElementById(elementId);

    // 1. Remove classes & styles from previous active element
    if (activeElementRef.current) {
      activeElementRef.current.classList.remove('ring', 'z-10');
      activeElementRef.current.style.removeProperty('--tw-ring-color');
    }

    // 2. Add classes & styles to newly selected element + scroll
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
      targetElement.classList.add('ring', 'z-10');
      targetElement.style.setProperty('--tw-ring-color', labelToColorMap[label as Label]);
      activeElementRef.current = targetElement;
    }
  };

  return (
    <ControlSection title="charts">
      <div className="relative aspect-square w-full">
        <ScatterChart
          data={data}
          xName={featureNames[0]}
          yName={featureNames[1]}
          showTooltip
          renderDot={(point, { cx, cy }) => (
            <circle
              id={`drawing-${String(point.drawingId)}`}
              cx={cx}
              cy={cy}
              r={4}
              fill={labelToColorMap[point.label as Label]}
              className="hover:r-[8px] cursor-pointer transition-[r] duration-200"
            />
          )}
          onPointClick={handleScatterClick}
        />
      </div>
    </ControlSection>
  );
}

export { Chart };
