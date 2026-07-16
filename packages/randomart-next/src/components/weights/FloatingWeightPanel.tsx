import { Button } from '@repo/ui/data-entry';
import { useState } from 'react';
import { WEIGHT_PRESETS } from './WeightPresets';

export function FloatingWeightPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
        }}
        aria-label={open ? 'Close weight panel' : 'Open weight panel'}
        aria-expanded={open}
        className="border-border bg-card/80 text-foreground hover:bg-card focus-visible:ring-ring absolute top-3 left-12 z-20 flex h-8 w-8 items-center justify-center rounded-md border shadow-md backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
        title={open ? 'Close weight panel' : 'Open weight panel'}
      >
        {open ? (
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
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
            />
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
            <line
              x1="12"
              y1="2"
              x2="12"
              y2="6"
            />
            <line
              x1="12"
              y1="18"
              x2="12"
              y2="22"
            />
            <line
              x1="4.93"
              y1="4.93"
              x2="7.76"
              y2="7.76"
            />
            <line
              x1="16.24"
              y1="16.24"
              x2="19.07"
              y2="19.07"
            />
            <line
              x1="2"
              y1="12"
              x2="6"
              y2="12"
            />
            <line
              x1="18"
              y1="12"
              x2="22"
              y2="12"
            />
            <line
              x1="4.93"
              y1="19.07"
              x2="7.76"
              y2="16.24"
            />
            <line
              x1="16.24"
              y1="7.76"
              x2="19.07"
              y2="4.93"
            />
          </svg>
        )}
      </button>

      {open && (
        <div className="border-r-border bg-card/95 animate-in slide-in-from-left absolute top-0 left-0 z-10 flex h-full w-80 flex-col gap-4 overflow-y-auto border-r p-4 shadow-2xl backdrop-blur-md duration-200">
          <div className="border-border mt-8 flex items-center justify-between border-b pb-2">
            <h3 className="text-foreground text-sm font-bold tracking-tight">Weight Presets</h3>
          </div>

          <div className="flex flex-wrap gap-1">
            {Object.keys(WEIGHT_PRESETS).map((name) => (
              <Button
                key={name}
                variant="secondary"
                size="sm"
                disabled
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Button>
            ))}
          </div>

          <p className="text-muted-foreground text-xs italic">
            Per-node-type weight presets from the engine. Preset application via the store is not
            yet wired up.
          </p>
        </div>
      )}
    </>
  );
}
