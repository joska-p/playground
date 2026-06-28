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
        className="border-border bg-card/80 text-foreground hover:bg-card focus-visible:ring-ring absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-md border shadow-md backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
        title={open ? 'Close inspector' : 'Open inspector'}
      >
        {open ? (
          /* Close Icon */
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

      {/* Slide-out Sheet Panel Backdrop & Layout Container */}
      {open && (
        <div className="border-l-border bg-card/95 animate-in slide-in-from-right absolute top-0 right-0 z-10 flex h-full w-80 flex-col gap-4 overflow-y-auto border-l p-4 shadow-2xl backdrop-blur-md duration-200">
          <div className="border-border mt-8 flex items-center justify-between border-b pb-2">
            <h3 className="text-foreground text-sm font-bold tracking-tight">Engine Diagnostics</h3>
          </div>
          <InspectorPanel />
        </div>
      )}
    </>
  );
}
