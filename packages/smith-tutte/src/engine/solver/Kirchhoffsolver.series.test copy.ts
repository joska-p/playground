import { describe, expect, it } from 'vitest';

import { Edge, Graph, Node } from '../core/Graph';
import { solveKirchhoffCircuit } from '../solver/KirchhoffSolver';

describe('KirchhoffSolver — étape 3 : deux arêtes en parallèle', () => {
    it('partage le courant à égalité entre deux arêtes parallèles de même résistance', () => {
        // Calcul à la main : source --edgeA--> sink et source --edgeB--> sink, résistance
        // 1 Ω chacune. Les deux arêtes relient exactement les deux mêmes nœuds : elles ont
        // donc forcément la même tension à leurs bornes (loi des mailles). Avec des
        // résistances égales, même tension implique même courant : le courant total (5) se
        // répartit à parts égales, soit 2.5 dans chaque arête.
        const source = new Node('source');
        const sink = new Node('sink');
        const graph = new Graph(source, sink);

        const edgeA = new Edge('edge-a', source, sink, 1);
        const edgeB = new Edge('edge-b', source, sink, 1);

        graph.addEdge(edgeA);
        graph.addEdge(edgeB);

        const injectedCurrent = 5;

        solveKirchhoffCircuit(graph, injectedCurrent);

        expect(edgeA.current).toBe(2.5);
        expect(edgeA.voltage).toBe(2.5);
        expect(edgeB.current).toBe(2.5);
        expect(edgeB.voltage).toBe(2.5);
        expect(graph.isFullySolved()).toBe(true);
    });

    it('répartit le courant proportionnellement à la conductance quand les résistances diffèrent', () => {
        // Calcul à la main : edgeA a une résistance de 1 Ω, edgeB de 4 Ω.
        // Résistance équivalente : R_eq = (R_a × R_b) / (R_a + R_b) = (1 × 4) / 5 = 0.8 Ω.
        // Tension commune aux deux arêtes : V = I_total × R_eq = 5 × 0.8 = 4.
        // Courant de chaque arête (loi d'Ohm, I = V / R) : edgeA = 4 / 1 = 4, edgeB = 4 / 4 = 1.
        // Vérification : 4 + 1 = 5 = courant total injecté. ✓
        const source = new Node('source');
        const sink = new Node('sink');
        const graph = new Graph(source, sink);

        const edgeA = new Edge('edge-a', source, sink, 1);
        const edgeB = new Edge('edge-b', source, sink, 4);

        graph.addEdge(edgeA);
        graph.addEdge(edgeB);

        solveKirchhoffCircuit(graph, 5);

        expect(edgeA.current).toBe(4);
        expect(edgeB.current).toBe(1);
        expect(edgeA.voltage).toBe(4);
        expect(edgeB.voltage).toBe(4); // même tension aux bornes, comme attendu du parallèle
    });

    it("reconnaît le couple parallèle quelle que soit l'orientation high/low voltage des arêtes", () => {
        const source = new Node('source');
        const sink = new Node('sink');
        const graph = new Graph(source, sink);

        const edgeA = new Edge('edge-a', sink, source, 1); // sens inversé
        const edgeB = new Edge('edge-b', source, sink, 1);

        graph.addEdge(edgeA);
        graph.addEdge(edgeB);

        solveKirchhoffCircuit(graph, 5);

        expect(edgeA.current).toBe(2.5);
        expect(edgeB.current).toBe(2.5);
    });

    it('refuse de deviner un résultat pour trois arêtes en parallèle (cas pas encore couvert)', () => {
        // Garde-fou volontaire : formsParallelPair ne traite que des paires (2 arêtes).
        // Trois arêtes parallèles n'ont pas encore de test avec résultat calculé à la
        // main, donc pas encore le droit d'être résolues.
        const source = new Node('source');
        const sink = new Node('sink');
        const graph = new Graph(source, sink);

        graph.addEdge(new Edge('edge-a', source, sink, 1));
        graph.addEdge(new Edge('edge-b', source, sink, 1));
        graph.addEdge(new Edge('edge-c', source, sink, 1));

        expect(() => {
            solveKirchhoffCircuit(graph, 5);
        }).toThrow();
    });
});
