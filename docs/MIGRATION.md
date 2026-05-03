I have drafted a comprehensive migration log for you. You can save this as `MIGRATION.md` in your project root. It documents the logic behind your `astro.config.mjs` setup, your version-locking strategy in `package.json`, and the final archival steps for GitHub.

---

# Project Migration & Archival Log
**Date:** May 2026  
**Project:** `@repo/playground`  
**From:** GitHub (`joska-p/playground`)  
**To:** GitLab (`jpotin/playground`)  

## 1. Infrastructure Strategy
The migration was designed to be "environment-agnostic," allowing the same codebase to run on GitLab Pages (sub-path) and Vercel (root domain).

### Version Control & Engines
*   **Node.js:** Locked to `>=24.15.0` to match local development and ensure compatibility with modern features.
*   **Package Manager:** Locked to `pnpm@10.19.0` via the `packageManager` field.
*   **CI/CD:** Shifted from GitHub Actions to GitLab CI using the `node:24.15.0` Docker image.

### Path Resolution Logic
The `astro.config.mjs` was configured to handle site routing dynamically:
*   **GitLab Pages:** Uses `base: "/playground"` to support the `username.gitlab.io/project` structure.
*   **Vercel:** Uses `base: "/"` for root-level production and preview deployments.
*   **Markdown:** `remarkBaseUrl` ensures internal links in `.md` files remain valid across environments.

## 2. CI/CD Pipeline (`.gitlab-ci.yml`)
The new GitLab pipeline automates the dual-deployment of the Playground and Storybook:
1.  **Environment Setup:** Enables `corepack` to fetch the specific pnpm version defined in `package.json`.
2.  **Build Execution:** Runs `pnpm run deploy:vercel` which:
    *   Builds the Astro application.
    *   Creates a `dist/storybook` directory.
    *   Copies the static Storybook build into the Astro distribution folder.
3.  **Deployment:** Moves the final `dist` to `public/` for GitLab Pages hosting.

## 3. GitHub Archival Process
To prevent "split-brain" development, the GitHub repository was decommissioned as follows:
*   **Branch Cleanup:** The `develop` branch was deleted on GitHub to leave only a single source of history (`main`).
*   **Metadata Update:** The repository description was updated to point to the GitLab URL.
*   **README Update:** Added a migration banner and updated all documentation links to point to `jpotin.gitlab.io/playground/`.
*   **Archival:** The repository was set to **Archive** mode (read-only) to preserve history and contribution graphs.

## 4. Key Links
*   **Primary Source:** [gitlab.com/jpotin/playground](https://gitlab.com/jpotin/playground)
*   **Live Site (Pages):** [jpotin.gitlab.io/playground/](https://jpotin.gitlab.io/playground/)
*   **Live Site (Vercel):** [playground-ten-sand.vercel.app](https://playground-ten-sand.vercel.app)
*   **Storybook:** [jpotin.gitlab.io/playground/storybook/](https://jpotin.gitlab.io/playground/storybook/)

---

### Maintenance Note
If you update the `engines` or `packageManager` in `package.json` in the future, remember to update the `image` tag in `.gitlab-ci.yml` to keep the CI environment in sync with your local machine.
