import { useStep, useToggleRunning } from '../../stores/automaton/actions.ts';
import { useRunning } from '../../stores/automaton/selectors.ts';

function TransportControls() {
  const running = useRunning();
  const toggleRunning = useToggleRunning();
  const step = useStep();

  return (
    <>
      <button
        onClick={toggleRunning}
        className="rounded bg-blue-600 px-3 py-1 text-sm font-medium hover:bg-blue-700"
        title="Play/Pause (Space)"
      >
        {running ? '⏸ Pause' : '▶ Play'}
      </button>
      <button
        onClick={step}
        disabled={running}
        className="rounded bg-gray-600 px-3 py-1 text-sm font-medium hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        title="Step (N)"
      >
        ⏭ Step
      </button>
    </>
  );
}

export { TransportControls };
