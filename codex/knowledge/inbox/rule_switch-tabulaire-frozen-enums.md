---
title: 'Enum figé par une spec externe : switch tabulaire plutôt que hiérarchie de classes'
date: 2026-08-23
type: rule
tags: [architecture, oop, yagni, webgl, design]
---

**Contexte :** Débat d'architecture sur `setUniformValue` (glaze) : remplacer `UniformEntry` + gros `switch(type)` par des classes `FloatUniform`, `Vec2Uniform`, etc. encapsulant leur `upload(gl, value)`.

**Corps :**
Quand les variantes diffèrent uniquement par « quelle fonction appeler avec quel cast » et que le jeu de variantes est **gelé par une spec externe** (ici les types d'uniforms WebGL2), le switch plat gagne sur tous les tableaux :

- **Extensibilité** : le principe ouvert/fermé n'a rien vers quoi s'ouvrir — la spec n'ajoutera jamais de nouveau type. Ajouter un cas = 3 lignes ; avec classes = nouvelle classe + entrée de factory.
- **Perf** : dispatch quasi gratuit des deux côtés ; le coût dominant est l'appel FFI vers l'implémentation GL, deux à trois ordres de grandeur au-dessus du JS environnant. Mesurer le dispatch, c'est mesurer le bruit.
- **Bundle** : N classes (constructeur + méthode + factory) minifient plus verbeux que N cases compacts.
- **Lisibilité** : le switch _est_ la table de la spec — un écran montre chaque type et son appel exact ; la POO disperse cette table en fichiers.

**Le critère de bascule :** passer aux objets par type dès que les variantes gagnent du comportement ou de l'état propre — ex. `Vec2Uniform` acceptant `{x, y}`, `ColorUniform` parsant du CSS, narrowing typé remplaçant les casts. C'est alors une feature DX, plus YAGNI avant.

**Lien codebase :** `packages/glaze/src/gpu/shader/setUniforms.ts` (`setUniformValue`), `packages/glaze/src/gpu/shader/compileProgram.ts` (`UniformEntry`)
