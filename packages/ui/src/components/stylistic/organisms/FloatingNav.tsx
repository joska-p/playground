import type { ComponentProps, ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { floatingNavVariants } from './floatingNavVariants';

type NavLink = {
  label: string;
  href: string;
};

type FloatingNavProps = {
  brand: { label: string; href: string };
  links: NavLink[];
  themeToggle?: ReactNode;
} & ComponentProps<'nav'>;

function FloatingNav({ brand, links, themeToggle, className, ...props }: FloatingNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const navHoveredRef = useRef(false);

  const isAtTop = useCallback(() => document.documentElement.scrollTop < 50, []);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const scheduleHide = useCallback(() => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    if (isAtTop() || navHoveredRef.current) return;
    scrollTimeoutRef.current = setTimeout(() => {
      if (!navHoveredRef.current && !isAtTop()) setVisible(false);
    }, 1500);
  }, [isAtTop]);

  const updateVisibility = useCallback(() => {
    if (isAtTop() || navHoveredRef.current) {
      show();
    } else {
      scheduleHide();
    }
  }, [isAtTop, show, scheduleHide]);

  useEffect(() => {
    const onScroll = () => {
      updateVisibility();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [updateVisibility]);

  useEffect(() => {
    updateVisibility();
  }, [updateVisibility]);

  return (
    <nav
      ref={navRef}
      className={cn(
        floatingNavVariants(),
        visible ? 'translate-y-0' : '-translate-y-20',
        className
      )}
      style={{
        background: 'color-mix(in srgb, var(--surface) 88%, transparent)',
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-80px)'
      }}
      onMouseEnter={() => {
        navHoveredRef.current = true;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
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
        className="text-primary text-sm font-semibold tracking-tight"
      >
        {brand.label}
      </a>
      <div className="hidden items-center gap-0.5 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-foreground-dim hover:text-foreground rounded-full px-2.5 py-1 text-xs font-medium tracking-wide uppercase transition-colors"
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
export type { FloatingNavProps, NavLink };
