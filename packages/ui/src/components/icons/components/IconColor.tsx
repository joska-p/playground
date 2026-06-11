import { createIcon } from '../lib';

export const IconColor = createIcon({
  name: 'color',
  viewBox: '0 0 80 60',
  children: (
    <>
      <circle
        cx="40"
        cy="22"
        r="18"
        fill="currentColor"
        opacity={0.6}
      />
      <circle
        cx="27"
        cy="42"
        r="18"
        fill="currentColor"
        opacity={0.4}
      />
      <circle
        cx="53"
        cy="42"
        r="18"
        fill="currentColor"
        opacity={0.4}
      />
    </>
  ),
});
