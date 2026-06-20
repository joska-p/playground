import { useState } from 'react';
import { InspectorPanel } from './InspectorPanel';

export function FloatingInspector() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button — positioned in the top-right of the canvas area */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close inspector' : 'Open inspector'}
        aria-expanded={open}
        className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card/80 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        title={open ? 'Close inspector' : 'Open inspector'}
      >
        {open ? (
          /* X icon */
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Microscope / inspect icon */
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
            <path d="M6 18h8" />
            <path d="M3 22h18" />
            <path d="M14 22a7 7 0 1 0 0-14h-1" />
            <path d="M9 14h2" />
            <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
            <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
          </svg>
        )}
      </button>

      {/* Floating panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Inspector"
          className="absolute top-12 right-3 z-10 flex w-80 max-h-[calc(100%-4rem)] flex-col gap-4 overflow-y-auto rounded-lg border border-border bg-card/90 p-4 shadow-xl backdrop-blur-md"
        >
          <InspectorPanel />
        </div>
      )}
    </>
  );
}
