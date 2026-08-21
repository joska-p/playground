---
title: 'tsconfig solution : tsc --noEmit -p passe toujours (check vacuum)'
date: 2026-08-21
type: rule
tags: [typescript, tooling]
---

**Contexte :** pendant le refactor d'automa, un échec TS2322 persistait via `pnpm check-types` (`tsc -b`) alors qu'un `tsc --noEmit -p tsconfig.json` passait — inversion trompeuse de la confiance habituelle.

**Corps :**
Règle : les `tsconfig.json` racines de ce monorepo sont des solutions (`files: []`, `references`). Lancer `tsc --noEmit -p tsconfig.json` dessus ne vérifie **aucun fichier** et réussit toujours. La commande de validation réelle est `tsc -b` ; ajouter `--force` quand on soupçonne un `.tsbuildinfo` périmé ou qu'on vient de changer des options.

Gotcha : en debug, croire qu'une erreur est un faux positif parce qu'une autre invocation de tsc "passe" — vérifier d'abord quel projet la commande compile réellement.

**Lien codebase :** `packages/*/tsconfig.json` (solutions), `packages/*/package.json` (`check-types`)
