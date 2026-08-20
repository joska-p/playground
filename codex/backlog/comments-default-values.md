# Piège — documenter des valeurs par défaut en commentaire

Dans `App.tsx` (packages/automa), les JSDoc disaient "default 300/400" alors que les
vrais défauts sont dans le destructuring `rows = 300`. Dès que le destructuring change,
le commentaire devient faux (doc silencieuse).

Règle : une valeur par défaut visible dans le code ne se documente jamais — c'est une
duplication qui finit par mentir.
