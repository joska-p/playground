# [Ateliers et Pipelines de Documentation dans Codex]

**Contexte :** Lors de la restructuration du monorepo, les scripts utilitaires comme la génération de TypeDoc ont été déplacés dans `codex/ateliers/typedoc-pipeline/`.
**Description :** Centraliser non seulement la documentation textuelle, mais aussi les scripts de pipeline, générateurs et ateliers interactifs de documentation sous `codex/ateliers/` pour encourager l'outillage autonome autour de la doc.
**Lien codebase :** `codex/ateliers/typedoc-pipeline/generate-typedoc-json.mjs`, `turbo.json`, `apps/playground/package.json`

## Action Kanban

```bash
./scripts/kanban.sh idea "Ateliers et Pipelines de Documentation dans Codex" -b "Centraliser les scripts de pipeline et outils de doc sous codex/ateliers/"
```
