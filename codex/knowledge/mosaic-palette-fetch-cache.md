# Fetch palettes : frontière validée + cache + fallback

- Les données externes passent un schéma zod avant usage (`z.array(z.array(z.string().min(3).max(9).startsWith('#')).min(5)).min(1)`), via `fetchWithValidation` (helper générique fetch + schema.parse).
- Cache localStorage : `version` (CACHE_VERSION = 2, à bumper si la forme change) + expiration 7 jours. `isCacheValid` exige les deux.
- `JSON.parse` en try/catch : cache corrompu ⇒ null ⇒ refetch.
- Erreur quelconque (réseau, schéma) ⇒ `console.error` + fallback sur `initialPalette` : l'app reste utilisable hors-ligne.
- `isPalettesLoading` initialisé à `true` dans le store (masque le 1er chargement).
