import type { CSSProperties, ReactNode } from 'react';

const CORNER_SIZE = 10;

const cornerBaseStyle: CSSProperties = {
  borderColor: 'var(--primary)',
  borderStyle: 'solid',
  position: 'absolute',
  width: CORNER_SIZE,
  height: CORNER_SIZE
};

export function Corners({ children, sizePx }: { children: ReactNode; sizePx: number }) {
  return (
    <div style={{ position: 'relative', width: sizePx, height: sizePx }}>
      <span style={{ ...cornerBaseStyle, top: 0, left: 0, borderWidth: '2px 0 0 2px' }} />
      <span style={{ ...cornerBaseStyle, top: 0, right: 0, borderWidth: '2px 2px 0 0' }} />
      <span style={{ ...cornerBaseStyle, bottom: 0, left: 0, borderWidth: '0 0 2px 2px' }} />
      <span style={{ ...cornerBaseStyle, bottom: 0, right: 0, borderWidth: '0 2px 2px 0' }} />
      {children}
    </div>
  );
}
