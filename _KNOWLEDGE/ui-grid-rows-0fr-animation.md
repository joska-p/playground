# Collapse de hauteur animé via grid-template-rows 0fr → 1fr (ui)

`ControlConditional` replie une liste de `ControlRow` selon `when` (ex. révéler « noise seed »
seulement si « noise » est activé). L'animation de repli :

```css
grid-template-rows: 0fr → 1fr; /* avec un enfant overflow-hidden */
```

Avantages vs un `display:none` ou un `max-height` approché :

- c'est une transition CSS pure → pas de mesure JS, pas de layout jump ;
- la hauteur du contenu (pas seulement son opacité) retombe vraiment à zéro.

Leçon : le pattern `0fr → 1fr` sur `grid-template-rows` (avec `overflow-hidden` sur l'enfant) est
le moyen le plus simple d'animer un collapse/expand en hauteur inconnue.
