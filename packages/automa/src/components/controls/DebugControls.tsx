import { Button } from '@repo/ui/Button';
import { useSetShowDebug } from '../../stores/automaton/actions.ts';
import {
  useCols,
  useGeneration,
  useRows,
  useShowDebug,
} from '../../stores/automaton/selectors.ts';
import { useCAStore } from '../../stores/automaton/context.ts';
import { useStepTimer } from '../../hooks/useStepTimer.ts';

function DebugToggle() {
  const showDebug = useShowDebug();
  const setShowDebug = useSetShowDebug();

  return (
    import.meta.env.DEV && (
      <Button
        variant={showDebug ? 'accent' : 'ghost'}
        size="small"
        onClick={() => setShowDebug(!showDebug)}
        title="Toggle debug overlay (D)"
      >
        Debug
      </Button>
    )
  );
}

function DebugPanel() {
  const store = useCAStore();
  const showDebug = useShowDebug();
  const generation = useGeneration();
  const cols = useCols();
  const rows = useRows();
  const { stepTime, roundTripTime } = useStepTimer(store);

  if (!showDebug) return null;

  return (
    <div className="mt-2 w-fit rounded bg-card/80 px-3 py-2 font-mono text-xs text-accent">
      <div>Generation: {generation}</div>
      <div>
        Grid: {cols}&times;{rows}
      </div>
      <div>Step: {stepTime.toFixed(1)}ms</div>
      <div>Round-trip: {roundTripTime.toFixed(1)}ms</div>
      <div>Render: &mdash;</div>
    </div>
  );
}

export { DebugPanel, DebugToggle };
