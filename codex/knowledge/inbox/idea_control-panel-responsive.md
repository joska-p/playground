# ControlPanel responsive natif

**Contexte :** Le composant `ControlPanel` dans `@repo/ui` gère le positionnement (top/bottom/left/right) et le collapse, mais le responsive mobile doit être géré manuellement. Le brief de redesign demande un composant qui gère automatiquement le responsive.

**Description :** Créer un composant `ControlPanel` qui :

- Desktop : dock latéral (gauche/droite)
- Mobile : drawer (bottom sheet ou side drawer)
- Toggle toujours visible et accessible
- Overlay semi-transparent sur mobile quand le drawer est ouvert
- Transition douce sans redimensionnement brutal

Le fichier `packages/ui/src/components/control-panel/variants.ts` contient déjà des `compoundVariants` pour gérer portrait vs landscape. Il faut étendre cette logique.

**Lien codebase :**

- `packages/ui/src/components/control-panel/control-panel/ControlPanel.tsx`
- `packages/ui/src/components/control-panel/variants.ts`

### Action Kanban

```bash
./scripts/kanban.sh idea "ControlPanel responsive" -b "Le composant doit gérer automatiquement le responsive : dock desktop, drawer mobile"
```
