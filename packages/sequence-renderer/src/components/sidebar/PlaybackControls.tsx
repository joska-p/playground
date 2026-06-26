import { Button } from '@repo/ui/Button';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { incrementSteps, togglePlayback } from '../../stores/sequence/actions';
import { useIsPlaying } from '../../stores/sequence/selectors/useIsPlaying';

function PlaybackControls(): JSX.Element {
  const isPlaying = useIsPlaying();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    function tick() {
      incrementSteps();
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying]);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={togglePlayback}
        className="flex items-center gap-1.5"
      >
        {isPlaying ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
            Pause
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Play
          </>
        )}
      </Button>
    </div>
  );
}

export { PlaybackControls };
