import { setSeedText } from '../../stores/randomart/actions';
import { SeedInput } from './SeedInput';

export function Controls() {
  return (
    <div className="flex w-full flex-col gap-4">
      <SeedInput />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSeedText(Math.random().toString(36).slice(2, 10))}
          className="border-border bg-card text-foreground hover:bg-background focus:border-primary inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
          Shuffle
        </button>
      </div>
    </div>
  );
}
