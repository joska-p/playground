import { useRef } from 'react';
import type { CpuDraw, CpuSurface } from '../../../cpu/CpuSurface';
import type { Point2D } from '../../../core/Camera';
import type { LiveInteractionEvent } from '../../../react/interactions';
import { CpuCanvas } from '../../../react/CpuCanvas';

const NODE_RADIUS = 16;
const HIT_RADIUS = 18;

type Node = {
    id: number;
    x: number;
    y: number;
};

type Drag = {
    id: number;
    offsetX: number;
    offsetY: number;
};

const hitNode = (nodes: Node[], point: Point2D): Node | null => {
    for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        if (Math.hypot(node.x - point.x, node.y - point.y) <= HIT_RADIUS) return node;
    }
    return null;
};

const alreadyConnected = (edges: [number, number][], a: number, b: number): boolean =>
    edges.some(([from, to]) => (from === a && to === b) || (from === b && to === a));

export const nodeEditorSnippet = `import { useRef } from 'react';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import type { CpuDraw, CpuSurface } from '@repo/glaze/cpu/CpuSurface';
import type { Point2D } from '@repo/glaze/core/Camera';
import type { LiveInteractionEvent } from '@repo/glaze/react/interactions';

type Node = { id: number; x: number; y: number };

const hitNode = (nodes: Node[], p: Point2D): Node | null => {
    for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        if (node && Math.hypot(node.x - p.x, node.y - p.y) <= 18) return node;
    }
    return null;
};

function Sketch() {
    const nodes = useRef<Node[]>([]);
    const edges = useRef<[number, number][]>([]);
    const drag = useRef<{ id: number; ox: number; oy: number } | null>(null);
    const panMode = useRef(false);
    const nextId = useRef(1);

    // Attaching handlers replaces the default pan, so the middle button is
    // panned manually through the event's cameraControls.
    const onStart = ({ surface, nativeEvent }: LiveInteractionEvent<PointerEvent, CpuSurface>) => {
        if (nativeEvent.button === 1) { panMode.current = true; return; }
        if (nativeEvent.button !== 0) return;
        const hit = hitNode(nodes.current, surface.pointer);
        if (hit) {
            drag.current = { id: hit.id, ox: surface.pointer.x - hit.x, oy: surface.pointer.y - hit.y };
        } else {
            nodes.current.push({ id: nextId.current++, ...surface.pointer });
        }
    };

    const onMove = ({ surface, input, cameraControls }: LiveInteractionEvent<PointerEvent, CpuSurface>) => {
        if (panMode.current) {
            cameraControls.panBy(input.pointerDelta.x, input.pointerDelta.y);
            return;
        }
        const active = drag.current;
        if (!active) return;
        const node = nodes.current.find((n) => n.id === active.id);
        if (node) { node.x = surface.pointer.x - active.ox; node.y = surface.pointer.y - active.oy; }
    };

    const onEnd = ({ surface }: LiveInteractionEvent<PointerEvent, CpuSurface>) => {
        if (panMode.current) { panMode.current = false; return; }
        const active = drag.current;
        if (!active) return;
        const target = hitNode(nodes.current.filter((n) => n.id !== active.id), surface.pointer);
        if (target) edges.current.push([active.id, target.id]);
        drag.current = null;
    };

    const onContextMenu = ({ surface, nativeEvent }: LiveInteractionEvent<MouseEvent, CpuSurface>) => {
        nativeEvent.preventDefault();
        const hit = hitNode(nodes.current, surface.pointer);
        if (hit) nodes.current = nodes.current.filter((n) => n.id !== hit.id);
    };

    const onDraw: CpuDraw = (surface) => {
        surface.clear('#0b0e13');
        for (const [a, b] of edges.current) {
            const from = nodes.current.find((n) => n.id === a)!;
            const to = nodes.current.find((n) => n.id === b)!;
            surface.line(from.x, from.y, to.x, to.y, '#334155', 2);
        }
        for (const node of nodes.current) {
            surface
                .circle(node.x, node.y, 16, '#0e7490', '#22d3ee', 2)
                .text(String(node.id), node.x - 4, node.y + 4, '#e2e8f0', 11);
        }
    };

    return (
        <CpuCanvas
            onDraw={onDraw}
            canvasInteractions={{ onStart, onMove, onEnd, onContextMenu }}
            className="h-full w-full"
        />
    );
}`;

