import { createIcon } from '../lib';

export const IconSequences = createIcon({
  name: 'sequences',
  viewBox: '0 0 80 60',
  children: (
    <>
      <path
        d="M4,40 L12,40 L12,28 L20,28 L20,40 L28,40 L28,20 L36,20 L36,40 L44,40 L44,12 L52,12 L52,40 L60,40 L60,48 L68,48 L68,40 L76,40"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity={0.4}
      />
      <circle
        cx="4"
        cy="40"
        r="3"
        fill="currentColor"
        opacity={0.9}
      />
      <circle
        cx="76"
        cy="40"
        r="3"
        fill="currentColor"
        opacity={0.9}
      />
      {[12, 28, 20, 40, 12, 20, 48].map((y, i) => (
        <circle
          key={i}
          cx={12 + i * 8}
          cy={y}
          r="2"
          fill="currentColor"
          opacity={0.5 + (i % 3) * 0.15}
        />
      ))}
    </>
  )
});
