# Mandelbrot — policy de référence + token "superseder" pour les requêtes in-flight

Pattern d'architecture : la **décision** de recalculer l'orbite vit dans l'app
(`reference-policy.ts`), pas dans le worker pool qui ne fait que dispatcher. Le pool est donc
"bête" et réutilisable.

`needsRecompute(view, ref, refLength, look, viewportHeightPx)` renvoie true si :

- le centre de référence a dérivé de plus de `MAX_REF_DRIFT` (0.35) de la hauteur du viewport
  (en pixels device) ;
- le zoom s'est éloigné de plus de `MAX_ZOOM_DRIFT` (2) octaves ;
- le view a besoin de plus de `MAX_ORBIT_GROWTH` (1.3×) que la longueur d'orbite stockée.

Pour annuler les requêtes périmées : `Superseder` = token monotone. `begin()` incrémente,
`isCurrent(token)` compare. Une requête qui résout après qu'une plus récente a commencé est
**droppée** (les requêtes ne sont pas réellement annulées, juste ignorées au retour).

Leçon : le pattern "token monotone" est le moyen simple de faire du "dernier arrivé gagne" avec
des promesses qu'on ne peut pas annuler (workers, aborts inexistants, etc.).