export function NodeEditor() {
    const nodes = useRef<Node[]>([]);
    const edges = useRef<[number, number][]>([]);
    const drag = useRef<Drag | null>(null);
    const panMode = useRef(false);
    const nextId = useRef(1);

    const onStart = ({
        surface,
        nativeEvent
    }: LiveInteractionEvent<PointerEvent, CpuSurface>): void => {
        if (nativeEvent.button === 1) {
            panMode.current = true;
            return;
        }
        if (nativeEvent.button !== 0) return;

        const hit = hitNode(nodes.current, surface.pointer);
        if (hit) {
            drag.current = {
                id: hit.id,
                offsetX: surface.pointer.x - hit.x,
                offsetY: surface.pointer.y - hit.y
            };
        } else {
            nodes.current.push({
                id: nextId.current,
                x: surface.pointer.x,
                y: surface.pointer.y
            });
            nextId.current += 1;
        }
    };

    const onMove = ({
        surface,
        input,
        cameraControls
    }: LiveInteractionEvent<PointerEvent, CpuSurface>): void => {
        if (panMode.current) {
            cameraControls.panBy(input.pointerDelta.x, input.pointerDelta.y);
            return;
        }
        const active = drag.current;
        if (!active) return;
        const node = nodes.current.find((candidate) => candidate.id === active.id);
        if (node) {
            node.x = surface.pointer.x - active.offsetX;
            node.y = surface.pointer.y - active.offsetY;
        }
    };

    const onEnd = ({ surface }: LiveInteractionEvent<PointerEvent, CpuSurface>): void => {
        if (panMode.current) {
            panMode.current = false;
            return;
        }
        const active = drag.current;
        if (!active) return;
        const target = hitNode(
            nodes.current.filter((candidate) => candidate.id !== active.id),
            surface.pointer
        );
        if (target && !alreadyConnected(edges.current, active.id, target.id)) {
            edges.current.push([active.id, target.id]);
        }
        drag.current = null;
    };

    const onContextMenu = ({
        surface,
        nativeEvent
    }: LiveInteractionEvent<MouseEvent, CpuSurface>): void => {
        nativeEvent.preventDefault();
        const hit = hitNode(nodes.current, surface.pointer);
        if (hit) {
            nodes.current = nodes.current.filter((node) => node.id !== hit.id);
            edges.current = edges.current.filter(([from, to]) => from !== hit.id && to !== hit.id);
        }
    };

    const onDraw: CpuDraw = (surface) => {
        surface.clear('#0b0e13');

        for (const [fromId, toId] of edges.current) {
            const from = nodes.current.find((node) => node.id === fromId);
            const to = nodes.current.find((node) => node.id === toId);
            if (from && to) surface.line(from.x, from.y, to.x, to.y, '#334155', 2);
        }

        const active = drag.current;
        const pointer = surface.pointer;
        if (active) {
            const dragged = nodes.current.find((node) => node.id === active.id);
            if (dragged) {
                const target = hitNode(
                    nodes.current.filter((node) => node.id !== active.id),
                    pointer
                );
                surface.line(
                    dragged.x,
                    dragged.y,
                    target ? target.x : pointer.x,
                    target ? target.y : pointer.y,
                    target ? '#22d3ee' : '#334155',
                    1.5
                );
            }
        }

        for (const node of nodes.current) {
            const isDragged = node.id === active?.id;
            surface
                .circle(
                    node.x,
                    node.y,
                    NODE_RADIUS,
                    isDragged ? '#0f766e' : '#0e7490',
                    '#22d3ee',
                    2
                )
                .text(String(node.id), node.x - 4, node.y + 4, '#e2e8f0', 11);
        }

        surface.text(
            'click to place · drag a node to move · release on another to connect · middle-drag pans · right-click deletes',
            8,
            16,
            '#64748b',
            10
        );
    };

    return (
        <CpuCanvas
            onDraw={onDraw}
            canvasInteractions={{ onStart, onMove, onEnd, onContextMenu }}
            className="h-full w-full"
        />
    );
}
