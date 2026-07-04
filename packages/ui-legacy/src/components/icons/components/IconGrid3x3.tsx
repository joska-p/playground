import { createIcon } from '../lib';

export const IconGrid3x3 = createIcon({
  name: 'grid-3x3',
  children: (
    <>
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="2"
      />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </>
  )
});
