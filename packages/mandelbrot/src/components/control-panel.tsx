import { useState } from 'react';
import { Button } from '@repo/ui/data-entry';
import { RotateCcw, SlidersHorizontal, X } from 'lucide-react';

export type LookState = {
    maxIter: number;
    colorFreq: number;
    colorOffset: number;
    lightAngle: number;
    lightHeight: number;
    glow: number;
    chroma: number;
    baseL: number;
};

type ControlPanelProps = {
    look: LookState;
    onChange: (next: LookState) => void;
    onReset: () => void;
};

type SliderRowProps = {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    format?: (v: number) => string;
    onChange: (v: number) => void;
};

function SliderRow({ label, value, min, max, step, format, onChange }: SliderRowProps) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <label className="block">
            <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-mono tabular-nums text-foreground">
                    {format ? format(value) : value}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => {
                    onChange(Number(e.target.value));
                }}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                style={{
                    background: `linear-gradient(to right, var(--primary) ${pct}%, var(--muted) ${pct}%)`
                }}
            />
        </label>
    );
}

export function ControlPanel({ look, onChange, onReset }: ControlPanelProps) {
    const [open, setOpen] = useState(true);
    const set = (patch: Partial<LookState>) => {
        onChange({ ...look, ...patch });
    };

    if (!open) {
        return (
            <Button
                variant="secondary"
                size="icon"
                onClick={() => {
                    setOpen(true);
                }}
                className="absolute right-4 top-4 z-10 backdrop-blur-md"
                aria-label="Open controls"
            >
                <SlidersHorizontal className="h-4 w-4" />
            </Button>
        );
    }

    return (
        <div className="absolute right-4 top-4 z-10 w-64 rounded-xl border border-border/60 bg-card/75 p-4 text-card-foreground shadow-xl backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Controls</h2>
                <button
                    onClick={() => {
                        setOpen(false);
                    }}
                    className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Close controls"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <div className="flex flex-col gap-3">
                <SliderRow
                    label="Iteration budget"
                    value={look.maxIter}
                    min={25}
                    max={400}
                    step={5}
                    format={(v) => `${v}%`}
                    onChange={(v) => {
                        set({ maxIter: v });
                    }}
                />
                <div className="my-1 h-px bg-border/60" />
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Color
                </p>
                <SliderRow
                    label="Cycle frequency"
                    value={look.colorFreq}
                    min={1}
                    max={40}
                    step={0.5}
                    onChange={(v) => {
                        set({ colorFreq: v });
                    }}
                />
                <SliderRow
                    label="Hue offset"
                    value={look.colorOffset}
                    min={0}
                    max={1}
                    step={0.01}
                    format={(v) => v.toFixed(2)}
                    onChange={(v) => {
                        set({ colorOffset: v });
                    }}
                />
                <SliderRow
                    label="Chroma"
                    value={look.chroma}
                    min={0}
                    max={0.35}
                    step={0.005}
                    format={(v) => v.toFixed(3)}
                    onChange={(v) => {
                        set({ chroma: v });
                    }}
                />
                <SliderRow
                    label="Lightness"
                    value={look.baseL}
                    min={0.4}
                    max={0.95}
                    step={0.01}
                    format={(v) => v.toFixed(2)}
                    onChange={(v) => {
                        set({ baseL: v });
                    }}
                />
                <div className="my-1 h-px bg-border/60" />
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Depth & light
                </p>
                <SliderRow
                    label="Light angle"
                    value={look.lightAngle}
                    min={0}
                    max={360}
                    step={1}
                    format={(v) => `${v}\u00b0`}
                    onChange={(v) => {
                        set({ lightAngle: v });
                    }}
                />
                <SliderRow
                    label="Light height"
                    value={look.lightHeight}
                    min={0.2}
                    max={3}
                    step={0.05}
                    format={(v) => v.toFixed(2)}
                    onChange={(v) => {
                        set({ lightHeight: v });
                    }}
                />
                <SliderRow
                    label="Border glow"
                    value={look.glow}
                    min={0}
                    max={1}
                    step={0.01}
                    format={(v) => v.toFixed(2)}
                    onChange={(v) => {
                        set({ glow: v });
                    }}
                />
            </div>

            <Button
                variant="secondary"
                className="mt-4 w-full"
                onClick={onReset}
            >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset view
            </Button>
        </div>
    );
}
