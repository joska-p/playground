import { useState, type ReactNode } from 'react';

type PanelSectionProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

function PanelSection({
  title,
  defaultOpen = true,
  children
}: PanelSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase"
      >
        {open ? '▾' : '▸'} {title}
      </button>
      {open && children}
    </div>
  );
}

export { PanelSection };
