# Personal Playground

This is a personal monorepo I use to learn and experiment with modern web technologies. It is a work in progress and serves as a sandbox for me to practice building and managing a workspace with Turborepo, pnpm, and various frameworks.

## Project Structure

The workspace is organized into an application and shared packages:

### Applications
* **apps/playground**: An Astro site for static experiments and UI testing.

### Packages
* **packages/mosaic-maker**: A React component for creating interactive mosaics.
* **packages/ui**: A shared library of basic UI components (buttons, inputs, etc.).
* **packages/tailwind-config**: Shared styling configuration for Tailwind CSS 4.
* **packages/typescript-config**: Shared TypeScript configurations.
* **packages/eslint-config**: Shared linting rules.

## Tech Stack

I am using this project to learn:
* **Monorepos**: Managed with Turborepo and pnpm.
* **Frameworks**: React 19 and Astro.
* **Styling**: Tailwind CSS 4.
* **Modules**: Transitioning to native ESM and modern TypeScript resolution (bundler).

## Getting Started

## Development Environment

This project is optimized for a reproducible development environment using **Nix** and **direnv**.

If you have Nix and direnv installed:
1.  Entering the project directory will automatically load the `devShell`.
2.  All required tools (`pnpm`, `turbo`, `nodejs`, `typescript`) will be available in your path.
3.  `corepack` is used to ensure the correct version of `pnpm` is active.

### Prerequisites
* Node.js (>= 18)
* pnpm (v10)

Alternatively, if you are not using Nix, ensure the above are installed manually.

### Installation
```bash
pnpm install
```

### Development
To start the workspace in development mode:
```bash
pnpm dev
```

### Build
To compile the entire project:
```bash
pnpm build
```

## Usage Note

This project is strictly for personal learning and experimentation. It is not intended to demonstrate "best practices" or provide a template for others, as I am still exploring these tools myself.
