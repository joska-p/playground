import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { menuItemVariants } from './menuItemVariants';

type MenuItemProps = {
  icon?: ReactNode;
  label: string;
} & ComponentProps<'button'> &
  VariantProps<typeof menuItemVariants>;

function MenuItem({ icon, label, variant, className, ...props }: MenuItemProps) {
  return (
    <button
      className={cn(menuItemVariants({ variant }), className)}
      {...props}
    >
      {icon && <span className="mr-2 w-4 text-xs">{icon}</span>}
      {label}
    </button>
  );
}

export { MenuItem };
export type { MenuItemProps };
