# Règles d'harmonie en OKLCh + décision « 6 couleurs » (palette-engine)

Le moteur `palette-engine` offre 4 espaces de couleurs navigables (OKLab, OKLCh, HSL, sRGB) mais
toutes ses règles d'harmonie (analogous, complementary, monochromatic, triadic) convertissent la
couleur de base en **OKLCh** avant de manipuler teinte/chroma/luminosité. Pourquoi : OKLCh est le
plus perceptuellement uniforme des espaces cylindriques (teinte = angle, chroma = rayon,
luminosité = axe linéaire). Un flip de 180° y est équilibré, là où le même angle en HSL peut
paraître bancal.

Deux décisions de design notables :

- **Toujours 6 couleurs** par palette. Ce n'est pas contraint par les maths (analogous pourrait
  faire 3 ou 9, complementary 2 ou 12) — c'est un choix délibéré : assez de variation pour
  explorer, sans surcharger l'affichage.
- **Réduction de chroma de 20 %** aux extrêmes (L > 0.8 et L < 0.3) dans la règle monochromatic.
  C'est une correction perceptuelle, pas une nécessité mathématique : des pas de luminosité purs en
  OKLCh donnent des pastels trop saturés aux extrêmes.

`Palette` est volontairement `{ colors: Color[] }` — « presque suspectement fin ». Le moteur ne
prescrit pas ce qu'est une palette, il rend juste les couleurs.
