# La dernière tuile ne peut pas être retirée

`toggleTileInSet` fait un `return` silencieux si on retire l'unique tuile du set.

Conséquence d'un set vide : `computeInitialTiles` → `getRandom(tileSet)` → throw "Cannot get random item from empty array" pendant `regenerateTiles` (non géré). Le guard rend l'état "set vide" impossible au lieu de gérer le cas. À rapprocher de getRandom qui throw au lieu de renvoyer undefined.
