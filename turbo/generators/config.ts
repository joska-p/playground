import type { PlopTypes } from '@turbo/gen';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

interface Project {
  id: string;
  packageDir: string;
  [key: string]: unknown;
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('new-package', {
    description: 'Scaffold a new Vite + React package with a dummy app',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'Package name (kebab-case, e.g. my-package → @repo/my-package at packages/my-package/):',
        validate: (input: string) => {
          if (!/^[a-z][a-z0-9-]*$/.test(input)) {
            return 'Must be kebab-case: lowercase letters, numbers, and hyphens only.';
          }
          return true;
        }
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}',
        base: 'templates',
        templateFiles: 'templates/new-package/**/*'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/.gitignore',
        templateFile: 'templates/new-package/.gitignore.hbs'
      }
    ]
  });

  plop.setGenerator('project-pages', {
    description: 'Generate one Astro page per project from projects.yml',
    prompts: [],
    actions: () => {
      // Adjust to your actual app path if this isn't at the repo root
      const ymlPath = join(process.cwd(), 'apps/playground/src/content/projects.yml');
      const projects = parse(readFileSync(ymlPath, 'utf-8')) as Project[];

      return projects.map((project) => ({
        type: 'add',
        path: 'apps/playground/src/pages/discoveries/{{id}}.astro',
        templateFile: 'templates/project-pages/project-pages.astro.hbs',
        data: { id: project.id, packageDir: project.packageDir },
        force: true // overwrite on regeneration
      }));
    }
  });
}
