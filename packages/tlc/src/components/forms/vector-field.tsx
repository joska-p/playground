import { Field } from './field';
import { NumberField } from './number-field';
import { cn } from '../../lib/cn';
import { useControllableState } from '../../lib/use-controllable-state';

/** Vecteur 2D ou 3D : la 3e coordonnée est optionnelle. */
type VectorValue = [number, number, number?];

interface VectorFieldProps {
    label: string;
    hint?: string;
    value?: VectorValue;
    defaultValue?: VectorValue;
    onChange?: (value: VectorValue) => void;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    /** Nombre d'axes affichés (2 pour un vecteur plan). */
    dimensions?: 2 | 3;
    className?: string;
    /** Nom affiché pour chaque axe ('X', 'Y', 'Z'...). */
    subLabels?: [string, string, string?];
}

function VectorField({
    label,
    hint,
    value,
    defaultValue = [0, 0],
    onChange,
    min = -Infinity,
    max = Infinity,
    step = 0.1,
    precision = 2,
    dimensions = 2,
    className,
    subLabels = ['X', 'Y', 'Z']
}: VectorFieldProps) {
    const [state, setState] = useControllableState(value, defaultValue, onChange);

    /**
     * Axes visibles = ceux qui tiennent dans `dimensions`, ont un nom, et dont la valeur existe (le
     * Z peut être absent).
     */
    const visibleAxes = subLabels.flatMap((axisLabel, index) => {
        const axisValue = state[index];

        if (index >= dimensions || !axisLabel || axisValue === undefined) return [];

        return [{ index, axisLabel, axisValue }];
    });

    const setAxis = (index: number, axisValue: number) => {
        // Le cast restaure le tuple : [...tuple] produit un simple number[]
        const next = [...state] as VectorValue;

        next[index] = axisValue;
        setState(next);
    };

    return (
        <Field
            label={label}
            hint={hint ?? 'NA'}
            className={cn('grid grid-cols-[auto_1fr] gap-3', className)}
        >
            <div className="col-span-full flex items-center gap-1">
                {visibleAxes.map(({ index, axisLabel, axisValue }) => (
                    <NumberField
                        key={index}
                        value={axisValue}
                        onChange={(value) => {
                            setAxis(index, value);
                        }}
                        min={min}
                        max={max}
                        step={step}
                        precision={precision}
                        aria-label={`${label} ${axisLabel}`}
                    />
                ))}
            </div>
        </Field>
    );
}

export { VectorField };
export type { VectorFieldProps };
