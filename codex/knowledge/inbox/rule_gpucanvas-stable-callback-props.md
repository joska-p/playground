---
title: 'Props callback de GpuCanvas : identités stables obligatoires'
date: 2026-08-21
type: rule
tags: [react, glaze, webgl]
---

**Contexte :** les effets de `GpuCanvas` dépendent de l'identité de `onSurface`, `uniforms`, `onDraw` (`[onDraw, uniforms, fragmentShader, onSurface, ...]`). Une nouvelle identité re-exécute `onSurface` → destruction/recréation de l'engine et du StateBuffer.

**Corps :**
Règle : passer des références stables à `GpuCanvas` — actions module-level (`initSimulation`), jamais d'arrow inline pour `onSurface`. Les arrows inline dans `uniforms`/`onDraw` ne sont sûres que si le composant ne se re-render pas ou si React Compiler les mémoïse ; ne pas miser dessus.

Gotcha complémentaire : garder l'init idempotente (détruire l'instance existante avant d'en créer une nouvelle) couvre StrictMode, le double-montage et la restauration après context-loss — c'est le filet quand une identité échappe.

**Lien codebase :** `packages/glaze/src/react/GpuCanvas.tsx` (effet de draw), `packages/automa/src/components/canvas/CellMesh.tsx`
