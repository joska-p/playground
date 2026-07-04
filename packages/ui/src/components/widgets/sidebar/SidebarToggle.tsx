import { Menu, X } from 'lucide-react';
import type { ButtonHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../../lib/colorVariant';
import { useSidebarContext } from './useSidebarContext';

export type SidebarToggleProps = {
  variant?: ColorVariant;
  ref?: Ref<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function SidebarToggle({ className, children, variant, style, ref, ...props }: SidebarToggleProps) {
  const { isOpen, toggle } = useSidebarContext();

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 font-mono text-sm transition-all hover:brightness-110 active:scale-[.97]',
        className
      )}
      style={{
        ...colorVarStyle(variant, style),
        color: 'var(--_color)',
        background: 'color-mix(in srgb, var(--_color) 10%, transparent)'
      }}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      {...props}
    >
      {children ?? (isOpen ? <X className="size-4" /> : <Menu className="size-4" />)}
    </button>
  );
}

export { SidebarToggle };
