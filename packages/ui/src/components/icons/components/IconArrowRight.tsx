import { createIcon } from '../lib';

export const IconArrowRight = createIcon({
  name: 'arrow-right',
  children: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  defaultProps: { strokeWidth: 2.5 },
});
