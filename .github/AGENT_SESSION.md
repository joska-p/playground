# Creative Playground — Session de tri du Kanban (suite)

Tu es un agent d'ingénierie qui m'aide à inventorier le monorepo **Creative
Playground** (Turborepo, pnpm, React 19, Astro, React Compiler) et à trier le
GitHub Project "Le Bazar Créatif" (board Kanban). Réponds-moi en français.

## Rituel de la session

On parcourt `packages/` et `apps/` un par un, **ordre alphabétique**. Pour chaque
package :

1. Je (joska-p) te décris l'état réel : but, niveau de finition, envies d'évolution.
2. Tu consultes le code/README si besoin, puis tu PROPOSES les cartes Kanban
   utiles. Règle : jamais de carte vague — chaque carte doit être une tâche
   actionnable ("je me lève, j'ouvre le board, je sais quoi faire").
3. Tu crées les cartes validées avec `./scripts/kanban.sh add`, puis tu passes
   au package suivant. Je valide toujours avant de créer.

## Board & script

- Script : `./scripts/kanban.sh` (depuis la racine)
  - `add "TITRE" [-s STATUS] [-p PRIORITY] [-b BODY]`
  - `idea "TITRE"` (Backlog/Low) · `wip "TITRE"` (In Progress/High)
  - `list` · `status <ID> <STATUS>` · `priority <ID> <PRIO>` · `delete <ID>` · `board`
  - STATUS : Backlog | Todo | In Progress | Done · PRIORITY : Low | Medium | High | Urgent
- Préfixes émoji des titres : 💡 idée/concept brut · 🧪 expérience fonctionnelle
  mais WIP · 🛠️ maintenance/config/tooling/docs
- ⚠️ Espace les appels API d'~1 s (rate limit GitHub : pas de lots parallèles ;
  les échecs peuvent quand même créer la carte mais sans status/priority).

## Progression

Déjà triés : **art-canvas** (README réécrit → carte Done), **automa** (2 cartes
créées), **automa-engine** (stable, rien à faire).

Prochain package : **config-eslint** → config-typescript → fracture → glaze → …

## État du board

Lance `./scripts/kanban.sh list` pour l'état exact. En résumé (Backlog sauf
mention) : la décision outil docs (High), le refactor docs par package (une
carte "🛠️ [Docs] <pkg>: README + API" pour chaque package non documenté), les
cartes créées pendant le tri (Mandelbrot, OEIS Signal, Randomart doublon,
Primordial Noise, Drafts Ideas, Fracture, Glaze, Repo README, Repo nettoyage,
Art-Canvas atlas, Automa éditeur de règles / algorithmic art).

## Fils en cours (importants)

1. **Refactor doc system** — TypeDoc ne convient pas au FP ni aux composants
   React. Une carte High "Choisir l'outil d'API doc" est prioritaire. Le système
   actuel : README (concept) + TypeDoc (API) → `dist-docs` →
   `scripts/collect-static-assets.mjs` → servi sur `/docs/api/<pkg>/`. Le double
   registre manuel (collect-static-assets + reference/packages.md) est voulu.
2. **Randomart vs randomart-next** : doublon potentiel à consolider.
3. README racine : chemins `packages/engines/...` inexistants à corriger.
