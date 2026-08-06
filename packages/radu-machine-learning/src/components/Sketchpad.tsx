import { ControlGrid } from '@repo/ui/control-panel';
import { ColorSwatch } from '@repo/ui/data-display';
import { Button, Input, Label } from '@repo/ui/data-entry';
import { useEffect, useRef } from 'react';
import type { Path, Point } from '../core/types';
import {
    addPath,
    clearPaths,
    setStrokeColor,
    undoPath,
    useSketchpadPaths,
    useSketchpadStrokeColor
} from '../stores/sketchpad';

function Sketchpad() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawingRef = useRef(false);
    const currentPathRef = useRef<Path>([]);

    const paths = useSketchpadPaths();
    const strokeColor = useSketchpadStrokeColor();

    function exportPaths() {
        if (paths.length === 0) return;
        const data = JSON.stringify(paths);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'paths.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function toCanvasPosition(e: React.MouseEvent<HTMLCanvasElement>): Point {
        if (!canvasRef.current) return [0, 0];
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        return [(e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY];
    }

    function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
        const ctx = ctxRef.current;
        if (!ctx) return;

        isDrawingRef.current = true;
        const point = toCanvasPosition(e);
        currentPathRef.current = [point];

        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.moveTo(point[0], point[1]);
    }

    function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
        const ctx = ctxRef.current;
        if (!ctx || !isDrawingRef.current) return;

        const point = toCanvasPosition(e);
        ctx.lineTo(point[0], point[1]);
        ctx.stroke();
        currentPathRef.current.push(point);
    }

    function handleMouseUp() {
        if (!isDrawingRef.current || currentPathRef.current.length === 0) return;

        const completedPath = [...currentPathRef.current];
        currentPathRef.current = [];
        isDrawingRef.current = false;

        addPath(completedPath);
    }

    useEffect(() => {
        if (!canvasRef.current) return;
        ctxRef.current = canvasRef.current.getContext('2d');
    }, []);

    useEffect(() => {
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        paths.forEach((path) => {
            if (path.length === 0) return;
            ctx.beginPath();
            ctx.strokeStyle = strokeColor;
            path.forEach((point, i) => {
                if (i === 0) ctx.moveTo(point[0], point[1]);
                else ctx.lineTo(point[0], point[1]);
            });
            ctx.stroke();
        });
    }, [paths, strokeColor]);

    return (
        <div className="space-y-2">
            <ControlGrid columns={4}>
                <Label className="flex items-center gap-2">
                    <Input
                        className="sr-only"
                        type="color"
                        value={strokeColor}
                        onChange={(e) => {
                            setStrokeColor(e.target.value);
                        }}
                    />
                    <ColorSwatch
                        color={strokeColor}
                        name="color"
                        token={strokeColor}
                    />
                </Label>

                <Button
                    size="sm"
                    variant="warning"
                    onClick={undoPath}
                >
                    Undo
                </Button>

                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                        isDrawingRef.current = false;
                        currentPathRef.current = [];
                        clearPaths();
                    }}
                >
                    Clear
                </Button>

                <Button
                    size="sm"
                    variant="primary"
                    onClick={exportPaths}
                >
                    Export
                </Button>
            </ControlGrid>
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="bg-background aspect-3/2 w-full"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            ></canvas>
        </div>
    );
}

export { Sketchpad };
