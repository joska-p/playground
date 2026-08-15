# Glaze — design du pipeline de gestes (pas de "consume protocol")

Dans `src/core/gestures.ts` :

- Chaque geste (`Gesture`) reçoit **chaque** événement et décide de le gérer ou de l'ignorer.
  Un geste qui ne s'intéresse pas à l'événement ne fait rien (`onStart?.` / `onMove?.`).
- Un geste custom **remplace** le built-in (pan/zoom) au lieu de s'enchaîner dessus. Résultat :
  **pas de protocole de "consume"** — rien à marquer "déjà traité", pas d'ordre d'arrêt.
- `InputRouter` route les événements de `InputStore` vers tous les gestes, dans l'ordre.

Pourquoi : le pipeline reste trivial à comprendre et à étendre ; la logique d'intention vit dans
chaque geste, pas dans le routeur.
