# Creative Playground — Migration du système de documentation

Tu es un agent d'ingénierie qui m'aide à finaliser la migration du système de
documentation du monorepo **Creative Playground** (Turborepo, pnpm, React 19,
Astro). Réponds-moi en français.

## Skill de documentation

Le skill `documenting` est disponible dans `.agents/skills/documenting/SKILL.md`.
Il définit le contrat du système de documentation en deux volets :

1. **README (`packages/<pkg>/README.md`)** : Concept uniquement — titre + tagline,
   raison d'être, démarrage rapide, exemples d'utilisation, patterns & pièges.
   Jamais un inventaire complet de l'API.
2. **API Reference** : Générée automatiquement via TypeDoc à partir des commentaires TSDoc (`/** */`)
   sur les symboles exportés — ne doit jamais être rédigée à la main.

### Pipeline de publication

1. `packages/<pkg>/typedoc.json` + script `"build:docs": "typedoc"`.
2. `pnpm build:docs` → génération HTML static dans `dist-docs/`.
3. Enregistrement dans `scripts/collect-static-assets.mjs` et ajout à la liste `apps/playground/src/content/docs/reference/packages.md`.
4. `pnpm collect-assets` → servi sur `/docs/api/<pkg>/`.

---

## Étaient traités dans la session

Toutes les cartes prioritaires et les packages cibles de cette session ont été complétés avec succès et leurs statuts mis à jour sur le board Kanban :
- `🛠️ [Docs]: Choisir l'outil d'API doc` (TypeDoc + plugins validé)
- `🛠️ [Docs] automa-engine: README + API`
- `🛠️ [Docs] automa: README + API`
- `🛠️ [Docs] fracture: README + API`
- `🛠️ [Docs] pixel-engine: README + API`
- `🛠️ [Docs] palette-engine: README + API`
- `🛠️ [Docs] graph-viz: Mettre à jour le README (status 'Paused')`
- `🛠️ [Docs] l-system & l-system-engine: Indiquer le statut 'Draft'`
- `🛠️ [Docs] three-stage: README + API`
- `🛠️ [Docs] ui: README + API`
- `🛠️ [Docs] playground: README + Architecture du site`

---

## État des lieux des packages du Monorepo

### Packages implémentant le nouveau système (16 packages)

Chacun de ces packages possède un `README.md` conceptuel, une configuration `typedoc.json`, le script `"build:docs": "typedoc"`, et est enregistré dans `scripts/collect-static-assets.mjs` ainsi que sur la page de référence [`apps/playground/src/content/docs/reference/packages.md`](../apps/playground/src/content/docs/reference/packages.md) :

1. `@repo/art-canvas`
2. `@repo/automa`
3. `@repo/automa-engine`
4. `@repo/fracture`
5. `@repo/glaze`
6. `@repo/l-system-engine`
7. `@repo/palette-engine`
8. `@repo/pixel`
9. `@repo/pixel-engine`
10. `@repo/pixel-manipulator`
11. `@repo/radu-machine-learning`
12. `@repo/randomart-engine`
13. `@repo/randomart-engine-next`
14. `@repo/sequence-renderer`
15. `@repo/three-stage`
16. `@repo/ui`

---

### Packages n'implémentant PAS encore le nouveau système (16 éléments)

Voici la liste exacte des packages et applications qui n'ont pas encore été migrés vers le nouveau système de documentation (absence de `typedoc.json` / pipeline `build:docs` dédié) :

#### 1. Moteurs & Librairies (à migrer pour la suite)
- **`sequence-engine`** (`packages/sequence-engine`) — Moteur de calcul de séquences mathématiques.
- **`worker-pool`** (`packages/worker-pool`) — Gestionnaire de pool de Web Workers.

#### 2. Visualiseurs & Applications UI (Wrappers front-end)
- **`graph-viz`** (`packages/graph-viz`) — Visualiseur de graphes *(Statut : Paused)*.
- **`image-to-particles`** (`packages/image-to-particles`) — Expérimentation image-vers-particules.
- **`l-system`** (`packages/l-system`) — Interface UI pour `l-system-engine` *(Statut : Draft)*.
- **`mandelbrot`** (`packages/mandelbrot`) — Visualiseur de fractales Mandelbrot *(En cours de refactoring)*.
- **`mosaic-maker`** (`packages/mosaic-maker`) — Application de génération de mosaïques.
- **`oeis-signal`** (`packages/oeis-signal`) — Application de visualisation de séquences OEIS.
- **`palette-generator`** (`packages/palette-generator`) — Interface UI pour `palette-engine`.
- **`randomart`** (`packages/randomart`) — Interface UI pour `randomart-engine`.
- **`randomart-next`** (`packages/randomart-next`) — Interface UI pour `randomart-engine-next`.
- **`real-life`** (`packages/real-life`) — Expérimentation visuelle procédurale.

#### 3. Configurations partagées / Outillage monorepo (Hors TypeDoc)
- **`config-eslint`** (`packages/config-eslint`) — Package de règles ESLint partagées.
- **`config-typescript`** (`packages/config-typescript`) — Package de configurations tsconfig partagées.

#### 4. Applications Hub
- **`playground`** (`apps/playground`) — Site Astro hub & portail de documentation (README architecture mis à jour, mais pas un package de bibliothèque TypeDoc).
- **`storybook`** (`apps/storybook`) — Instance Storybook du monorepo.
