import type { Edge, Graph } from '../core/Graph';

/**
 * Résout un graphe électrique : écrit `current` et `voltage` sur chaque arête.
 *
 * Implémentation volontairement incrémentale (cf. ROADMAP.md, Slice 1) : on ne code que les cas
 * déjà couverts par un test avec un résultat calculé à la main. Un graphe plus complexe qu'un cas
 * déjà validé doit échouer bruyamment plutôt que produire un résultat non vérifié.
 *
 * Étape actuelle : une seule arête entre la source et le puits.
 */
function solveKirchhoffCircuit(graph: Graph, totalCurrent: number): void {
    const edges = graph.getAllEdges();

    if (edges.length === 1) {
        solveSingleEdgeCircuit(edges[0], totalCurrent);

        return;
    }

    throw new Error(
        `KirchhoffSolver ne sait résoudre que le cas d'une arête unique pour l'instant ` +
            `(${String(edges.length)} arêtes fournies). Voir ROADMAP.md, Slice 1, étape suivante.`
    );
}

/**
 * Une seule arête entre la source et le puits : par la loi des nœuds, tout le courant injecté dans
 * le circuit doit nécessairement passer par cette unique arête, puisqu'il n'existe aucun autre
 * chemin possible.
 */
function solveSingleEdgeCircuit(edge: Edge, totalCurrent: number): void {
    edge.current = totalCurrent;
    edge.voltage = totalCurrent * edge.resistance; // loi d'Ohm : V = R × I
}

export { solveKirchhoffCircuit };
