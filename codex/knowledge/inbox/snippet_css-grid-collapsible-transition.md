# CSS grid-template-rows collapsible transition

**Contexte :** Animation de collapse/expand sans librairie d'animation. Utilise `grid-template-rows: 0fr → 1fr` avec une transition CSS.

**Corps :**

```tsx
<div
    className={cn(
        'grid transition-[grid-template-rows] duration-200 ease-out',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
    )}
>
    <div className="overflow-hidden">{/* contenu collapsible */}</div>
</div>
```

- Le `<div>` interne avec `overflow-hidden` est nécessaire pour que le contenu se plie proprement
- Fonctionne sur mobile et desktop, pas de JS d'animation requis
- Compatible `@starting-style` pour l'entrée initiale si besoin

**Lien codebase :** `packages/tlc/src/layout/panel-section.tsx`

### Action Kanban

```bash
./scripts/kanban.sh snippet "CSS grid-template-rows collapsible" -b "Animate collapse/expand with grid-template-rows 0fr→1fr transition. Child div needs overflow:hidden."
```
