import { createIcon } from '../lib';

export const IconPieChart = createIcon({
  name: 'pie-chart',
  viewBox: '0 0 80 60',
  children: (
    <>
      <circle
        cx="40"
        cy="30"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity={0.3}
      />
      <circle
        cx="40"
        cy="30"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity={0.2}
      />
      <path
        d="M40,6 A24,24 0 0,1 63,18 L40,30 Z"
        fill="currentColor"
        opacity={0.7}
      />
      <path
        d="M40,30 L63,18 A24,24 0 0,1 64,42 L40,30 Z"
        fill="currentColor"
        opacity={0.5}
      />
      <path
        d="M40,30 L64,42 A24,24 0 0,1 40,54 L40,30 Z"
        fill="currentColor"
        opacity={0.9}
      />
      <path
        d="M40,30 L40,54 A24,24 0 0,1 17,41 L40,30 Z"
        fill="currentColor"
        opacity={0.35}
      />
      <path
        d="M40,30 L17,41 A24,24 0 0,1 16,18 L40,30 Z"
        fill="currentColor"
        opacity={0.6}
      />
    </>
  ),
});
