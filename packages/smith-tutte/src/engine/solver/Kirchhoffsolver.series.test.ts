import { describe, expect, it } from 'vitest';

import { Edge, Graph, Node } from '../core/Graph';
import { solveKirchhoffCircuit } from '../solver/KirchhoffSolver';

describe('KirchhoffSolver — étape 2 : deux arêtes en série', () => {
    it("fait passer le même courant dans les deux arêtes d'une chaîne source → milieu → puits", () => {
        // Calcul à la main : source --edgeA--> middle --edgeB--> sink, résistance 1 Ω chacune.
        // Le nœud "middle" n'a que ces deux arêtes pour connexions : par la loi des nœuds, tout
        // courant qui y entre doit en ressortir. Le courant est donc identique sur les deux
        // arêtes (5), et la tension de chacune vaut aussi 5 (loi d'Ohm, R = 1).
        const source = new Node('source');
        const sink = new Node('sink');
        const middle = new Node('middle');
        const graph = new Graph(source, sink);

        graph.addNode(middle);

        const edgeA = new Edge('edge-a', source, middle, 1);
        const edgeB = new Edge('edge-b', middle, sink, 1);

        graph.addEdge(edgeA);
        graph.addEdge(edgeB);

        const injectedCurrent = 5;

        solveKirchhoffCircuit(graph, injectedCurrent);

        expect(edgeA.current).toBe(5);
        expect(edgeA.voltage).toBe(5);
        expect(edgeB.current).toBe(5);
        expect(edgeB.voltage).toBe(5);
        expect(graph.isFullySolved()).toBe(true);
    });

    it("reconnaît la chaîne quelle que soit l'orientation high/low voltage des arêtes", () => {
        // La chaîne reste une chaîne même si les arêtes ne "pointent" pas toutes dans le même
        // sens topologique — highVoltageNode/lowVoltageNode encode une hypothèse de potentiel,
        // pas un ordre de traversée du graphe (cf. DECISIONS.md, ADR-003).
        const source = new Node('source');
        const sink = new Node('sink');
        const middle = new Node('middle');
        const graph = new Graph(source, sink);

        graph.addNode(middle);

        const edgeA = new Edge('edge-a', middle, source, 1); // sens inversé par rapport au test précédent
        const edgeB = new Edge('edge-b', sink, middle, 1); // idem

        graph.addEdge(edgeA);
        graph.addEdge(edgeB);

        solveKirchhoffCircuit(graph, 5);

        expect(edgeA.current).toBe(5);
        expect(edgeB.current).toBe(5);
    });

    it('ne confond pas une chaîne série avec un couple parallèle', () => {
        // Garde-fou complémentaire : formsParallelPair ne doit pas non plus s'activer par
        // erreur sur une topologie série. Si elle le faisait, ce test verrait un courant
        // fractionné (2.5/2.5) au lieu du courant identique attendu en série (5/5).
        const source = new Node('source');
        const sink = new Node('sink');
        const middle = new Node('middle');
        const graph = new Graph(source, sink);

        graph.addNode(middle);

        const edgeA = new Edge('edge-a', source, middle, 1);
        const edgeB = new Edge('edge-b', middle, sink, 1);

        graph.addEdge(edgeA);
        graph.addEdge(edgeB);

        solveKirchhoffCircuit(graph, 5);

        expect(edgeA.current).toBe(5);
        expect(edgeB.current).toBe(5);
    });
});
