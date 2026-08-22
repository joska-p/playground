# Décisions — Tutte & Smith

> Format ADR (Architecture Decision Record) : une entrée courte par décision structurante.
> Contexte → décision → alternatives écartées → conséquences.
> On n'efface jamais une entrée, même obsolète : on en ajoute une nouvelle qui la remplace.

---

## ADR-001 — Génération procédurale via Kirchhoff plutôt que saisie manuelle

**Contexte.** Il fallait un moyen de produire des graphes planaires riches et asymétriques sans coder des mutations à la main.

**Décision.** Adopter la méthode historique de Brooks, Smith, Stone et Tutte (1936) : partir du pont de Wheatstone comme brique minimale, résoudre par les lois de Kirchhoff (résistances unitaires), et dériver la géométrie des courants obtenus.

**Alternatives écartées.** Dessin manuel de la géométrie ; langage de description statique sans moteur de résolution.

**Conséquences.** Le pavage devient une conséquence calculée de la topologie, jamais dessinée directement. Toute la complexité se déplace vers le solveur linéaire et le générateur de graphes.

---

## ADR-002 — Séparation stricte API / interface (pivot objet)

**Contexte.** L'approche par fonctions éparpillées ne tenait plus face à la complexité de l'état du graphe, à mesure que le projet gagnait en ambition (mutations, DSL, projection de surfaces).

**Décision.** Passer à une approche orientée objet. L'API expose des classes (`Graph`, `KirchhoffSolver`, `SquareLayout`) derrière une façade `Engine`. L'interface ne connaît que cet `Engine` ; l'API ne connaît jamais l'existence d'un canvas.

**Alternatives écartées.** Continuer avec des fonctions pures indépendantes et un état partagé implicite.

**Conséquences.** Nécessite de formaliser les interfaces entre classes avant de coder (cf. `ROADMAP.md`). La roadmap définie avant ce pivot (phases 1-3) est à réviser.

---

## ADR-003 — Syntaxe netlist retenue, DSL textuel repoussé

**Contexte.** Trois familles de syntaxe DSL ont été comparées pour décrire les graphes de départ : netlist (type SPICE), slicing tree, hybride déclaratif.

**Statut : tranché.**

**Décision.** Retenir la structure netlist (nœuds + arêtes + résistances), pour deux raisons structurelles, pas seulement de goût :

- Le slicing tree est **incompatible** avec le moteur : le pont de Wheatstone, brique générative de base, n'est justement pas découpable en guillotine — c'est ce qui casse la symétrie. Un DSL en slicing tree ne peut donc pas décrire le graphe le plus fondamental du système.
- L'hybride laisse l'utilisateur déclarer des potentiels (`V_max = [...]`) que le solveur de Kirchhoff calcule lui-même à partir de la topologie. Deux sources possibles pour la même donnée = risque de contradiction. Une entrée doit décrire la topologie, jamais anticiper le résultat du solveur.

Le netlist correspond en outre exactement au modèle interne (`Graph.ts` = nœuds + arêtes + résistances) : zéro traduction, zéro risque d'incohérence.

**Décision complémentaire : pas de parseur textuel pour l'instant.** Tant qu'on n'a pas 3-4 graphes réels à décrire (pont, Duijvestijn21, un cas non-guillotine), un constructeur fluent en TypeScript (`new Graph().addEdge(...)`) fait déjà office de netlist, sans Lexer ni Parser à écrire. Le vrai DSL textuel (`src/dsl/`) est repoussé à après le vertical slice (cf. `ROADMAP.md`), pour être conçu sur des besoins réels plutôt que devinés dans l'abstrait.

**Alternatives écartées.** Slicing tree (incompatible avec le pont de Wheatstone) ; hybride déclaratif (double source de vérité avec le solveur) ; écrire le Lexer/Parser dès maintenant (prématuré sans cas d'usage réels).

---

## ADR-004 — Génération de maillage hors périmètre : import, pas de génération

**Contexte.** La projection de surfaces (Level 2) suppose un maillage fermé de départ (sphère, cube, icosaèdre...). Générer ce maillage soi-même (subdivision, garantie de genre 0, triangulation propre) est un problème à part entière, déjà bien couvert par des outils matures comme Blender.

**Décision.** L'API topologie ne génère pas de maillage. Elle **importe** un maillage produit ailleurs (export Blender ou autre) et se limite à : couper en un point choisi, aplatir en graphe planaire. Pas de `ClosedMesh.ts` générateur — à la place, un importeur de format de maillage standard.

**Alternatives écartées.** Écrire un générateur de maillage maison (subdivision de primitives, garanties topologiques) — hors sujet du projet, effort disproportionné par rapport à l'objectif (dualité pavage/circuit).

**Conséquences.** Le module reste indépendant du moteur électrique (cf. séparation topology/engine), mais son entrée devient un fichier de maillage importé plutôt qu'un maillage généré en interne. Ce chantier reste de toute façon repoussé après le vertical slice historique (ADR-003, ROADMAP.md) : la priorité immédiate est le système historique (pont de Wheatstone), pas la projection de surfaces.
