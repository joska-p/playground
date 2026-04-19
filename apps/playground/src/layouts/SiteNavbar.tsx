import { useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
  NavbarToggle,
  ThemeToggle,
  Button,
} from "@repo/ui";

interface Route {
  text: string;
  url: string;
}

interface SiteNavbarProps {
  routes: Route[];
  currentPath: string;
  title?: string;
  baseUrl: string;
}

export function SiteNavbar({ routes, currentPath, title, baseUrl }: SiteNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar className="bg-background/95">
      <NavbarContent>
        <NavbarBrand>
          <a href={baseUrl} className="flex items-center gap-3 outline-none group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 2 2">
              <rect fill="#331436" x="0" y="0" width="1" height="1"></rect>
              <rect fill="#eb9961" x="1" y="0" width="1" height="1"></rect>
              <rect fill="#cb4f57" x="0" y="1" width="1" height="1"></rect>
              <rect fill="#7a1745" x="1" y="1" width="1" height="1"></rect>
            </svg>
            <span className="text-xl font-bold tracking-tight sm:text-2xl">
              {title ?? "Playground"}
            </span>
          </a>
        </NavbarBrand>

        {/* Desktop Links */}
        <NavbarLinks>
          {routes.map((route) => (
            <NavbarLink
              key={route.url}
              href={route.url}
              active={currentPath === route.url || currentPath === route.url + "/"}
            >
              {route.text}
            </NavbarLink>
          ))}
        </NavbarLinks>

        <NavbarActions>
          <ThemeToggle />
          <NavbarToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </NavbarActions>
      </NavbarContent>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 inset-x-0 z-50 p-4 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="rounded-xl border border-border bg-card p-4 shadow-2xl flex flex-col gap-2">
            {routes.map((route) => (
              <NavbarLink
                key={route.url}
                href={route.url}
                active={currentPath === route.url || currentPath === route.url + "/"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {route.text}
              </NavbarLink>
            ))}
            <div className="pt-2 border-t border-border mt-2">
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => window.open('https://github.com/joska-p/playground', '_blank')}
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
}
