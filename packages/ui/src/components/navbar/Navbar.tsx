import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { navbarLinkVariants, navbarVariants } from "./navbarVariants.js";

interface NavbarProps
  extends ComponentProps<"header">, VariantProps<typeof navbarVariants> {}

/**
 * Main Navbar container component.
 * React 19: `ref` is passed directly as a prop.
 */
function Navbar({ ref, className, sticky, ...props }: NavbarProps) {
  return (
    <header
      ref={ref}
      className={cn(navbarVariants({ sticky, className }))}
      {...props}
    />
  );
}

function NavbarContent({ ref, className, ...props }: ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}

function NavbarBrand({ ref, className, ...props }: ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 font-mono font-bold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function NavbarLinks({ ref, className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      ref={ref}
      className={cn("hidden items-center gap-2 md:flex", className)}
      {...props}
    />
  );
}

interface NavbarLinkProps
  extends ComponentProps<"a">, VariantProps<typeof navbarLinkVariants> {}

function NavbarLink({ ref, className, active, ...props }: NavbarLinkProps) {
  return (
    <a
      ref={ref}
      className={cn(navbarLinkVariants({ active, className }))}
      {...props}
    />
  );
}

function NavbarActions({ ref, className, ...props }: ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  );
}

/**
 * Simple icon component for mobile menu toggle with Gruvbox aesthetic
 */
function NavbarToggle({
  isOpen,
  className,
  ...props
}: ComponentProps<"button"> & { isOpen?: boolean }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-md transition-all active:translate-y-[1px]",
        "text-foreground hover:bg-primary/10 hover:text-primary focus:outline-none md:hidden",
        className,
      )}
      aria-expanded={isOpen}
      {...props}
    >
      <span className="sr-only">Open main menu</span>
      {isOpen ? (
        <svg
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      )}
    </button>
  );
}

export {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
  NavbarToggle,
};
