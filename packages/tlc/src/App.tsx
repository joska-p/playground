import {
    Button,
    ColorField,
    ControlGroup,
    Field,
    Slider,
    Toggle
} from '@repo/tlc/components/forms';
import { Panel, PanelSection, Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';
import {
    CircuitVisual,
    ConstellationVisual,
    ContourVisual,
    GlyphVisual,
    LatticeVisual,
    OrbitVisual,
    RadarVisual,
    SpectrumVisual,
    WeaveVisual
} from './visuals';

const visualComponents = [
    CircuitVisual,
    ConstellationVisual,
    ContourVisual,
    GlyphVisual,
    LatticeVisual,
    OrbitVisual,
    RadarVisual,
    SpectrumVisual,
    WeaveVisual
] as const;

const SEED = 'playground';

function App() {
    return (
        <Shell>
            <ShellCanvas>
                <div className="flex flex-wrap items-center justify-center gap-8 h-full text-muted-foreground text-sm relative overflow-y-auto">
                    {visualComponents.map((Visual, i) => (
                        <div
                            key={i}
                            className="w-100 h-100"
                        >
                            <Visual seed={SEED} />
                        </div>
                    ))}
                </div>
            </ShellCanvas>

            <ShellPanels>
                <Panel title="Controls">
                    <PanelSection label="Parameters">
                        <ControlGroup>
                            <Field
                                label="Tile Size"
                                hint="px"
                            >
                                <Slider
                                    defaultValue={64}
                                    min={32}
                                    max={256}
                                    step={2}
                                />
                            </Field>

                            <Field
                                label="Gap Size"
                                hint="px"
                            >
                                <Slider
                                    defaultValue={0}
                                    min={0}
                                    max={64}
                                    step={2}
                                />
                            </Field>

                            <Field label="Rotation">
                                <Toggle
                                    defaultPressed
                                    aria-label="Rotation"
                                />
                            </Field>

                            <Field label="Accent Color">
                                <ColorField defaultValue="#fe8019" />
                            </Field>

                            <div className="flex gap-2 pt-1">
                                <Button
                                    variant="primary"
                                    size="sm"
                                >
                                    Shuffle
                                </Button>
                                <Button
                                    variant="default"
                                    size="sm"
                                >
                                    Reset
                                </Button>
                            </div>
                        </ControlGroup>
                    </PanelSection>
                </Panel>
            </ShellPanels>
        </Shell>
    );
}

export { App };
