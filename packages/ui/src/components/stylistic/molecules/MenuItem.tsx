import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../../utils/cn';

type MenuItemProps = {
  icon?: ReactNode;
  label: string;
  destructive?: boolean;
} & ComponentProps<'button'>;

function MenuItem({ icon, label, destructive, className, ...props }: MenuItemProps) {
  return (
    <button
      className={cn(
        'flex w-full cursor-pointer items-center rounded-sm px-3 py-1.5 text-left text-[12px] transition-colors',
        destructive
          ? 'text-destructive hover:bg-destructive/10'
          : 'text-foreground hover:bg-surface-raised',
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2 w-4 text-xs">{icon}</span>}
      {label}
    </button>
  );
}

export { MenuItem };
export type { MenuItemProps };
