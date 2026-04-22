# Creative Playground

[![Deploy to GitHub Pages](https://github.com/joska-p/playground/actions/workflows/deploy.yml/badge.svg)](https://github.com/joska-p/playground/actions/workflows/deploy.yml)

A personal monorepo serving as a sandbox for exploring modern web technologies, creative coding, and frontend architecture.

🚀 **[Live Demo](https://joska-p.github.io/playground/)** | 📚 **[Storybook](https://joska-p.github.io/playground/storybook)**

---

## Intent

This playground exists to experiment with frontend technologies in a low-pressure environment. It is a space to:

- Explore new frameworks, patterns, and tools
- Build creative coding experiments and visualizations
- Iterate on architectural approaches without Product constraints

Code here is not production-grade. Expect breaking changes, refactors, and experiments that don't pan out.

---

## Structure

The workspace is a **Turborepo** monorepo managed with **pnpm**.

```
apps/              # Deployable applications
├── playground/   # Main Astro site
└── storybook/     # Component documentation

packages/         # Shared libraries
├── ui/            # Primitive UI components
├── mosaic-maker/  # Mosaic generation engine
├── sequence-renderer/  # Mathematical sequence visualizations
├── tailwind-config/   # Shared Tailwind configuration
├── typescript-config/  # Shared TypeScript configuration
└── eslint-config/     # Shared ESLint configuration
```

### Directory Taxonomy

All packages follow a consistent internal structure defined in the [Architectural Blueprint](./docs/drafts/architectural-blueprint.md):

- `src/core/` — Pure domain logic (no React/DOM dependencies)
- `src/components/` — UI components following the component-per-folder pattern
- `src/hooks/` — React lifecycle and state management
- `src/renderers/` — Canvas, SVG, WebGL output logic
- `src/services/` — External communication (API clients, storage)
- `src/utils/` — Generic helper functions

---

## Guidelines

### Development Workflow

```bash
# Install dependencies
pnpm install

# Start all dev servers
pnpm dev

# Build all packages and apps
pnpm build
```

### Package Scripts

All packages expose standardized scripts:

| Script | Purpose |
| :--- | :--- |
| `pnpm build` | Compile TypeScript |
| `pnpm check-types` | Type-check without emitting |
| `pnpm lint` | Lint with warnings counting as errors |
| `pnpm format` | Format code with Prettier |

### Environment

This project uses **Nix** and **direnv** to ensure consistent tooling across machines. If Nix is installed, simply `cd` into the directory and run `direnv allow` — dependencies will load automatically.

### AI Assistance

This project uses **OpenCode** as the CLI assistant, configured with a **graphify** knowledge graph for codebase navigation.

**Graphify** — After modifying code, run `graphify update .` to keep the knowledge graph current. The graph is located at `graphify-out/` and contains:
- Extracted code structure and relationships
- Inferred connections between modules
- Wiki-style navigation

For architecture questions, use `graphify query`, `graphify path`, or `graphify explain` instead of raw file searches.

---

## Maintenance

- **Loose coupling**: Packages should not depend on each other's internal implementations
- **Independent builds**: Each package can be built and published separately
- **Shared configs**: TypeScript, ESLint, and Tailwind configs live in dedicated packages to ensure consistency
- **No breaking changes in hotfixes**: Backward compatibility is not guaranteed across versions

---

## Further Reading

- [Architectural Blueprint](./docs/drafts/architectural-blueprint.md) — Directory structure, naming conventions, and coding standards
- [Mosaic Engine Guide](./docs/drafts/mosaic-engine-guide.md) — How the mosaic generation works
- [Sequence Renderer Guide](./docs/drafts/sequence-renderer-guide.md) — Mathematical sequence visualizations

For individual apps and packages, see their dedicated READMEs:

- [apps/playground](./apps/playground/README.md)
- [apps/storybook](./apps/storybook/README.md)
- [packages/ui](./packages/ui/README.md)
- [packages/mosaic-maker](./packages/mosaic-maker/README.md)
- [packages/sequence-renderer](./packages/sequence-renderer/README.md)

---

## License

Personal learning project. Feel free to explore and use bits of code for your own learning!