import { useId, useRef, type InputHTMLAttributes } from 'react';

import { cn } from '../../lib/cn';
import { useFieldContext } from '../../lib/field-context';
import { useControllableState } from '../../lib/use-controllable-state';

interface NumberFieldProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'type'
> {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
}

function NumberField({
    value,
    defaultValue = 0,
    onChange,
    min = -Infinity,
    max = Infinity,
    step = 1,
    precision = 0,
    className,
    id: idProp,
    disabled,
    'aria-label': ariaLabel,
    ...props
}: NumberFieldProps) {
    const fallbackId = useId();
    const field = useFieldContext();
    const id = idProp ?? field?.id ?? fallbackId;
    const [state, setState] = useControllableState(value, defaultValue, onChange);

    const inputRef = useRef<HTMLInputElement>(null);

    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0, value: 0 });

    const clamp = (v: number) => Math.max(min, Math.min(max, v));
    const round = (v: number) => Number(v.toFixed(precision));

    const handleChange = (v: number) => {
        const clamped = clamp(round(v));

        setState(clamped);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
        if (e.button !== 0 || disabled) return;

        if (e.shiftKey) {
            isDragging.current = true;
            dragStart.current = { x: e.clientX, y: e.clientY, value: state };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            e.preventDefault();
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;

        const deltaY = dragStart.current.y - e.clientY;
        const multiplier = e.shiftKey ? 0.1 : 1;
        const newValue = dragStart.current.value + deltaY * step * multiplier;

        handleChange(newValue);
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value);

        if (!Number.isNaN(v)) handleChange(v);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleChange(state + (e.shiftKey ? step * 10 : step));
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            handleChange(state - (e.shiftKey ? step * 10 : step));
        }
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <input
                ref={inputRef}
                {...(props as Omit<
                    typeof props,
                    'aria-valuemax' | 'aria-valuemin' | 'aria-valuenow'
                >)}
                id={id}
                type="number"
                min={Number.isFinite(min) ? min : undefined}
                max={Number.isFinite(max) ? max : undefined}
                step={step}
                value={state}
                disabled={disabled}
                aria-label={ariaLabel}
                onChange={handleInputChange}
                onMouseDown={handleMouseDown}
                onKeyDown={handleKeyDown}
                className={cn(
                    'h-8 w-20 rounded-md border border-input bg-background px-2 text-xs font-mono text-foreground appearance-none text-right',
                    'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                    'hover:border-ring transition-colors duration-150',
                    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
                    className
                )}
            />
            <span className="text-xs text-muted-foreground font-mono tabular-nums min-w-[3ch] text-right">
                {state.toFixed(precision)}
            </span>
        </div>
    );
}

export { NumberField };
export type { NumberFieldProps };
