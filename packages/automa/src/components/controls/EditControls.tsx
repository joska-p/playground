import { Button } from '@repo/ui/Button';
import { clear, randomize } from '../../stores/simulation/actions.ts';

function ClearIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 2.5V1.5H10V2.5H12.5V4H11.5L10.5 12.5H3.5L2.5 4H1.5V2.5H4ZM4.5 4L5 11H6L5.5 4H4.5ZM7 4V11H8.5V4H7ZM9.5 4L9 11H10L10.5 4H9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function RandomizeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10.5 2L12 3.5L10.5 5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 3.5H12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M3.5 9L2 10.5L3.5 12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 10.5H2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EditControls() {
  return (
    <>
      <Button
        variant="destructive"
        size="small"
        onClick={() => clear()}
        title="Clear (C)"
        aria-label="Clear grid"
      >
        <ClearIcon />
        Clear
      </Button>
      <Button
        variant="accent"
        size="small"
        onClick={() => randomize()}
        title="Randomize (R)"
        aria-label="Randomize grid"
      >
        <RandomizeIcon />
        Randomize
      </Button>
    </>
  );
}

export { EditControls };
