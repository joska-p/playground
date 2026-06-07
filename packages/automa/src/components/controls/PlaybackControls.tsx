import { Button } from '@repo/ui/Button';
import { step, toggleRunning } from '../../stores/simulation/actions.ts';
import { useRunning } from '../../stores/ui/selectors.ts';

function PlayIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 2L11.5 7L3.5 12V2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="1.5"
        width="3.5"
        height="11"
        rx="0.75"
        fill="currentColor"
      />
      <rect
        x="8"
        y="1.5"
        width="3.5"
        height="11"
        rx="0.75"
        fill="currentColor"
      />
    </svg>
  );
}

function StepIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 2L8 7L2 12V2Z"
        fill="currentColor"
      />
      <rect
        x="10"
        y="2"
        width="2"
        height="10"
        rx="0.6"
        fill="currentColor"
      />
    </svg>
  );
}

function PlaybackControls() {
  const running = useRunning();

  return (
    <>
      <Button
        variant="primary"
        size="small"
        onClick={toggleRunning}
        title="Play/Pause (Space)"
        aria-label={running ? 'Pause' : 'Play'}
      >
        {running ? <PauseIcon /> : <PlayIcon />}
        {running ? 'Pause' : 'Play'}
      </Button>
      <Button
        variant="secondary"
        size="small"
        onClick={step}
        disabled={running}
        title="Step (N)"
        aria-label="Step forward"
      >
        <StepIcon />
        Step
      </Button>
    </>
  );
}

export { PlaybackControls };
