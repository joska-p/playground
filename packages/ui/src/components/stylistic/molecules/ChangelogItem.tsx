import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { changelogItemVariants } from './changelogItemVariants';

type ChangelogItemProps = {
  version: string;
  children: ReactNode;
  className?: string;
};

function ChangelogItem({ version, children, className }: ChangelogItemProps) {
  return (
    <div className={cn(changelogItemVariants(), className)}>
      <span className="text-primary w-16 shrink-0 text-xs font-medium">{version}</span>
      <span className="text-foreground-muted text-[13px]">{children}</span>
    </div>
  );
}

export { ChangelogItem };
export type { ChangelogItemProps };
