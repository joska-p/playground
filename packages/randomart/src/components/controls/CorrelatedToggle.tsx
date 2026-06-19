import { Button } from '@repo/ui/Button';
import { setCorrelatedRGB } from '../../stores/randomart/actions/display';
import { useCorrelatedRGB } from '../../stores/randomart/selectors';

export function CorrelatedToggle() {
  const correlatedRGB = useCorrelatedRGB();

  return (
    <Button
      type="button"
      onClick={() => setCorrelatedRGB(!correlatedRGB)}
      variant="outline"
      className="w-fit"
      title={
        correlatedRGB ? 'Switch to independent RGB' : 'Switch to correlated RGB'
      }
    >
      {correlatedRGB ? (
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
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ) : (
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
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path d="M10.73 5.08A3 3 0 0 1 17 8.24" />
          <path d="M7.15 10.73a3 3 0 0 0-2.39 5.17" />
          <path d="M4 20l3.85-3.85" />
        </svg>
      )}
      <span className="text-xs">{correlatedRGB ? 'Linked' : 'Split'}</span>
    </Button>
  );
}
