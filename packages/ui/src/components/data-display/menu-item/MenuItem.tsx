import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { menuItemVariants } from './variants';

type MenuItemProps = {
  icon?: ReactNode;
  label: string;
  variant?: ColorVariant;
  ref?: Ref<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function MenuItem({
  icon,
  label,
  variant = 'default',
  className,
  style,
  ref,
  ...props
}: MenuItemProps) {
  return (
    <button
      ref={ref}
      className={cn(
        'flex w-full items-center gap-3 px-3 py-2 text-left font-mono text-sm',
        'transition-all duration-150 hover:brightness-110 active:scale-[.97]',
        menuItemVariants({ variant }),
        className
      )}
      style={style}
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

export { MenuItem };
export type { MenuItemProps };
