import { Button } from '@repo/ui/Button';
import { setShowDebug } from '../../stores/ui/actions.ts';
import { useShowDebug } from '../../stores/ui/selectors.ts';
import {
  useCols,
  useGeneration,
  useRows,
} from '../../stores/simulation/selectors.ts';
import { useStepTimer } from '../../hooks/useStepTimer.ts';

function DebugIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4.5C4 4.5 5 4 7 4C9 4 10 4.5 10 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M4 8.5C4 8.5 5 9 7 9C9 9 10 8.5 10 8.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M2 5V10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M12 5V10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle
        cx="7"
        cy="2.5"
        r="0.8"
        fill="currentColor"
      />
      <circle
        cx="7"
        cy="10.5"
        r="0.8"
        fill="currentColor"
      />
      <circle
        cx="2"
        cy="5"
        r="0.8"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="5"
        r="0.8"
        fill="currentColor"
      />
      <circle
        cx="2"
        cy="10"
        r="0.8"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="10"
        r="0.8"
        fill="currentColor"
      />
    </svg>
  );
}

function DebugToggle() {
  const showDebug = useShowDebug();

  return (
    import.meta.env.DEV && (
      <Button
        variant={showDebug ? 'accent' : 'ghost'}
        size="small"
        onClick={() => setShowDebug(!showDebug)}
        title="Toggle debug overlay (D)"
        className="flex items-center gap-1.5"
      >
        <DebugIcon />
        Debug
      </Button>
    )
  );
}

function DebugPanel() {
  const showDebug = useShowDebug();
  const generation = useGeneration();
  const cols = useCols();
  const rows = useRows();
  const { stepTime, roundTripTime } = useStepTimer(generation);

  if (!showDebug) return null;

  return (
    <div className="mt-3 w-fit rounded border border-[var(--color-ca-panel-border)] bg-[var(--color-ca-panel)] px-3 py-2 font-mono text-[11px] leading-relaxed tracking-wide text-[var(--color-ca-icon)] backdrop-blur-sm">
      <div>generation: {generation}</div>
      <div>
        grid: {cols}&times;{rows}
      </div>
      <div>step: {stepTime.toFixed(1)}ms</div>
      <div>rtt: {roundTripTime.toFixed(1)}ms</div>
    </div>
  );
}

export { DebugPanel, DebugToggle };
