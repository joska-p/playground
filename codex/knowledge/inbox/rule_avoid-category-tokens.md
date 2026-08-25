# Les tokens tags sont de la dette technique

**Contexte :** Le thème avait 35+ tokens `--tags-*` (un par catégorie de projet : canvas, 3d, generative, etc.). Ces tokens étaient utilisés dans 3 fichiers seulement et créaient une maintenance lourde.

**Description :** Les tokens de couleur par catégorie sont une antipattern quand il y en a beaucoup. Une fonction `hashToColor` qui génère la couleur à la volée est plus simple, plus maintenable, et élimine la duplication entre dark et light mode. Si une couleur doit être fixe (ex: rouge pour erreur), elle doit être un token sémantique (`--destructive`), pas un token par cas d'usage.

**Lien codebase :** `packages/ui/src/styles/gruvbox-theme.css` (tags supprimés), `apps/playground/src/utils/tag-colors.ts` (remplaçant)

### Action Kanban

```bash
./scripts/kanban.sh rule "Éviter tokens tags" -b "Ne pas créer un token par catégorie — préférer une fonction hashToColor ou des tokens sémantiques"
```
