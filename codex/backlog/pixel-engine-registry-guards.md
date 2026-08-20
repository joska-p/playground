# Design — Registry : erreurs vs avertissement

`Registry` (packages/pixel-engine/src/registry.ts) applique des garde-fous à l'enregistrement :

- `id` vide → throw (sans id, impossible de référencer la manipulation dans un step).
- `radius < 0` sur une manipulation neighborhood → throw (un rayon négatif n'a pas de sens).
- doublon d'`id` → **warning seulement**, pas d'erreur : c'est voulu, ça permet de surcharger une
  manipulation built-in (ex. remplacer `boxBlur` par une version custom avec le même id).
- `get()` sur un id inconnu → throw, pour échouer tôt plutôt que de propager `undefined`.

Leçon : quand un état est entièrement construit avant usage (toutes les manipulations enregistrées au
démarrage), valider à l'insertion coûte presque rien et évite des erreurs au milieu d'un run.
