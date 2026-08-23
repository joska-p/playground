import { describe, expect, it } from 'vitest';

import { Edge, Graph, Node } from '../core/Graph';
import { solveKirchhoffCircuit } from '../solver/KirchhoffSolver';

describe('KirchhoffSolver — étape 1 : arête unique', () => {
    it("fait passer tout le courant injecté dans l'unique arête disponible", () => {
        // Calcul à la main : source --edge--> sink, une seule arête, résistance 1 Ω.
        // Aucun autre chemin n'existe : par la loi des nœuds, le courant qui sort de la
        // source (5) doit intégralement traverser cette arête. Par la loi d'Ohm (R = 1),
        // la tension à ses bornes vaut donc aussi 5.
        const source = new Node('source');
        const sink = new Node('sink');
        const graph = new Graph(source, sink);

        const onlyEdge = new Edge('edge-1', source, sink, 1);

        graph.addEdge(onlyEdge);

        const injectedCurrent = 5;

        solveKirchhoffCircuit(graph, injectedCurrent);

        expect(onlyEdge.current).toBe(5);
        expect(onlyEdge.voltage).toBe(5);
        expect(graph.isFullySolved()).toBe(true);
    });

    it('refuse de deviner un résultat pour un graphe pas encore supporté', () => {
        // Garde-fou volontaire : tant que le cas "deux arêtes" n'a pas son propre test
        // avec un résultat calculé à la main, le solveur ne doit jamais produire de
        // chiffre non vérifié pour ce cas.
        const source = new Node('source');
        const sink = new Node('sink');
        const middle = new Node('middle');
        const graph = new Graph(source, sink);

        graph.addNode(middle);
        graph.addEdge(new Edge('edge-1', source, middle, 1));
        graph.addEdge(new Edge('edge-2', middle, sink, 1));

        expect(() => {
            solveKirchhoffCircuit(graph, 5);
        }).toThrow();
    });
});
