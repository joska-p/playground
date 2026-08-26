# CSS relative color syntax — hex → oklch token mapping

**Contexte :** Le thème Gruvbox utilise des hex colors officielles. Plutôt que convertir manuellement en oklch, on utilise la relative color syntax du CSS Color Module 4.

**Corps :**
```css
:root {
    --gb-orange: #fe8019;
    --primary: oklch(from var(--gb-orange) l c h);
}
```
- `oklch(from var(--hex) l c h)` — le navigateur convertit le hex en oklch et extrait L/C/H
- Support natif Chrome/Edge/Safari/Firefox récents (2026 = safe sans fallback pour projet perso)
- Permet de garder les hex Gruvbox officiels comme source de vérité tout en ayant des tokens oklch pour Tailwind v4
- Pour figer les valeurs (perf ou support plus large), passer par oklch.com et colle les valeurs calculées

**Lien codebase :** `packages/tlc/src/styles/theme.css`

### Action Kanban

```bash
./scripts/kanban.sh snippet "CSS relative color syntax for token mapping" -b "Use oklch(from var(--hex) l c h) to convert hex colors to oklch tokens. Keeps source hex as SSOT while providing oklch for Tailwind v4."
```
