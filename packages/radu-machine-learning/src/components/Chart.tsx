import { ControlSection } from '@repo/ui/control-panel';
import { useRef } from 'react';
import type { Label } from '../core/types';
import { features } from '../data/dataset/ts_objects/features';
import { Scatter, ScatterChart, XAxis, YAxis, type Point } from './mini-recharts';

const { featureNames, samples } = features;

type DrawingPoint = Omit<Point, 'label'> & { label: Label };

const data: DrawingPoint[] = samples.toSpliced(100).map(({ label, point, id }) => ({
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

type CustomDotProps = {
  cx?: number;
  cy?: number;
  payload?: DrawingPoint;
};

// Simplified using CSS hover transitions instead of direct DOM manipulation
const CustomScatterDot = ({ cx, cy, payload }: CustomDotProps) => {
  if (!cx || !cy || !payload) return null;
  const color = labelToColorMap[payload.label];

  return (
    <circle
      data-drawing-id={payload.drawingId}
      cx={cx}
      cy={cy}
      r={4}
      fill={color}
      className="hover:r-[8px] cursor-pointer transition-[r] duration-200"
    />
  );
};

function Chart() {
  const activeElementRef = useRef<HTMLElement | null>(null);

  const handleScatterClick = ({ payload }: { payload: Point }) => {
    const drawingPayload = payload as DrawingPoint;
    const elementId = `drawing-${String(drawingPayload.drawingId)}`;
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
      targetElement.style.setProperty('--tw-ring-color', labelToColorMap[drawingPayload.label]);
      activeElementRef.current = targetElement;
    }
  };

  return (
    <ControlSection title="charts">
      {/* Container must be relative for the tooltip positioning to work */}
      <div className="relative aspect-square w-full">
        <ScatterChart showTooltip>
          <XAxis
            name={featureNames[0]}
            fontSize={12}
          />
          <YAxis
            name={featureNames[1]}
            fontSize={12}
          />
          <Scatter
            data={data}
            shape={<CustomScatterDot />}
            onClick={handleScatterClick}
          />
        </ScatterChart>
      </div>
    </ControlSection>
  );
}

export { Chart };
