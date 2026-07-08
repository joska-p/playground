import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { changelogItemVariants } from './variants';

type ChangelogItemProps = {
  version: string;
  children: ReactNode;
  variant?: ColorVariant;
  ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

function ChangelogItem({
  version,
  children,
  variant = 'primary',
  className,
  style,
  ref,
  ...props
}: ChangelogItemProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-baseline gap-4 font-mono',
        changelogItemVariants({ variant }),
        className
      )}
      style={style}
      {...props}
    >
      <span className="text-foreground-muted w-16 shrink-0 text-xs font-medium tracking-wide uppercase">
        {version}
      </span>
      <p className="text-foreground-muted text-sm leading-relaxed">{children}</p>
    </div>
  );
}

export { ChangelogItem };
export type { ChangelogItemProps };
