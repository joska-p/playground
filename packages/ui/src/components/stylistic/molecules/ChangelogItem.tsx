import type { ReactNode } from 'react';

type ChangelogItemProps = {
  version: string;
  children: ReactNode;
};

function ChangelogItem({ version, children }: ChangelogItemProps) {
  return (
    <div className="flex gap-4">
      <span className="text-primary w-16 shrink-0 text-xs font-medium">{version}</span>
      <span className="text-foreground-muted text-[13px]">{children}</span>
    </div>
  );
}

export { ChangelogItem };
export type { ChangelogItemProps };
