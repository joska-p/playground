import { useState } from 'react';
import { cn } from '../../../utils/cn';
import { PanelContent } from './PanelContent';
import type { ControlPanelProps } from './types';

export function ControlPanel({
  sections,
  width = 'w-72',
  accordion = true,
  defaultOpenSections,
  open: controlledOpen,
  onOpenChange,
  header,
  footer,
  className
}: ControlPanelProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const content = (
    <>
      {header && <div className="border-border shrink-0 border-b p-3">{header}</div>}
      <PanelContent
        sections={sections}
        accordion={accordion}
        defaultOpenSections={defaultOpenSections}
      />
      {footer && <div className="border-border shrink-0 border-t p-3">{footer}</div>}
    </>
  );

  return (
    <>
      {/* ─── Landscape Mode: Absolute Sidebar Panel ─── */}
      <aside
        className={cn(
          'bg-surface border-border absolute top-0 right-0 z-40 flex h-full flex-col border-l portrait:hidden landscape:flex',
          width,
          className
        )}
        role="region"
        aria-label="Controls"
      >
        {content}
      </aside>

      {/* ─── Portrait Mode Trigger: Floating Action Button ─── */}
      <button
        type="button"
        onClick={() => { setIsOpen(true); }}
        className="bg-primary text-primary-foreground shadow-primary/20 absolute right-5 bottom-5 z-30 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95 portrait:flex landscape:hidden"
        aria-label="Open controls"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>

      {/* ─── Portrait Overlay Backing ─── */}
      <div
        onClick={() => { setIsOpen(false); }}
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 portrait:block landscape:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden="true"
      />

      {/* ─── Portrait Drawer Layer ─── */}
      <aside
        id="control-panel-dialog"
        role="dialog"
        aria-modal={isOpen}
        aria-label="Controls"
        className={cn(
          'bg-surface border-border fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-2xl border-t transition-transform duration-300 ease-out portrait:flex landscape:hidden',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex shrink-0 justify-center pt-3 pb-1">
          <div className="bg-border h-1 w-10 rounded-full" />
        </div>
        {content}
      </aside>
    </>
  );
}
