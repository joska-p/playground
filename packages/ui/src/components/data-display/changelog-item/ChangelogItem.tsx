import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { changelogItemVariants, type ChangelogItemVariants } from './variants';

export interface ChangelogItemProps extends HTMLAttributes<HTMLDivElement>, ChangelogItemVariants {
  version: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function ChangelogItem({
  version,
  children,
  variant = 'primary',
  className,
  ref,
  ...props
}: ChangelogItemProps) {
  return (
    <div
      ref={ref}
      className={cn('border-l-2 pl-4', changelogItemVariants({ variant }), className)}
      {...props}
    >
      <span className="text-foreground-muted w-16 shrink-0 text-xs font-medium tracking-wide uppercase">
        {version}
      </span>
      <p className="text-foreground-muted text-sm leading-relaxed">{children}</p>
    </div>
  );
}
