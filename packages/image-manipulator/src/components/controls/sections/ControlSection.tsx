import type { ReactNode } from "react";

type ControlSectionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`text-muted-foreground h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ControlSection({ title, isOpen, onToggle, children }: ControlSectionProps) {
  return (
    <div className="border-border rounded-lg border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium hover:bg-foreground/5"
      >
        {title}
        <Chevron open={isOpen} />
      </button>
      {isOpen && <div className="border-border border-t px-3 py-3">{children}</div>}
    </div>
  );
}

export { ControlSection };
