import { Button } from '@repo/ui/Button';
import { setSeedText } from '../../stores/randomart/actions/seed';

export function ShuffleButton() {
  return (
    <Button
      type="button"
      onClick={() => setSeedText(Math.random().toString(36).slice(2, 10))}
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
        <path d="M21 2v6h-6" />
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M3 22v-6h6" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      </svg>
      Shuffle
    </Button>
  );
}
