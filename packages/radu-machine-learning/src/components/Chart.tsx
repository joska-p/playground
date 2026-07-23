import { ControlSection } from '@repo/ui/control-panel';
import { useRef } from 'react';
import type { ScatterPointItem } from 'recharts';
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import type { Label } from '../core/types';
import { features } from '../data/dataset/ts_objects/features';

const { featureNames, samples } = features;

const data = samples.toSpliced(100).map(({ label, point, id }) => ({
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
  payload?: { drawingId: number; label: Label; x: number; y: number };
};

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
      className="cursor-pointer transition-[r] duration-200"
      onMouseEnter={(e) => {
        e.currentTarget.setAttribute('r', '8');
      }}
      onMouseLeave={(e) => {
        e.currentTarget.setAttribute('r', '4');
      }}
    />
  );
};

function Chart() {
  const activeElementRef = useRef<HTMLElement | null>(null);

  const handleScatterClick = (rechartsData: ScatterPointItem) => {
    const payload = rechartsData.payload as CustomDotProps['payload'];
    if (!payload) return;

    const elementId = `drawing-${payload.drawingId}`;
    const targetElement = document.getElementById(elementId);

    if (activeElementRef.current) {
      activeElementRef.current.classList.remove('ring', 'z-10');
      activeElementRef.current.style.removeProperty('--tw-ring-color');
    }

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });

      targetElement.classList.add('ring', 'z-10');
      targetElement.style.setProperty('--tw-ring-color', labelToColorMap[payload.label]);
      activeElementRef.current = targetElement;
    }
  };

  return (
    <ControlSection title="charts">
      <div style={{ width: '100%', aspectRatio: '1/1' }}>
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <ScatterChart>
            <XAxis
              type="number"
              dataKey="x"
              name={featureNames[0]}
              fontSize={12}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={featureNames[1]}
              fontSize={12}
            />
            <Tooltip cursor={false} />

            <Scatter
              data={data}
              shape={<CustomScatterDot />}
              onClick={handleScatterClick}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ControlSection>
  );
}

export { Chart };
