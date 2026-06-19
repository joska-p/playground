import { Button } from '@repo/ui/Button';
import { toggleRunning } from '../../stores/randomart/actions/playback';
import { useRunning } from '../../stores/randomart/selectors';

export function PlaybackButton() {
  const running = useRunning();

  return (
    <Button
      type="button"
      onClick={toggleRunning}
      variant="outline"
      className="w-fit"
    >
      {running ? (
        <>
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
            <rect
              x="6"
              y="4"
              width="4"
              height="16"
            />
            <rect
              x="14"
              y="4"
              width="4"
              height="16"
            />
          </svg>
          Pause
        </>
      ) : (
        <>
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
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Play
        </>
      )}
    </Button>
  );
}
