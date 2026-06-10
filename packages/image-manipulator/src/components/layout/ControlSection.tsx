import type { ReactNode } from 'react';

type ControlSectionProps = {
  title: string;
  children: ReactNode;
};

function ControlSection({ title, children }: ControlSectionProps) {
  return (
    <section className="border-border rounded-lg border">
      <h2 className="text-muted-foreground flex w-full items-center px-3 py-1.5 text-xs font-semibold tracking-wider uppercase">
        {title}
      </h2>
      <div className="border-border border-t px-3 py-3">{children}</div>
    </section>
  );
}

export { ControlSection };
