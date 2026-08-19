# L'utilisateur privilégie la simplicité radicale

**Corps :** L'utilisateur a une forte aversion pour le code qui "en fait trop". Il préfère :
- 2 tokens à 8 tokens
- 0 color-mix à 14 color-mix
- Des classes simples (`border-(--variant-color)/20`) à des expressions CSS complexes
- Une fonction utilitaire (`hashToColor`) à 35+ tokens statiques

Il qualifie les patterns complexes de "solitaires qui en font qu'à leur tête" et de "custom CSS qui détruit l'harmonie". C'est un signal fort pour toujours chercher la solution la plus simple.

**Exemple session :** Le nettoyage des `color-mix` — on est passé de 14 occurrences de `color-mix` dans les classes Tailwind à 0, en remplaçant par des tokens simples ou des classes utilitaires standard.

### Action Kanban

```bash
./scripts/kanban.sh observation "Simplicité radicale" -b "L'utilisateur privilégie toujours la solution la plus simple, même si elle est moins flexible"
```
