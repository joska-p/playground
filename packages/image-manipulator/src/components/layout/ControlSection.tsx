import type { ReactNode } from 'react';
import { ChevronIcon } from '../shared/ChevronIcon';

type ControlSectionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
};

function ControlSection({
  title,
  isOpen,
  onToggle,
  children,
}: ControlSectionProps) {
  return (
    <div className="border-border rounded-lg border">
      <button
        onClick={onToggle}
        className="hover:bg-foreground/5 flex w-full items-center justify-between px-3 py-2 text-sm font-medium"
      >
        {title}
        <ChevronIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <div className="border-border border-t px-3 py-3">{children}</div>
      )}
    </div>
  );
}

export { ControlSection };
