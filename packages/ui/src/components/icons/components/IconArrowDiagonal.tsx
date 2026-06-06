import { createIcon } from '../lib';

export const IconArrowDiagonal = createIcon({
  name: 'arrow-diagonal',
  children: (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
  defaultProps: { strokeWidth: 2.5 },
});
