# Glaze — divergence d'API CpuSurface vs GpuSurface (`clear`)

`CpuSurface.clear(color: string)` prend une chaîne de couleur CSS.
`GpuSurface.clear(r, g, b, a)` prend du rgba **normalisé 0..1** (valeurs par défaut 0,0,0,1).

Piège : les deux surfaces partagent le même modèle de dessin chaînable "world-space", donc on
attend une symétrie d'API — mais `clear` diffère. La raison : WebGL `clearColor` travaille en
0..1, donc la valeur est utilisée telle quelle.

Leçon : quand deux classes imitent la même API, toute divergence est un piège pour l'utilisateur
et mérite soit un commentaire ciblé, soit une vraie raison de design.
