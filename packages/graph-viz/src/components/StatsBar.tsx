import type React from 'react';
import type { CSSProperties } from 'react';

import { Dot } from './Dot';

type StatsBarProps = {
  nodeCount: number;
  edgeCount: number;
  hyperedgeCount: number;
};

function StatsBar({
  nodeCount,
  edgeCount,
  hyperedgeCount,
}: StatsBarProps): React.JSX.Element {
  return (
    <div style={s.stats}>
      <span style={s.statItem}>
        <Dot color="#4cc9f0" />
        {nodeCount.toLocaleString()} nodes
      </span>
      <span style={s.statItem}>
        <Dot color="#7209b7" />
        {edgeCount.toLocaleString()} edges
      </span>
      <span style={s.statItem}>
        <Dot color="#f72585" />
        {hyperedgeCount} hyperedges
      </span>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const s: Record<string, CSSProperties> = {
  stats: {
    position: 'absolute',
    top: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 20,
    background: 'rgba(8,12,20,0.75)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: '6px 18px',
    backdropFilter: 'blur(10px)',
  },
  statItem: {
    color: '#c0d0e8',
    fontSize: 12,
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center',
  },
};

export { StatsBar };
export type { StatsBarProps };
