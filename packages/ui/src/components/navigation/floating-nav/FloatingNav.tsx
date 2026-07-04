import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { useFloatingNavState } from '../../../hooks/useFloatingNavState';
import { cn } from '../../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../../lib/colorVariant';

export type NavLink = {
  label: string;
  href: string;
};

export type FloatingNavProps = {
  brand: { label: string; href: string };
  links: NavLink[];
  themeToggle?: ReactNode;
  variant?: ColorVariant;
  ref?: Ref<HTMLElement>;
} & HTMLAttributes<HTMLElement>;

function FloatingNav({
  brand,
  links,
  themeToggle,
  variant = 'primary',
  className,
  style,
  ref,
  ...props
}: FloatingNavProps) {
  const { visible, navHoveredRef, show, scheduleHide } = useFloatingNavState();

  return (
    <nav
      ref={ref}
      className={cn(
        'fixed top-3 left-1/2 z-50 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono shadow-lg transition-[transform,box-shadow] duration-350 ease-out',
        visible ? 'translate-y-0' : '-translate-y-20',
        className
      )}
      style={{
        transform: visible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(-80px)',
        background: 'color-mix(in srgb, var(--surface-raised) 92%, transparent)',
        boxShadow: 'var(--shadow-lg)',
        ...colorVarStyle(variant, style)
      }}
      onMouseEnter={() => {
        navHoveredRef.current = true;
        show();
      }}
      onMouseLeave={() => {
        navHoveredRef.current = false;
        scheduleHide();
      }}
      {...props}
    >
      <a
        href={brand.href}
        className="min-w-fit text-sm font-semibold tracking-tight"
        style={{ color: 'var(--_color)' }}
      >
        {brand.label}
      </a>
      <div className="hidden items-center gap-0.5 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-foreground-muted hover:text-foreground rounded-full px-2.5 py-1 text-xs font-medium tracking-wide uppercase transition-all hover:brightness-110 active:scale-[.97]"
          >
            {link.label}
          </a>
        ))}
      </div>
      {themeToggle}
    </nav>
  );
}

export { FloatingNav };
