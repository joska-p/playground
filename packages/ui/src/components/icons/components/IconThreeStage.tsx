import { createIcon } from '../lib';

export const IconThreeStage = createIcon({
  name: 'three-stage',
  viewBox: '0 0 80 60',
  children: (
    <>
      <path
        d="M40,4 L68,16 L40,28 L12,16 Z"
        fill="currentColor"
        opacity={0.25}
      />
      <path
        d="M40,28 L68,16 L68,40 L40,52 Z"
        fill="currentColor"
        opacity={0.45}
      />
      <path
        d="M40,28 L12,16 L12,40 L40,52 Z"
        fill="currentColor"
        opacity={0.65}
      />
      <line x1="40" y1="4" x2="40" y2="28" stroke="currentColor" strokeWidth="1" opacity={0.15} />
      <circle cx="40" cy="4" r="2.5" fill="currentColor" opacity={0.8} />
      <circle cx="68" cy="16" r="2" fill="currentColor" opacity={0.6} />
      <circle cx="12" cy="16" r="2" fill="currentColor" opacity={0.6} />
      <circle cx="68" cy="40" r="2" fill="currentColor" opacity={0.6} />
      <circle cx="12" cy="40" r="2" fill="currentColor" opacity={0.6} />
      <circle cx="40" cy="52" r="2" fill="currentColor" opacity={0.6} />
    </>
  ),
});
