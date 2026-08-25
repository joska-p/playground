import { useRef } from 'react';

import { createCssColor, createFontSize, createPositiveNumber } from '../../../core/types';
import { CpuCanvas } from '../../../react/CpuCanvas';

import type { Point2D } from '../../../core/Camera';
import type { CpuDraw, CpuSurface } from '../../../cpu/CpuSurface';
import type { LiveInteractionEvent } from '../../../react/interactions';

const NODE_RADIUS = 16;
const HIT_RADIUS = 18;

interface Node {
    id: number;
    x: number;
    y: number;
}

interface Drag {
    id: number;
    offsetX: number;
    offsetY: number;
}

const hitNode = (nodes: Node[], point: Point2D): Node | null => {
    for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];

        if (Math.hypot(node.x - point.x, node.y - point.y) <= HIT_RADIUS) return node;
    }

    return null;
};

const alreadyConnected = (edges: [number, number][], a: number, b: number): boolean =>
    edges.some(([from, to]) => (from === a && to === b) || (from === b && to === a));

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

    const onFrame: CpuDraw = (surface) => {
        surface.clear(createCssColor('#0b0e13'));

        for (const [fromId, toId] of edges.current) {
            const from = nodes.current.find((node) => node.id === fromId);
            const to = nodes.current.find((node) => node.id === toId);

            if (from && to)
                surface.line(
                    from.x,
                    from.y,
                    to.x,
                    to.y,
                    createCssColor('#334155'),
                    createPositiveNumber(2)
                );
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
                    createCssColor(target ? '#22d3ee' : '#334155'),
                    createPositiveNumber(1.5)
                );
            }
        }

        for (const node of nodes.current) {
            const isDragged = node.id === active?.id;

            surface
                .circle(
                    node.x,
                    node.y,
                    createPositiveNumber(NODE_RADIUS),
                    createCssColor(isDragged ? '#0f766e' : '#0e7490'),
                    createCssColor('#22d3ee'),
                    createPositiveNumber(2)
                )
                .text(
                    String(node.id),
                    node.x - 4,
                    node.y + 4,
                    createCssColor('#e2e8f0'),
                    createFontSize(11)
                );
        }

        surface.text(
            'click to place · drag a node to move · release on another to connect · middle-drag pans · right-click deletes',
            8,
            16,
            createCssColor('#64748b'),
            createFontSize(10)
        );
    };

    return (
        <CpuCanvas
            onFrame={onFrame}
            canvasInteractions={{ onStart, onMove, onEnd, onContextMenu }}
            className="h-full w-full"
        />
    );
}
