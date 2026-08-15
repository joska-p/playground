# Glaze — `parseColor` : fallback magenta (convention de debug)

`parseColor` (gpu/shapes/color.ts) comprend hex, `rgb()`/`rgba()`, `hsl()`/`hsla()`, les couleurs
nommées, et sinon délègue au parseur du navigateur (via un canvas 2D offscreen + `fillStyle`).

Toute chaîne **non reconnue → magenta** (`(1, 0, 1, 1)`). C'est un signal visible : si on voit du
magenta dans la scène, c'est une couleur invalide quelque part — et ça marche sur les deux
surfaces (CPU et GPU partagent le même parsing).

Leçon : une valeur d'erreur *visible* (couleur criarde) vaut mieux qu'un échec silencieux pour un
débogage rapide.
