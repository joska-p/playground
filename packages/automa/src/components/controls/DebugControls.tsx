import { useCAStore } from '../../stores/automaton/context.ts';
import { useSetShowDebug } from '../../stores/automaton/actions.ts';
import {
  useCols,
  useGeneration,
  useRows,
  useShowDebug,
} from '../../stores/automaton/selectors.ts';
import { useStepTimer } from '../../hooks/useStepTimer.ts';

function DebugToggle() {
  const showDebug = useShowDebug();
  const setShowDebug = useSetShowDebug();

  return (
    import.meta.env.DEV && (
      <button
        onClick={() => setShowDebug(!showDebug)}
        className={`rounded px-2 py-1 text-xs ${
          showDebug
            ? 'bg-yellow-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
        title="Toggle debug overlay (D)"
      >
        Debug
      </button>
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
    <div className="mt-2 w-fit rounded bg-black/70 px-3 py-2 text-xs text-green-400 font-mono">
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

type ErrorToastProps = {
  message: string | undefined;
};

function ErrorToast({ message }: ErrorToastProps) {
  if (!message) return null;

  return (
    <div className="mt-2 rounded bg-red-800/80 px-3 py-2 text-sm text-white">
      {message}
    </div>
  );
}

export { DebugPanel, DebugToggle, ErrorToast };
