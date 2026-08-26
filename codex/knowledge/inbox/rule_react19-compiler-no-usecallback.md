# React 19 Compiler — pas de useCallback/useMemo

**Contexte :** Le projet utilise React 19 Compiler (babel-plugin-react-compiler) qui gère automatiquement la mémoïsation. Le lint du projet interdit explicitement `useCallback` et `useMemo` via la règle `no-restricted-syntax`.

**Corps :**
- Ne jamais écrire `useCallback` ou `useMemo` dans un projet React 19 Compiler — le compiler le fait mieux automatiquement
- Si le lint signale `Audit Fail: React 19 Compiler gère la mémoïsation. Pas de useCallback`, supprimer l'appel et laisser le callback inline
- Les composants doivent rester purs et simples — le compiler détermine lui-même quoi mémoriser

**Lien codebase :** `packages/tlc/src/controls/slider.tsx`, `packages/tlc/src/controls/toggle.tsx`

### Action Kanban

```bash
./scripts/kanban.sh rule "React 19 Compiler: no useCallback/useMemo" -b "React 19 Compiler handles memoization. Lint forbids useCallback/useMemo. Keep components pure and simple."
```
