import {
  ControlConditional,
  ControlGrid,
  ControlPanel,
  ControlRow,
  ControlSection,
  ControlSubsection
} from '../../components/control-panel';
import type { ControlPanelVariants } from '../../components/control-panel/variants';
import { Switch } from '../../components/data-entry';
import { DemoSection } from '../layout/DemoSection';

// Define the type for the variant key specifically
type VariantKey = NonNullable<ControlPanelVariants['variant']>;
const variants: { variant: VariantKey; label: string }[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'primary', label: 'Primary' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'accent', label: 'Accent' },
  { variant: 'warning', label: 'Warning' },
  { variant: 'destructive', label: 'Destructive' },
  { variant: 'ghost', label: 'Ghost' }
];

export function ControlPanelDemo() {
  return (
    <DemoSection
      id="component-controlpanel"
      title="ControlPanel"
      intro="Responsive collapsible control panel with rich nested controls and color variants."
      code={`<ControlPanel title="Parameters" position="right" variant="primary">
  <ControlSection title="Display">
    <ControlRow label="Fullscreen">
      <Switch defaultChecked />
    </ControlRow>
  </ControlSection>
</ControlPanel>`}
    >
      <div className="space-y-12">
        {/* Variants Showcase */}
        <div>
          <p className="text-muted-foreground mb-4 text-sm font-medium">All Color Variants</p>
          <div className="grid grid-cols-1 gap-6">
            {variants.map(({ variant, label }) => (
              <div
                key={variant}
                className="border-border relative h-96 overflow-hidden rounded-lg border"
              >
                <p className="text-muted-foreground absolute top-3 left-3 z-10 text-xs">{label}</p>
                <ControlPanel
                  title={label}
                  size="md"
                  position="right"
                  variant={variant}
                >
                  <ControlSection
                    title="Basic Controls"
                    defaultOpen
                  >
                    <ControlRow label="Enabled">
                      <Switch defaultChecked />
                    </ControlRow>
                    <ControlRow label="VSync">
                      <Switch variant="accent" />
                    </ControlRow>
                  </ControlSection>

                  <ControlSection title="Advanced Settings">
                    <ControlSubsection title="Layout">
                      <ControlRow label="Grid Snap">
                        <Switch defaultChecked />
                      </ControlRow>
                    </ControlSubsection>
                    <ControlGrid columns={2}>
                      <ControlRow label="Width">
                        <Switch />
                      </ControlRow>
                      <ControlRow label="Height">
                        <Switch defaultChecked />
                      </ControlRow>
                    </ControlGrid>
                  </ControlSection>
                </ControlPanel>
              </div>
            ))}
          </div>
        </div>

        {/* Complex Layout Example */}
        <div>
          <p className="text-muted-foreground mb-4 text-sm font-medium">
            Complex Nested Layout (with scroll test)
          </p>
          <div className="border-border relative h-[520px] overflow-hidden rounded-lg border">
            <ControlPanel
              title="Full Control Panel"
              size="lg"
              position="left"
              variant="primary"
            >
              <ControlSection
                title="Display"
                defaultOpen
              >
                <ControlRow label="Fullscreen Mode">
                  <Switch defaultChecked />
                </ControlRow>
                <ControlRow label="Show Grid">
                  <Switch defaultChecked />
                </ControlRow>
                <ControlRow label="Dark Theme">
                  <Switch />
                </ControlRow>
              </ControlSection>

              <ControlSection
                title="Performance"
                defaultOpen
              >
                <ControlRow label="VSync">
                  <Switch
                    variant="accent"
                    defaultChecked
                  />
                </ControlRow>
                <ControlRow label="Motion Blur">
                  <Switch />
                </ControlRow>
                <ControlConditional when={true}>
                  <ControlRow label="High Quality">
                    <Switch defaultChecked />
                  </ControlRow>
                </ControlConditional>
              </ControlSection>

              <ControlSection
                title="Transform"
                defaultOpen
              >
                <ControlSubsection title="Position">
                  <ControlGrid columns={2}>
                    <ControlRow label="X">
                      <Switch />
                    </ControlRow>
                    <ControlRow label="Y">
                      <Switch defaultChecked />
                    </ControlRow>
                  </ControlGrid>
                </ControlSubsection>
                <ControlSubsection title="Rotation & Scale">
                  <ControlRow label="Rotate">
                    <Switch />
                  </ControlRow>
                </ControlSubsection>
              </ControlSection>

              <ControlSection title="Very Long Section (Scroll Test)">
                <ControlRow label="Option 1">
                  <Switch />
                </ControlRow>
                <ControlRow label="Option 2">
                  <Switch defaultChecked />
                </ControlRow>
                <ControlRow label="Option 3">
                  <Switch />
                </ControlRow>
                <ControlRow label="Option 4">
                  <Switch />
                </ControlRow>
                <ControlRow label="Option 5">
                  <Switch defaultChecked />
                </ControlRow>
                <ControlRow label="Option 6">
                  <Switch />
                </ControlRow>
                <ControlRow label="Option 7">
                  <Switch />
                </ControlRow>
              </ControlSection>
            </ControlPanel>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}
