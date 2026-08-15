# Id de palette dérivé du contenu (smell latent)

`getPaletteId(colors) = [...colors].sort().join('-')` : id déterministe par rapport aux couleurs, pas un index de fetch. Utilisé comme `key` React, valeur de radio et comparaison (`palette.id === currentPalette.id`).

Smell latent : le `sort()` ⇒ deux palettes avec les mêmes couleurs dans un ordre DIFFÉRENT auraient le même id, alors que `createPalette` mappe `colors[i] → --color-i` (l'ordre compte). → collision de `key` React possible en théorie. Jamais observé en pratique (le dataset ne contient pas de doublons désordonnés).
