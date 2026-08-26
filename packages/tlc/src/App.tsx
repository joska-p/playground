import {
    Button,
    ColorField,
    ControlGroup,
    Field,
    Slider,
    Toggle,
} from "@repo/tlc/controls";
import { Panel, PanelSection, Shell, ShellCanvas, ShellPanels } from "@repo/tlc/layout";

function App() {
    return (
        <Shell>
            <ShellCanvas>
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    Canvas
                </div>
            </ShellCanvas>

            <ShellPanels>
                <Panel title="Controls">
                    <PanelSection label="Parameters">
                        <ControlGroup>
                            <Field label="Tile Size" hint="px">
                                <Slider
                                    defaultValue={64}
                                    min={32}
                                    max={256}
                                    step={2}
                                />
                            </Field>

                            <Field label="Gap Size" hint="px">
                                <Slider
                                    defaultValue={0}
                                    min={0}
                                    max={64}
                                    step={2}
                                />
                            </Field>

                            <Field label="Rotation">
                                <Toggle defaultPressed aria-label="Rotation" />
                            </Field>

                            <Field label="Accent Color">
                                <ColorField defaultValue="#fe8019" />
                            </Field>

                            <div className="flex gap-2 pt-1">
                                <Button variant="primary" size="sm">
                                    Shuffle
                                </Button>
                                <Button variant="default" size="sm">
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
