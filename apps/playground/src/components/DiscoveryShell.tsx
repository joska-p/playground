import {
    Button,
    ColorField,
    ControlGroup,
    Field,
    NumberField,
    Select,
    Slider,
    Toggle,
    VectorField
} from '@repo/tlc/components/forms';
import { Panel, PanelSection, Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';
import { CanvasRenderer } from './CanvasRenderer';
import type { ReactNode } from 'react';

/* ================================ TYPES ================================== */

/** Variante visuelle partagée par les toggles et les boutons. */
type Variant = 'default' | 'secondary' | 'accent' | 'destructive';

interface SelectOption {
    label: string;
    value: string;
}

/**
 * Props communs à tous les contrôles qui portent une valeur. `Value` est le type de cette valeur
 * (number, boolean, string...).
 */
interface Valued<Value> {
    label: string;
    hint?: string;
    /** Mode contrôlé : la valeur vient de l'état parent. */
    value?: Value;
    /** Mode non contrôlé : valeur initiale uniquement. */
    defaultValue?: Value;
    onChange?: (value: Value) => void;
}

/** Props communs aux contrôles numériques bornés. */
interface NumericBounds {
    min?: number;
    max?: number;
    step?: number;
}

// ─── Un type par contrôle : chacun ne déclare QUE ce dont il a besoin ──────

export interface SliderControl extends Valued<number>, NumericBounds {
    type: 'slider';
}

export interface NumberControl extends Valued<number>, NumericBounds {
    type: 'number';
    precision?: number;
}

export interface ColorControl extends Valued<string> {
    type: 'color';
}

export interface ToggleControl extends Valued<boolean> {
    type: 'toggle';
    variant?: Variant;
}

export interface VectorControl extends Valued<[number, number, number?]>, NumericBounds {
    type: 'vector';
    precision?: number;
    dimensions?: 2 | 3;
    subLabels?: [string, string, string?];
}

export interface SelectControl extends Valued<string> {
    type: 'select';
    options: SelectOption[];
}

/** Cas particulier : un bouton n'a pas de valeur, il déclenche une action via actionId. */
export interface ButtonControl {
    type: 'button';
    label: string;
    actionId: string;
    /** Contenu du bouton (sinon, le label est utilisé). */
    children?: ReactNode;
    variant?: Variant;
    size?: 'sm' | 'md';
}

/** Union discriminée : grâce à `type`, TypeScript devine les bons props tout seul. */
export type DiscoveryControl =
    | SliderControl
    | ToggleControl
    | NumberControl
    | ColorControl
    | VectorControl
    | SelectControl
    | ButtonControl;

/* ============================ CONFIG DU PANNEAU ========================== */

export interface DiscoverySection {
    label?: string;
    collapsible?: boolean;
    defaultOpen?: boolean;
    controls: DiscoveryControl[];
}

export interface DiscoveryPanelConfig {
    title: string;
    sections: DiscoverySection[];
}

export interface DiscoveryShellProps {
    canvasComponent: string;
    panelConfig?: DiscoveryPanelConfig;
    /**
     * Map d'identifiants d'action vers handlers. Les IDs doivent correspondre aux `actionId` des
     * ButtonControl.
     */
    actions?: Record<string, () => void>;
    canvasClassName?: string;
    panelsPosition?: 'right' | 'left';
}

/* =============================== RENDU =================================== */

/** Fonction vide partagée, évite de recréer `() => {}` partout. */
function noop() {
    return;
}

/** Rendu spécifique du vecteur : il gère son label lui-même (pas de <Field>). */
function VectorInput({ control }: { control: VectorControl }) {
    const {
        label,
        hint = '',
        min = -Infinity,
        max = Infinity,
        step = 0.1,
        precision = 2,
        dimensions = 3,
        subLabels = ['X', 'Y', 'Z'],
        value = [1, 1, 1],
        defaultValue = [1, 1, 1],
        onChange = noop
    } = control;

    return (
        <VectorField
            label={label}
            hint={hint}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            precision={precision}
            dimensions={dimensions}
            subLabels={subLabels}
        />
    );
}

/** Rendu spécifique du bouton : action via actionId, pas de <Field>. */
function ActionButton({
    control,
    onAction
}: {
    control: ButtonControl;
    onAction: (id: string) => void;
}) {
    return (
        <ControlGroup>
            <Button
                variant={control.variant ?? 'secondary'}
                size={control.size}
                onClick={() => {
                    onAction(control.actionId);
                }}
            >
                {control.children ?? control.label}
            </Button>
        </ControlGroup>
    );
}

/** Contrôles « simples » : affichés tels quels à l'intérieur d'un <Field>. */
type SimpleControl = Exclude<DiscoveryControl, ButtonControl | VectorControl>;

function SimpleInput({ control }: { control: SimpleControl }) {
    // Grâce à l'union discriminée, chaque case voit les BONS types :
    // plus aucun `as number` ou `as any` nécessaire.
    switch (control.type) {
        case 'slider': {
            const {
                min = 0,
                max = 100,
                step = 1,
                value = 1,
                defaultValue = 1,
                onChange = noop
            } = control;

            return (
                <Slider
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                />
            );
        }
        case 'number': {
            const {
                min = -Infinity,
                max = Infinity,
                step = 1,
                precision = 0,
                value = 1,
                defaultValue = 1,
                onChange = noop
            } = control;

            return (
                <NumberField
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                    precision={precision}
                />
            );
        }
        case 'color': {
            const { value = '#cccccc', defaultValue = '#cccccc', onChange = noop } = control;

            return (
                <ColorField
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                />
            );
        }
        case 'toggle': {
            const { value = false, defaultValue = false, onChange = noop, variant } = control;

            return (
                <Toggle
                    pressed={value}
                    defaultPressed={defaultValue}
                    onChange={onChange}
                    variant={variant}
                    aria-label={control.label}
                />
            );
        }
        case 'select': {
            const { options, value = 'NA', defaultValue = 'NA', onChange = noop } = control;

            return (
                <Select
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    options={options}
                />
            );
        }
    }
}

function ControlRenderer({
    control,
    onAction
}: {
    control: DiscoveryControl;
    onAction: (id: string) => void;
}) {
    // Les deux cas particuliers (pas de <Field>) sont traités en premier…
    if (control.type === 'button')
        return (
            <ActionButton
                control={control}
                onAction={onAction}
            />
        );

    if (control.type === 'vector') return <VectorInput control={control} />;

    // …tout le reste suit le même schéma : un <Field> autour de l'input.
    return (
        <Field
            label={control.label}
            hint={control.hint ?? ''}
        >
            <SimpleInput control={control} />
        </Field>
    );
}

/* ========================== COMPOSANT PRINCIPAL ========================== */

export function DiscoveryShell({
    canvasComponent,
    panelConfig,
    actions = {},
    canvasClassName,
    panelsPosition = 'right'
}: DiscoveryShellProps) {
    const handleAction = (actionId: string) => {
        const handler = actions[actionId];

        if (handler) handler();
    };

    return (
        <Shell>
            <ShellCanvas className={canvasClassName ?? ''}>
                <CanvasRenderer
                    canvasComponent={canvasComponent}
                    className="h-full w-full"
                />
            </ShellCanvas>

            <ShellPanels position={panelsPosition}>
                {panelConfig && (
                    <Panel title={panelConfig.title}>
                        {panelConfig.sections.map((section, i) => (
                            <PanelSection
                                key={i}
                                label={section.label ?? ''}
                                collapsible={section.collapsible ?? false}
                                defaultOpen={section.defaultOpen ?? true}
                            >
                                {section.controls.map((control, j) => (
                                    <ControlRenderer
                                        key={`${String(j)}-${control.label}`}
                                        control={control}
                                        onAction={handleAction}
                                    />
                                ))}
                            </PanelSection>
                        ))}
                    </Panel>
                )}
            </ShellPanels>
        </Shell>
    );
}
