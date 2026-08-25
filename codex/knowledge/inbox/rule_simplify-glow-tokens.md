# Simplifier les glows — garder 2 max

**Contexte :** Le thème initial avait 8 variantes de glows (`shadow-glow-rest`, `shadow-glow-hover`, `shadow-glow-link`, `shadow-glow-btn`, `shadow-glow-logo`, `shadow-glow-logo-hover`, `shadow-glow-mobile`, `shadow-glow-active-link`). La plupart n'étaient pas utilisées ou étaient redondantes.

**Description :** Pour un thème cohérent, il suffit de 2 glows principaux : `shadow-glow-rest` (état repos) et `shadow-glow-hover` (état hover). Les autres effets doivent être soit des dérivés de ces deux, soit des ombres inline simples. Un trop grand nombre de tokens d'ombre crée de la confusion et de la dette technique.

**Lien codebase :** `packages/ui/src/styles/gruvbox-theme.css`

### Action Kanban

```bash
./scripts/kanban.sh idea "Simplifier les glows" -b "Garder 2 glows max (rest/hover), supprimer les variantes redondantes"
```
