import { Button } from '@repo/ui/Button';
import { setTime } from '../../stores/randomart/actions/playback';

export function ResetTimeButton() {
  return (
    <Button
      type="button"
      onClick={() => setTime(0)}
      variant="outline"
      className="w-fit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
      Reset Time
    </Button>
  );
}
