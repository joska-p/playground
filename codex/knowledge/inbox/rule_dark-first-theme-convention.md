# Dark-first theme — `:root` = dark, `.light` = variant

**Contexte :** Gruvbox est nativement un thème sombre. Quand on adapte le système shadcn (qui utilise `.dark` comme variant sombre), il faut inverser la convention.

**Corps :**
- `:root` = thème sombre (Gruvbox dark) — c'est le défaut
- `.light` = variante claire (Gruvbox light) — pas `.dark`
- L'HTML a `data-theme='dark'` ou pas d'attribut (dark = défaut)
- Le switch de thème ajoute/enlève la classe `.light` sur `<html>`
- Cohérent avec l'esprit "labo créatif" où le dark mode est le mode naturel

**Lien codebase :** `packages/tlc/src/styles/theme.css`, `packages/tlc/index.html`

### Action Kanban

```bash
./scripts/kanban.sh rule "Dark-first theme convention" -b "For dark-native palettes (Gruvbox), use :root for dark and .light as variant. Never .dark. HTML data-theme='dark' or no attribute."
```
