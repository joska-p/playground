import { createIcon } from '../lib';

export const IconGenerative = createIcon({
  name: 'generative',
  viewBox: '0 0 80 60',
  children: (
    <>
      <path
        d="M0,20 C6,8 14,8 20,20 C26,32 34,32 40,20 C46,8 54,8 60,20 C66,32 74,32 80,20"
        stroke="currentColor"
        strokeWidth="2"
        opacity={0.9}
        fill="none"
      />
      <path
        d="M0,30 C6,18 14,18 20,30 C26,42 34,42 40,30 C46,18 54,18 60,30 C66,42 74,42 80,30"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity={0.5}
        fill="none"
      />
      <path
        d="M0,40 C6,28 14,28 20,40 C26,52 34,52 40,40 C46,28 54,28 60,40 C66,52 74,52 80,40"
        stroke="currentColor"
        strokeWidth="1"
        opacity={0.25}
        fill="none"
      />
    </>
  ),
});
