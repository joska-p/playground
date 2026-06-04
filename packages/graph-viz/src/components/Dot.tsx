import type React from 'react';
import type { CSSProperties } from 'react';

type DotProps = {
  color: string;
};

function Dot({ color }: DotProps): React.JSX.Element {
  return (
    <span
      style={{
        ...dotStyle,
        background: color,
      }}
    />
  );
}

const dotStyle: CSSProperties = {
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  marginRight: 5,
};

export { Dot };
export type { DotProps };
