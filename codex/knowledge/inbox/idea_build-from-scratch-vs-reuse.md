# Build from scratch vs reuse — design system philosophy

**Contexte :** Le projet avait déjà `@repo/ui` avec des composants fonctionnels (Button, Slider, ControlPanel, etc.). L'utilisateur a choisi de reconstruire from scratch dans `@repo/tlc` plutôt que de réutiliser.

**Corps :**
- Quand le spec est détaillé et l'architecture différente, construire from scratch donne un résultat plus propre et plus fidèle au spec
- Réutiliser du code existant est plus rapide mais garde les choix d'architecture précédents
- Pour un design system personnel, la propreté architecturale prime sur la rapidité d'exécution
- La décision dépend du spec : si le spec décrit une architecture fondamentalement différente, from scratch est justifié

**Exemple session :** `@repo/ui` avait Button (8 variants), Slider (6 colors), ControlPanel, ControlSection — tous fonctionnels. Mais l'architecture TLC (Shell + Panel + Controls comme primitives compositables) était suffisamment différente pour justifier la reconstruction.

**Lien codebase :** `packages/tlc/`, `packages/ui/`

### Action Kanban

```bash
./scripts/kanban.sh idea "Build from scratch vs reuse decision framework" -b "When spec describes fundamentally different architecture, from scratch yields cleaner results. When extending existing patterns, reuse is faster. Let the spec's architecture delta decide."
```
