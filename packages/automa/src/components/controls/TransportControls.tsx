import { Button } from '@repo/ui/Button';
import { useStep, useToggleRunning } from '../../stores/automaton/actions.ts';
import { useRunning } from '../../stores/automaton/selectors.ts';

function TransportControls() {
  const running = useRunning();
  const toggleRunning = useToggleRunning();
  const step = useStep();

  return (
    <>
      <Button
        variant="primary"
        size="small"
        onClick={toggleRunning}
        title="Play/Pause (Space)"
        aria-label={running ? 'Pause' : 'Play'}
      >
        {running ? '⏸' : '▶'} {running ? 'Pause' : 'Play'}
      </Button>
      <Button
        variant="secondary"
        size="small"
        onClick={step}
        disabled={running}
        title="Step (N)"
        aria-label="Step forward"
      >
        ⏭ Step
      </Button>
    </>
  );
}

export { TransportControls };
