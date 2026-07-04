import { createIcon } from '../lib';

const bars = [
  { x: 6, h: 22 },
  { x: 20, h: 42 },
  { x: 34, h: 30 },
  { x: 48, h: 52 },
  { x: 62, h: 18 }
];
const baseline = 56;
const barW = 12;

export const IconDataViz = createIcon({
  name: 'data-viz',
  viewBox: '0 0 80 60',
  children: (
    <>
      <line
        x1="2"
        y1={baseline}
        x2="78"
        y2={baseline}
        stroke="currentColor"
        strokeWidth="1"
        opacity={0.3}
      />
      {bars.map(({ x, h }, i) => (
        <rect
          key={i}
          x={x}
          y={baseline - h}
          width={barW}
          height={h}
          fill="currentColor"
          opacity={0.75 - i * 0.04}
        />
      ))}
    </>
  )
});
