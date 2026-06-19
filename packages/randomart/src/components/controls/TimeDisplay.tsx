import { useStore } from 'zustand';
import { randomartStore } from '../../stores/randomart/store';

export function TimeDisplay() {
  const time = useStore(randomartStore, (s) => s.time);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-foreground/50 text-xs leading-none font-medium">
        Time
      </label>
      <div className="border-input bg-background text-foreground flex h-9 w-20 items-center rounded-md border px-3 text-xs tabular-nums">
        {time.toFixed(2)}s
      </div>
    </div>
  );
}
