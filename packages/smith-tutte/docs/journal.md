# Journal — Tutte & Smith

> Ce fichier est le récit du projet : le pourquoi, les doutes, les pivots.
> Il ne contient jamais de détails d'implémentation — pour ça, voir `ARCHITECTURE.md`,
> `DECISIONS.md` et `ROADMAP.md`.

Références :

- YouTube - Explication visuelle : https://www.youtube.com/watch?v=0fH80JF2mDM
- 10print.org : https://10print.org

---

## Entrée 1 — Prémices et intention

### La scène déclencheuse

Le projet naît de la rencontre entre deux objets mathématiques en apparence indépendants.

- Le diagramme de Smith. Un outil RF pour l'adaptation d'impédance via des cercles d'isomodule et d'isoréactance.
- La quadrature du carré. Le pavage d'un carré par des carrés tous de tailles différentes.

Le point de jonction réside dans l'histoire de la résolution de la quadrature du carré par Brooks, Smith, Stone et Tutte dans les années 1930. Ils y sont parvenus via une analogie exacte avec un réseau électrique parfait, utilisant les diagrammes d'impédance et de potentiel de Smith-Tutte.

### L'envie exprimée

Créer un outil de visualisation interactive côte à côte pour observer en temps réel deux choses : d'un côté le pavage géométrique (le carré rempli de carrés), de l'autre le réseau électrique dual (le schéma de circuits avec ses lignes de potentiel et ses branches de courant).

### Le postulat de travail

Focus ingénierie et modélisation, pas interface. L'abstraction, la logique et les algorithmes priment sur l'UI finale. Liberté technique totale sur la stack (React 19, TypeScript, Zustand, canvas maison).

---

## Entrée 2 — Le pivot objet

En relisant les premiers niveaux de réflexion, le besoin d'une structure plus stricte est apparu. L'approche par fonctions éparpillées ne tenait pas la route face à la complexité de l'état du graphe.

Décision prise : séparer strictement l'API (qui manipule des concepts mathématiques) de l'interface (qui manipule des pixels). L'API ne sait pas qu'un canvas existe. Voir `DECISIONS.md` pour le détail de ce choix.

---

## Entrée 3 — L'emballement et la pause

On a la vision. On a le scaffold. On s'est emballés — mutations, solveurs, DSL, projection de surfaces quelconques. Et là, constat : pas de roadmap à jour. Le découpage en phases fait plus tôt est devenu caduc après le pivot objet.

Les responsabilités sont claires, les dossiers sont nommés, l'architecture est posée. Mais on ne sait plus par où commencer concrètement. Tout ça reste abstrait.

**Décision : on s'arrête.** Il faut formaliser les interfaces entre les classes avant de coder quoi que ce soit — d'où la remise à plat en plusieurs documents séparés (celui-ci compris).
