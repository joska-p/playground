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
  - `add "TITRE" [-s STATUS] [-p PRIORITY] [-e EFFORT] [-b BODY]`
  - `idea "TITRE"` (Backlog/Low) · `wip "TITRE"` (In Progress/High)
  - `list` · `status <ID> <STATUS>` · `priority <ID> <PRIO>` · `effort <ID> <LEVEL>` · `delete <ID>` · `board`
  - `queue` (voir la file) · `enqueue <FIELD> <ID> <VALUE>` · `drain` (rejouer la file)
  - STATUS : Backlog | Todo | In Progress | Done · PRIORITY : Low | Medium | High | Urgent
  - EFFORT : 1 | 2 | 3 | 5 | 8 (Fibonacci — quick win = High + effort ≤ 2)
- ⚠️ Rate limit GitHub : les opérations échouées sont mises en file
  `scripts/kanban.queue` (gitignoré). `drain` les rejoue lentement (défaut 15 s
  par op, `KANBAN_DELAY` pour régler) en vérifiant le quota GraphQL avant chaque
  opération. Ne pas lancer de lots de `gh project` à la chaîne (limite burst).

## Progression

Déjà triés : **art-canvas** (README réécrit → carte Done), **automa** (2 cartes
créées), **automa-engine** (stable, rien à faire), **config-eslint** (revue
faite — README complet, stable, rien à faire), **config-typescript** (revue
faite — README désynchronisé d'app.json → carte créée, effort 1), **fracture**
(revue faite — passe lint/types ; carte remplacée par "framework de fractals"),
**mandelbrot** (revue faite — 22 lint + 5 TS errors, aucun script
lint/check-types → carte High "Fix erreurs lint + TS", effort 3), **glaze**
(revue "finale" faite — 71 tests OK, lint/types OK, typedoc OK ; carte "Corriger
le README" créée, effort 2 — Priority/Effort de cette carte sont en file
`scripts/kanban.queue` à drainer).

Prochain package : **graph-viz** → image-to-particles → l-system → …

## État du board

Lance `./scripts/kanban.sh list` pour l'état exact. En résumé (Backlog sauf
mention) : la décision outil docs (High), le refactor docs par package (une
carte "🛠️ [Docs] <pkg>: README + API" pour chaque package non documenté), les
cartes créées pendant le tri (Mandelbrot, OEIS Signal, Randomart doublon,
Primordial Noise, Drafts Ideas, Fracture, Glaze, Repo README, Repo nettoyage,
Art-Canvas atlas, Automa éditeur de règles / algorithmic art) + cette session
(config-typescript README aligné, mandelbrot fix lint+TS High, glaze README
fix).

## Fils en cours (importants)

1. **Architecture fractals (nouvelle direction)** — hiérarchie en 3 couches :
   **glaze** = lib graphique (début d'une "nouvelle ère" : se faire ses propres
   outils) → **fracture** = moteur abstrait de fractals → **mandelbrot** =
   app standalone construite SUR fracture, avec les implémentations (Original,
   DoubleSplit, Perturbation). Glaze garde TypeDoc/TSDoc pour l'instant.
   Cartes liées : fracture "framework de fractals" (effort 5), mandelbrot fix
   lint+TS (High).
2. **Refactor doc system** — TypeDoc ne convient pas au FP ni aux composants
   React. Une carte High "Choisir l'outil d'API doc" est prioritaire. Le système
   actuel : README (concept) + TypeDoc (API) → `dist-docs` →
   `scripts/collect-static-assets.mjs` → servi sur `/docs/api/<pkg>/`. Le double
   registre manuel (collect-static-assets + reference/packages.md) est voulu.
3. **Randomart vs randomart-next** : doublon potentiel à consolider.
4. README racine : chemins `packages/engines/...` inexistants à corriger.
