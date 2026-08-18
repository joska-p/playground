# Glaze — pattern : ownership des ressources WebGL pour gérer le context loss

`GpuSurface.createProgram()` ne crée pas juste un programme : il enregistre le programme dans
`#programs` (Set) pour qu'il soit **possédé par la surface**. Conséquences :

- au `webglcontextlost` / `webglcontextrestored`, la surface recompile tous les programmes
  possédés (`program.reinitialize()`) ;
- à `surface.destroy()`, tous les programmes possédés sont détruits.

Pattern : pour survivre au context loss WebGL, il ne faut **jamais** laisser l'utilisateur
créer des ressources GL "nues" — il faut les rattacher à un owner unique qui connaît le cycle
de vie (recompile + destroy). Idem pour le `ShapeBatcher` (reinitialize) et le `TextRasterizer`
(clear des textures).

Autre point : `#getTextProgram` lazy-initialise le programme de texte via `createProgram`, donc
il bénéficie automatiquement du même cycle de vie.
