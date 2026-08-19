# Ne pas utiliser color-mix inline dans les classes Tailwind

**Contexte :** Lors du nettoyage du thème Playground, on a découvert que de nombreux composants utilisaient `color-mix(in_oklch,...)` et `color-mix(in_srgb,...)` directement dans les classes Tailwind. Cela crée des couleurs inline complexes qui cassent l'harmonie du thème et rendent le code difficile à maintenir.

**Description :** Préférer toujours les tokens CSS existants (`--variant-color`, `--primary`, `--foreground-muted`, etc.) ou les classes Tailwind standard (`border-(--variant-color)/20`, `bg-(--variant-color)/5`) aux `color-mix` inline. Si un effet complexe est nécessaire, le centraliser dans un token CSS dans le thème.

**Lien codebase :**
- `packages/ui/src/components/cards/shared/CardLink.tsx` (nettoyé)
- `packages/ui/src/components/cards/sci-fi-card/variants.ts` (nettoyé)
- `packages/ui/src/components/cards/doc-card/DocCard.tsx` (nettoyé)
- `packages/ui/src/components/data-display/section-header/SectionHeader.tsx` (nettoyé)

### Action Kanban

```bash
./scripts/kanban.sh idea "Éviter color-mix inline" -b "Préférer les tokens CSS aux color-mix inline dans les classes Tailwind pour maintenir l'harmonie du thème"
```
