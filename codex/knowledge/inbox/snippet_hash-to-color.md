## title: 'Fonction hashToColor pour couleurs oklch'

date: 2026-08-19
type: snippet
tags: [css, oklch, color, utility]

**Contexte :** On avait besoin de générer des couleurs uniques pour les badges/tags sans maintenir une map de 35+ tokens `--tags-*`. La solution est de générer directement une couleur oklch à partir d'un hash du nom.

**Corps :**

```typescript
// apps/playground/src/utils/tag-colors.ts

export function hashToColor(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash = hash & hash;
    }
    const h = Math.abs(hash) % 360;
    const s = 0.12 + (Math.abs(hash >> 8) % 80) / 1000;
    const l = 0.55 + (Math.abs(hash >> 16) % 150) / 1000;
    return `oklch(${l.toFixed(2)} ${s.toFixed(2)} ${h})`;
}
```

**Lien codebase :** `apps/playground/src/utils/tag-colors.ts`

### Action Kanban

```bash
./scripts/kanban.sh snippet "hashToColor" -b "Fonction pour générer des couleurs oklch à partir d'un hash string"
```
