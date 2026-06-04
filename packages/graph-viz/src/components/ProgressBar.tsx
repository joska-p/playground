import type React from 'react';
import type { CSSProperties } from 'react';

type ProgressBarProps = {
  progress: number;
};

function ProgressBar({ progress }: ProgressBarProps): React.JSX.Element {
  return (
    <div style={s.progressWrap}>
      <div style={s.progressLabel}>Simulating layout… {progress}%</div>
      <div style={s.progressTrack}>
        <div style={{ ...s.progressBar, width: `${progress}%` }} />
      </div>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const s: Record<string, CSSProperties> = {
  progressWrap: {
    position: 'absolute',
    bottom: 60,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(8,12,20,0.85)',
    border: '1px solid rgba(76,201,240,0.3)',
    borderRadius: 8,
    padding: '10px 16px',
    minWidth: 260,
    backdropFilter: 'blur(8px)',
  },
  progressLabel: {
    color: '#4cc9f0',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    background: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg,#4361ee,#4cc9f0)',
    transition: 'width 0.2s ease',
    borderRadius: 2,
  },
};

export { ProgressBar };
export type { ProgressBarProps };
