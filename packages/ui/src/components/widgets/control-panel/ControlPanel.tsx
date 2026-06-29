import { useEffect, useImperativeHandle, useState } from 'react';
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
  className,
  ref
}: ControlPanelProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  // ─── Imperative handle ──────────────────────────────
  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev)
    }),
    [setIsOpen]
  );

  // ─── Close drawer when switching to landscape ───────
  useEffect(() => {
    const mq = window.matchMedia('(orientation: landscape)');

    const closeIfLandscape = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };

    // Also close immediately if already landscape (e.g., initial load)
    if (mq.matches) setIsOpen(false);

    mq.addEventListener('change', closeIfLandscape);
    return () => mq.removeEventListener('change', closeIfLandscape);
  }, [setIsOpen]);

  // ─── Escape to close drawer ─────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, setIsOpen]);

  // ─── Prevent body scroll when drawer is open ────────
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const content = (
    <>
      {header && <div className="border-border shrink-0 border-b">{header}</div>}
      <PanelContent
        sections={sections}
        accordion={accordion}
        defaultOpenSections={defaultOpenSections}
      />
      {footer && <div className="border-border shrink-0 border-t">{footer}</div>}
    </>
  );

  return (
    <>
      {/* ─── Landscape: Fixed side panel ─────────────── */}
      <aside
        className={`fixed top-0 right-0 bottom-0 ${width} bg-surface border-border z-40 flex flex-col border-l portrait:hidden landscape:flex ${className} `}
        role="region"
        aria-label="Controls"
      >
        {content}
      </aside>

      {/* ─── Portrait: FAB trigger ───────────────────── */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-primary text-primary-foreground shadow-primary/20 fixed right-5 bottom-5 z-30 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95 portrait:flex landscape:hidden"
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

      {/* ─── Portrait: Overlay ───────────────────────── */}
      <div
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setIsOpen(false);
        }}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 portrait:block landscape:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        } `}
        aria-hidden="true"
      />

      {/* ─── Portrait: Drawer ────────────────────────── */}
      <aside
        role="dialog"
        aria-modal={isOpen}
        aria-label="Controls"
        className={`bg-surface border-border fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-2xl border-t transition-transform duration-300 ease-out portrait:flex landscape:hidden ${isOpen ? 'translate-y-0' : 'translate-y-full'} `}
      >
        {/* Drag handle */}
        <div className="flex shrink-0 justify-center pt-3 pb-1">
          <div className="bg-border h-1 w-10 rounded-full" />
        </div>
        {content}
      </aside>
    </>
  );
}
