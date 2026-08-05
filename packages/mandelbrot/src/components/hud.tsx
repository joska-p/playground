import { formatMagnification } from '../lib/mandelbrot/view';

type HudProps = {
        zoom: number;
        cx: number;
        cy: number;
        maxIter: number;
        computing: boolean;
};

export function Hud({ zoom, cx, cy, maxIter, computing }: HudProps) {
        return (
                <div className="pointer-events-none absolute left-4 top-4 z-10 select-none rounded-lg border border-border/60 bg-card/70 px-4 py-3 font-mono text-xs text-card-foreground shadow-lg backdrop-blur-md">
                        <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">zoom</span>
                                <span className="tabular-nums text-foreground">
                                        {formatMagnification(zoom)}
                                </span>
                                {computing && (
                                        <span className="ml-1 inline-flex items-center gap-1 text-primary">
                                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                                                ref
                                        </span>
                                )}
                        </div>
                        <div className="mt-1 grid grid-cols-[auto_1fr] gap-x-2 text-muted-foreground">
                                <span>re</span>
                                <span className="tabular-nums text-foreground/90">
                                        {cx.toPrecision(15)}
                                </span>
                                <span>im</span>
                                <span className="tabular-nums text-foreground/90">
                                        {cy.toPrecision(15)}
                                </span>
                                <span>iter</span>
                                <span className="tabular-nums text-foreground/90">{maxIter}</span>
                        </div>
                </div>
        );
}
