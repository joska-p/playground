# Landing page index dense

**Contexte :** La page d'accueil actuelle a un Hero marketing, puis des sections séparées pour les projets, notes et docs. Le brief de redesign demande un index dense et fonctionnel.

**Description :** Transformer la page d'accueil en hub fonctionnel :

- En-tête compact (nom + statut + nombre d'expériences)
- Supprimer le Hero marketing
- Grille dense de cartes SciFi (déjà existante via `ProjectsList.astro`)
- Garder notes et docs dans la même page mais en sections compactes
- Aucune section ne doit être là uniquement pour remplir l'espace

**Lien codebase :**

- `apps/playground/src/pages/index.astro`
- `apps/playground/src/components/ProjectsList.astro`

### Action Kanban

```bash
./scripts/kanban.sh idea "Landing page index" -b "Transformer la page d'accueil en hub fonctionnel dense, sans hero marketing"
```
