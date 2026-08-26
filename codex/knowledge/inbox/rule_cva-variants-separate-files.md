# CVA variants in separate files — react-refresh compliance

**Contexte :** ESLint `react-refresh/only-export-components` interdit d'exporter des constantes (comme les définitions CVA `xxxVariants`) depuis le même fichier qu'un composant React. Ça casse le fast refresh.

**Corps :**

- Toujours séparer les définitions `cva()` dans un fichier `*.variants.ts` (ex: `button.variants.ts`, `slider.variants.ts`)
- Le fichier composant (`button.tsx`) importe les variants depuis `./button.variants`
- Le barrel `index.ts` re-exporte les deux : `export { buttonVariants } from "./button.variants"`
- Pattern : `src/controls/button.variants.ts` + `src/controls/button.tsx`

**Lien codebase :** `packages/tlc/src/controls/button.variants.ts`, `packages/tlc/src/controls/slider.variants.ts`, `packages/tlc/src/controls/toggle.variants.ts`

### Action Kanban

```bash
./scripts/kanban.sh rule "CVA variants in separate files" -b "react-refresh/only-export-components bans exporting constants alongside components. Put cva() definitions in *.variants.ts files."
```
