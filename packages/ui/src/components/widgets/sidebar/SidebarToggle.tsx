import { Menu, X } from 'lucide-react';
import type { ButtonHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { type ColorVariant } from '../../../lib/colorVariant';
import { useSidebarContext } from './useSidebarContext';
import { sidebarToggleVariants } from './variants';

export type SidebarToggleProps = {
  variant?: ColorVariant;
  ref?: Ref<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function SidebarToggle({
  className,
  children,
  variant: explicitVariant,
  style,
  ref,
  ...props
}: SidebarToggleProps) {
  const { isOpen, toggle, variant: contextVariant } = useSidebarContext();
  const variant = explicitVariant ?? contextVariant;

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 font-mono text-sm transition-all hover:brightness-110 active:scale-[.97]',
        sidebarToggleVariants({ variant }),
        className
      )}
      style={style}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      {...props}
    >
      {children ?? (isOpen ? <X className="size-4" /> : <Menu className="size-4" />)}
    </button>
  );
}

export { SidebarToggle };
