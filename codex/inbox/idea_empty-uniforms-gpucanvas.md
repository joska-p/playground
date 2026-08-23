# GpuCanvas : constante EMPTY_UNIFORMS pour l'allocation `{}` par frame

**Contexte :** Repéré pendant le refactor du pipeline d'uniforms (session du 2026-08-23). Quand la prop `uniforms` est absente, `GpuCanvas` alloue un objet vide à chaque frame pour nourrir `program.setUniforms(...)`.

**Description :** Hoister une constante module-level `const EMPTY_UNIFORMS: Record<string, UniformValue> = {};` et la passer à la place du littéral `{}` inline. Une ligne, même philosophie que le reste du pipeline zéro-allocation (`setUniforms.ts`). Faible impact réel (un petit objet/frame), mais cohérence du contrat « rien ne s'alloue par frame côté lib ».

**Lien codebase :** `packages/glaze/src/react/GpuCanvas.tsx` (ligne ~87, effet `onFrame`)

### Action Kanban

```bash
./scripts/kanban.sh idea "GpuCanvas: EMPTY_UNIFORMS constant" -b "When the uniforms prop is absent, GpuCanvas allocates an empty object literal every frame. Hoist a module-level EMPTY_UNIFORMS constant for consistency with the zero-allocation uniform pipeline."
```
