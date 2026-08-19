# Rescoping en cours de session

**Corps :** L'utilisateur a rescopé le brief de redesign en cours de session. Le brief initial était ambitieux (3 variantes visuelles, thème paramétrique, etc.). Après exploration de la codebase, il a décidé de :
- Pas de variantes de thème (juste light/dark)
- Pas de touching aux packages existants
- Juste uniformiser et simplifier les composants UI

C'est un pattern fréquent : le brief initial est un idéal, puis la réalité de la codebase pousse à simplifier. Il faut toujours challenger le scope initial avec l'utilisateur.

**Exemple session :** Le brief mentionnait "Gruvbox Lab", "Neon Control", "Organic Algorithms" comme variantes. L'utilisateur a dit : "pas de theme variant. juste light and dark."

### Action Kanban

```bash
./scripts/kanban.sh observation "Rescoping fréquent" -b "Le brief initial est souvent trop ambitieux — challenger le scope avec l'utilisateur après exploration de la codebase"
```
