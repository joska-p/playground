# Tailwind v4 @theme inline block pattern

**Contexte :** Tailwind CSS v4 utilise `@theme inline` dans les fichiers CSS (pas de `tailwind.config.js`) pour mapper les variables CSS vers les utilitaires Tailwind.

**Corps :**

```css
@theme inline {
    --color-primary: var(--primary);
    --color-primary-foreground: var(--primary-foreground);
    --radius-sm: calc(var(--radius) - 4px);
    --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

- Sans `@theme inline`, la variable CSS existe mais aucune classe Tailwind n'est générée
- Le préfixe `--color-` génère `bg-primary`, `text-primary-foreground`, etc.
- Le préfixe `--radius-` génère `rounded-sm`, `rounded-md`, etc.
- Le préfixe `--font-` génère `font-mono`, etc.

**Lien codebase :** `packages/tlc/src/styles/theme.css`

### Action Kanban

```bash
./scripts/kanban.sh snippet "Tailwind v4 @theme inline pattern" -b "Map CSS vars to Tailwind utilities with @theme inline { --color-X: var(--X); }. Without it, no utility classes are generated."
```
