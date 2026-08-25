# Cycle palettes : fenêtre qui reboucle

`updateCurrentPalettes` fait défiler une fenêtre de `MAX_NUMBER_OF_PALETTES` (42) dans le stock.

Formule de rebouclage : `currentPalettesIndex >= paletteStock.length - MAX_NUMBER_OF_PALETTES ? 0 : currentPalettesIndex + MAX_NUMBER_OF_PALETTES`.

C'est le `>=` (pas `>`) qui déclenche le retour à 0 dès que le prochain saut dépasserait la fin. Fonctionne même si `paletteStock.length` n'est pas un multiple de 42.
