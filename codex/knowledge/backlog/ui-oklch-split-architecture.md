# Thème OKLCH — canaux L/C/H splités pour animer en JS (ui)

`styles/gruvbox-theme-subdivided.css` : le thème « breathing UI » anime les couleurs en JS à 60fps.

- OKLCH est perceptuellement uniforme → tourner la teinte (H) garde la luminosité constante,
  contrairement à HSL/RGB (un jaune pur paraît bien plus lumineux qu'un bleu pur à « Lightness »
  égale). Idéal pour des dérives de couleurs organiques.
- Pour animer, on ne réécrit JAMAIS des strings complètes `oklch(0.7 0.1 200)` par frame (lent à
  parser). On split en `--primary-l / --primary-c / --primary-h` et le JS ne touche qu'un seul
  nombre brut ; le token se reconstruit via `--primary: oklch(var(--primary-l) var(--primary-c) var(--primary-h))`.
- Single source of truth : un seul bloc BASE PALETTE contient les triplets numériques réels.
  Chaque token sémantique (`--primary`, `--tags-*`, …) est un pur alias `var()` vers un canal du
  bloc base → retuner `--blue-h` propage partout. On peut toujours « délier » un token en le
  réécrivant directement en JS (`element.style.setProperty`), il écrase l'alias.

Leçon générale : pour des couleurs animées, splitter les canaux dans des var CSS dédiées plutôt
que de ré-assigner une couleur entière.
