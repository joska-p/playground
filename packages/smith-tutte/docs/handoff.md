# Handoff — Tutte & Smith

> À lire en premier au démarrage d'une nouvelle session. Donne le contexte minimal
> pour reprendre sans tout relire. Les fichiers référencés (`JOURNAL.md`, `ARCHITECTURE.md`,
> `DECISIONS.md`, `ROADMAP.md`) restent les sources de vérité détaillées — celui-ci n'est
> qu'un résumé de navigation.

## En une phrase

Outil de visualisation qui génère des pavages de carrés parfaits ("squared squares") à partir
de la méthode historique de Brooks-Smith-Stone-Tutte (1936) : un graphe électrique résolu par
les lois de Kirchhoff donne directement la géométrie du pavage.

## Où on en est là, maintenant

**En cours d'implémentation, rien n'est encore testé de bout en bout.**

- `Graph.ts` est écrit (classes `Node`, `Edge`, `Graph` — voir plus bas, code complet inclus).
- Prochaine étape immédiate : coder le solveur de Kirchhoff (`KirchhoffSolver`) et le valider
  sur une progression de graphes de complexité croissante, en partant d'un **squared rectangle**
  (pas encore le squared square / pont de Wheatstone — trop tôt, pas encore de résultat validé).
- Stratégie choisie : **vertical slice**, pas de phases horizontales. Voir `ROADMAP.md`.

## Les 4 documents et leur rôle (ne pas les mélanger)

| Fichier           | Rôle                                          | Se met à jour                                                                            |
| ----------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `JOURNAL.md`      | Récit : pourquoi, doutes, pivots              | En continu, jamais obsolète (c'est un journal)                                           |
| `ARCHITECTURE.md` | État du système **existant**                  | ⚠️ Hypothèse tant que rien n'est codé — mettre à jour **après** avoir codé, jamais avant |
| `DECISIONS.md`    | ADR — décisions actées, alternatives écartées | Dès qu'une décision structurante est prise                                               |
| `ROADMAP.md`      | Plan d'exécution vivant                       | Dès que la stratégie ou les tâches changent                                              |

## Décisions déjà actées (ne pas rouvrir sans raison)

- **ADR-001** — Génération procédurale via Kirchhoff, pas de dessin manuel.
- **ADR-002** — Pivot objet : API en classes (`Graph`, `KirchhoffSolver`, `SquareLayout`) derrière
  une façade `Engine`. L'API ignore l'existence d'un canvas.
- **ADR-003** — DSL : syntaxe netlist retenue (pas slicing tree, pas hybride). Pas de parseur textuel
  pour l'instant — un constructeur fluent TypeScript (`new Graph(...)`) suffit tant qu'on n'a pas
  3-4 graphes réels à décrire.
- **ADR-004** — Projection de surfaces (mesh) hors périmètre immédiat. Si on y revient : **import**
  d'un maillage (Blender ou autre), jamais de génération de maillage en interne. Piste technique
  notée : plongement de Tutte (spring embedding), nécessite un graphe 3-connexe.

## Méthode de travail adoptée pendant cette session (à reproduire)

- **Vertical slice plutôt que phases horizontales** : viser un visuel à l'écran vite, quitte à
  ce que chaque couche soit minimale au début.
- **Progression de graphes de complexité croissante pour valider le solveur**, chacun isolant
  une source d'erreur possible :
    1. Une seule arête (trivial, valide le pipeline de bout en bout).
    2. Deux arêtes en série (valide l'addition de tensions).
    3. Deux arêtes en parallèle (valide la loi des nœuds).
    4. **Squared rectangle** simple (étape actuelle visée — moins contraint qu'un squared square,
       bon échauffement avant le pont de Wheatstone).
    5. Pont de Wheatstone / squared square (premier cas non devinable à l'œil, comparer à un
       résultat connu de la littérature, ex. Duijvestijn21).
- Chaque étape = un test unitaire avec un résultat **calculé à la main**, jamais une validation
  "à l'œil".
- Naming façon Clean Code : les noms de champs portent l'intention et évitent la désinformation
  (ex. `highVoltageNode`/`lowVoltageNode` plutôt que `from`/`to`, qui suggérerait une direction
  de flux au lieu d'une hypothèse de potentiel à vérifier).

## Code actuel : `Graph.ts`

```typescript
type NodeId = string;

class Node {
    public readonly id: NodeId;

    constructor(id: NodeId) {
        this.id = id;
    }
}

class Edge {
    /**
     * `null` tant que le solveur n'a pas tourné.
     *
     * Un courant nul est un résultat physiquement valide. Il ne faut donc pas utiliser `0` pour
     * représenter "pas encore calculé".
     */
    public current: number | null = null;
    public voltage: number | null = null;

    public readonly id: string;
    public readonly highVoltageNode: Node;
    public readonly lowVoltageNode: Node;
    public readonly resistance: number;

    constructor(id: string, highVoltageNode: Node, lowVoltageNode: Node, resistance = 1) {
        this.id = id;
        this.highVoltageNode = highVoltageNode;
        this.lowVoltageNode = lowVoltageNode;
        this.resistance = resistance;
    }

    hasBeenSolved(): boolean {
        return this.current !== null;
    }
}

class Graph {
    private readonly nodesById = new Map<NodeId, Node>();
    private readonly edgesById = new Map<string, Edge>();

    public readonly sourceNode: Node;
    public readonly sinkNode: Node;

    constructor(sourceNode: Node, sinkNode: Node) {
        this.sourceNode = sourceNode;
        this.sinkNode = sinkNode;

        this.addNode(sourceNode);
        this.addNode(sinkNode);
    }

    addNode(node: Node): void {
        this.nodesById.set(node.id, node);
    }

    addEdge(edge: Edge): void {
        this.edgesById.set(edge.id, edge);
    }

    getAllNodes(): Node[] {
        return [...this.nodesById.values()];
    }

    getAllEdges(): Edge[] {
        return [...this.edgesById.values()];
    }

    isFullySolved(): boolean {
        return this.getAllEdges().every((edge) => edge.hasBeenSolved());
    }
}

export { Node, Edge, Graph };
export type { NodeId };
```

## Prochaine action concrète

Écrire `KirchhoffSolver`, en commençant par le cas le plus simple (une seule arête) avant de
passer au squared rectangle. Pas de DSL, pas de mesh, pas de projection de surfaces avant que
ça tourne.
