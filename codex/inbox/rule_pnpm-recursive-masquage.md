---
title: "pnpm -r s'arrête au premier échec et masque les packages suivants"
date: 2026-08-23
type: rule
tags: [pnpm, monorepo, ci, verification]
---

**Contexte :** Vérification post-refactor de l'API `Camera` de `glaze` sur les 32 projets du workspace.

**Corps :**
`pnpm -r --if-present check-types` interrompt la récursion au premier package en échec. Les packages situés **après** lui dans l'ordre topologique ne sont ni exécutés ni rapportés — leur absence dans la sortie ressemble à un succès. Gotcha : deux packages muets dans la liste (`randomart`, `randomart-next`) étaient simplement skippés, pas verts.

Règle : après une rupture d'API publique, ne jamais conclure depuis un run récursif échoué. Cibler explicitement les suspects :

```sh
pnpm --filter @repo/randomart --filter @repo/randomart-next --if-present check-types
```

puis relancer le `-r` complet pour confirmer le vert global.

**Lien codebase :** N/A (outillage)
