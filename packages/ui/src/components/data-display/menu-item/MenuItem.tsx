import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { menuItemVariants, type MenuItemVariants } from './variants';

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement>, MenuItemVariants {
  icon?: ReactNode;
  label: string;
  loading?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function MenuItem({
  icon,
  label,
  variant,
  className,
  disabled,
  ref,
  ...props
}: MenuItemProps) {
  return (
    <button
      ref={ref}
      className={cn(menuItemVariants({ variant }), className)}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md text-xs shadow-xs">
          {icon}
        </span>
      )}
      <span className="text-foreground truncate">{label}</span>
    </button>
  );
}
