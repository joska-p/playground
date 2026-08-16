# Mandelbrot — BigFloat : point fixe binaire, précision partagée

`BigFloat` = `{ m: bigint, prec: number }` représentant `m * 2^-prec` (point fixe binaire, sans
dépendance, juste BigInt).

Pièges / leçons :

- **Toutes les valeurs qui interagissent doivent partager le même `prec`**. L'implémentation
  (`align`) promeut silencieusement vers le max des deux `prec` pour add/sub/mul, donc en
  pratique c'est tolérant — mais `toNumber`/comparaisons implicites supposent une même échelle.
- Le point fixe suffit ici parce que les coordonnées restent **toutes petites** (|x| < 2 pour le
  plan complexe de Mandelbrot) : la mantisse ne grossit qu'avec la profondeur de zoom. Pas besoin
  d'un vrai nombre à virgule flottante arbitraire.
- `fromNumber` construit la partie fractionnaire **par paquets de 30 bits** : une mantisse double
  n'a que 53 bits exacts, il faut donc aller chercher les bits un paquet à la fois pour les
  grandes précisions.
- `toNumber` prend les ~53 bits de poids fort (`drop`) pour préserver un max de précision — à
  réserver à l'affichage / aux uniforms GPU (perd de la précision).
- Les shifts de rescale (`withPrec`, `mul`) arrondissent au plus proche (`shrRound`) plutôt que
  de tronquer : la troncature ferait dériver la précision sur de nombreux rescales.
