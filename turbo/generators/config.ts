import type { PlopTypes } from '@turbo/gen';

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
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}',
        base: 'templates',
        templateFiles: 'templates/**/*',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/.gitignore',
        templateFile: 'templates/.gitignore.hbs',
      },
    ],
  });
}
