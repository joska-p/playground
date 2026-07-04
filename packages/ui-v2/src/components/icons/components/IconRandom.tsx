import { createIcon } from '../lib';

const dots = [
  { cx: 12, cy: 14, r: 4.5 },
  { cx: 35, cy: 8, r: 6 },
  { cx: 60, cy: 18, r: 3 },
  { cx: 72, cy: 10, r: 5 },
  { cx: 22, cy: 36, r: 7 },
  { cx: 50, cy: 42, r: 4 },
  { cx: 68, cy: 46, r: 5.5 },
  { cx: 8, cy: 52, r: 3 },
  { cx: 40, cy: 54, r: 4.5 },
  { cx: 76, cy: 34, r: 2.5 }
];

export const IconRandom = createIcon({
  name: 'random',
  viewBox: '0 0 80 60',
  children: (
    <>
      {dots.map(({ cx, cy, r }, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="currentColor"
          opacity={0.5 + (i % 3) * 0.15}
        />
      ))}
    </>
  )
});
