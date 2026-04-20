# Navbar & Tailwind v4 Refactor Report

## Overview
This report documents the refactor of the `playground` application's navigation system from React to a modular Astro architecture, alongside a significant optimization of the Tailwind v4 build pipeline across the monorepo.

## Key Changes

### 1. Navbar Architecture (React to Astro)
- **Modularization**: Converted the monolithic `SiteNavbar.tsx` (React) into a collection of focused Astro components located in `src/layouts/navbar/`.
    - `Navbar.astro`: The main orchestrator and layout container.
    - `NavbarBrand.astro`: Handles the logo and site title.
    - `NavbarLink.astro`: Individual link logic with specialized hover effects.
    - `ThemeToggle.astro`: Pure Astro/JS implementation of the theme switcher.
    - `MobileMenuToggle.astro`: Logic for the mobile hamburger menu.
    - `MobileMenu.astro`: The sliding mobile navigation panel.
- **Zero React Overhead**: Removed React dependencies from the navigation, improving TTI (Time to Interactive) and reducing the client-side bundle size for the layout.

### 2. "Genius" Gruvbox Aesthetics
- **Animated Brackets**: Implemented a retro-terminal inspired hover effect where `[` and `]` brackets animate into view around links.
- **Subtle Highlighting**: Added a `primary/10` pill background highlight for both hover and active states, consistent with the Gruvbox color palette.
- **Tactile Feedback**: Preserved the `active:translate-y-[1px]` utility for a "pressed button" feel.

### 3. Tailwind v4 Optimization (Monorepo)
- **Single-Pass Processing**: Eliminated "Double Processing" conflicts where multiple packages were independently building Tailwind. All Tailwind processing is now centralized in `apps/playground/src/styles.css`.
- **Source Scanning**: Configured `@source` directives in the main stylesheet to scan package dependencies in `node_modules`. This ensures utility classes used in `@repo/ui`, `@repo/mosaic-maker`, and `@repo/sequence-renderer` are correctly generated.
- **Dependency Cleanup**:
    - Removed `build:styles` and `dev:styles` scripts from library `package.json` files.
    - Libraries now export raw source CSS (`./src/styles.css`) instead of pre-compiled `dist` files.
    - Removed redundant Tailwind-related devDependencies from packages.

### 4. Build Orchestration (Turbo)
- **Simplified Tasks**: Deleted local `turbo.json` overrides in packages. The root `turbo.json` now handles the streamlined TypeScript-only package builds, significantly reducing build times and complexity.

## Technical Benefits
- **Reduced Bundle Size**: The layout is now statically rendered by Astro.
- **Correct Breakpoint Behavior**: Resolved an issue where duplicate CSS layers caused `md:flex` classes to be ignored.
- **Unified Theme**: The Gruvbox theme is now applied consistently through a single CSS entry point.
- **Maintainability**: Clearer file structure and reduced "script clutter" in the monorepo root and packages.
