# Tokens morts d'une migration incomplète

**Corps :** Le pattern shadcn/ui → gruvbox theme a laissé des fantômes. Quand on change le nom d'un token dans le theme CSS, les anciens noms deviennent des "silent failures" — les classes résolvent sans erreur, sans warning, juste du vide. C'est pire qu'un crash car invisible.

Dans cette session : `muted-foreground` (~100+ usages), `bg-muted` (~34 usages), et `foreground-muted` (défini, 0 usages) — trois facets du même problème de migration à moitié faite.

**Pattern à surveiller :** tout token dont le nom contient "muted" dans le codebase est suspect. Vérifier systématiquement qu'il existe une définition `--color-*` dans `@theme inline` ET une variable CSS `--*` dans `:root`.

**Exemple session :** L'audit initial a montré `text-muted-foreground` utilisé partout dans les composants docs (TokenTable, TypographyTable, NavCategory, ApiReference, Footer, 404). Aucun ne produisait la couleur attendue — le texte s'affichait en couleur héritée au lieu de la couleur secondaire prévue.

**Leçon :** Une migration de token doit être atomique — renommer dans le theme ET dans tous les consumers en une seule passe. Un script `rg` + `sed` est plus sûr qu'une migration manuelle au fil du temps.
