import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { floatingNavVariants, type FloatingNavVariants } from './variants';

export interface NavLink {
  label: string;
  href: string;
}

export interface FloatingNavProps extends HTMLAttributes<HTMLElement>, FloatingNavVariants {
  brand: { label: string; href: string };
  links: NavLink[];
  themeToggle?: ReactNode;
  ref?: Ref<HTMLElement>;
}

function FloatingNav({
  brand,
  links,
  themeToggle,
  variant = 'primary',
  className,
  ref,
  ...props
}: FloatingNavProps) {
  return (
    <nav
      ref={ref}
      className={cn(floatingNavVariants({ variant }), className)}
      {...props}
    >
      <a
        href={brand.href}
        className="min-w-fit text-sm font-semibold tracking-tight"
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
