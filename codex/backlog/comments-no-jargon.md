# Style des commentaires : pas de jargon, phrases courtes

Feedback de l'auteur de glaze : les commentaires TSDoc ne doivent pas être trop techniques.
Le jargon GL/maths (column-major, NDC, uniformMatrix3fv...) fait tourner la tête ; cette lib
existe justement pour abstraire ce genre de complexité.

Règles de style :

- Phrases courtes, langage concret, comme si on expliquait à quelqu'un qui ne connaît pas WebGL.
- Remplacer les termes techniques par une image : "NDC" → "la boîte -1..1 que GL dessine",
  "column-major" → "l'ordre que WebGL attend, ne transpose pas".
- Si une formule mathématique est plus claire qu'un paragraphe, la garder (les maths passent mieux).
- But : le lecteur comprend l'idée en une lecture, sans connaissance préalable du domaine.
