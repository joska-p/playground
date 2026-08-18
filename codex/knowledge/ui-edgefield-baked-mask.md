# Baked mask vs pipeline live — garder une couleur dynamique (ui)

L'effet « edge-detection » (`EdgeField`) existe en trois variantes avec le même look :

1. `EdgeFieldOriginal` / `EdgeFieldSvg` : pipeline SVG live (feTurbulence → posterize →
   Laplacien → luminanceToAlpha → flood + blur), en double couche base + hot masked au curseur.
2. `EdgeFieldCanvas` : le même pipeline transposé en fragment shader WebGL2 (fbm/valueNoise,
   floor(n·BANDS)/BANDS, edgeDetect() à 9 taps, bloom = 2e passe plus large). Référence pour
   tweaker en temps réel ; le caller doit gérer `prefers-reduced-motion` (ne pas monter le canvas).
3. `EdgeFieldMask` : la chaîne SVG est déterministe et la couche inerte → rien à gagner à la
   re-exécuter dans le navigateur. Elle est cuite une fois par `scripts/bake-edge-field.py` dans
   `public/edge-field-mask.webp`, dont le canal alpha EST le motif de contours. On s'en sert comme
   `mask-image` CSS, ce qui laisse `--glow-color` totalement dynamique (thèmes, dark mode) sans
   retoucher l'asset cuit.

Leçon : un pipeline déterministe et coûteux peut être cuit en asset (masque/alpha), et appliquer
l'asset via un CSS mask préserve la possibilité de re-colorer sans le re-cuire.
