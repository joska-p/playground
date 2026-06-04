import type React from 'react';
import type { CSSProperties } from 'react';

import { communityColor } from '../core/palette';
import { Dot } from './Dot';

const LEGEND_ITEMS = [
  { color: communityColor(32), label: 'Community cluster' },
  { color: '#4cc9f0', label: 'Code node' },
  { color: '#f77f00', label: 'Document node' },
  { color: '#06d6a0', label: 'Image node' },
];

function Legend(): React.JSX.Element {
  return (
    <div style={s.legend}>
      {LEGEND_ITEMS.map((it) => (
        <div
          key={it.label}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Dot color={it.color} />
          <span style={s.legendLabel}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const s: Record<string, CSSProperties> = {
  legend: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    background: 'rgba(8,12,20,0.7)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 8,
    padding: '10px 14px',
    backdropFilter: 'blur(8px)',
  },
  legendLabel: { color: '#6a90b0', fontSize: 11, fontFamily: 'monospace' },
};

export { Legend };
