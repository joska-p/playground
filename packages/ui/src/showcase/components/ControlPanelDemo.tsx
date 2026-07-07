import { ControlPanel, ControlRow, ControlSection } from '../../components/control-panel';
import { Switch } from '../../components/data-entry';
import { DemoSection } from '../layout/DemoSection';

export function ControlPanelDemo() {
  return (
    <DemoSection
      id="component-controlpanel"
      title="ControlPanel"
      intro="Responsive collapsible control panel with position support (top, bottom, left, right) and orientation awareness."
      code={`<ControlPanel
  title="Parameters"
  position="bottom"
  size="md"
  collapsible
>
  <ControlSection title="Display">
    <ControlRow label="Fullscreen">
      <Switch defaultChecked />
    </ControlRow>
    <ControlRow label="VSync">
      <Switch variant="accent" />
    </ControlRow>
  </ControlSection>
</ControlPanel>`}
    >
      <div className="space-y-8">
        {/* Default - Bottom (recommended starting point) */}
        <div className="border-border relative h-96 border">
          <p className="text-muted-foreground mb-3 text-sm">1. top sm</p>
          <ControlPanel
            title="Parameters"
            size="sm"
            position="top"
          >
            <ControlSection title="Display">
              <ControlRow label="Fullscreen">
                <Switch defaultChecked />
              </ControlRow>
              <ControlRow label="VSync">
                <Switch variant="accent" />
              </ControlRow>
            </ControlSection>
          </ControlPanel>
        </div>

        {/* Left panel example */}
        <div className="border-border relative h-96 border">
          <p className="text-muted-foreground mb-3 text-sm">2. bottom md</p>
          <ControlPanel
            title="Controls"
            size="md"
            position="bottom"
            variant="primary"
          >
            <ControlSection title="Display">
              <ControlRow label="Fullscreen">
                <Switch defaultChecked />
              </ControlRow>
              <ControlRow label="VSync">
                <Switch variant="accent" />
              </ControlRow>
            </ControlSection>
          </ControlPanel>
        </div>

        {/* Top panel + collapsed example */}
        <div className="border-border relative h-96 border">
          <p className="text-muted-foreground mb-3 text-sm">3. right md + collapsed</p>
          <ControlPanel
            title="Parameters"
            size="md"
            position="right"
            defaultCollapsed={true}
            variant="secondary"
          >
            <ControlSection title="Display">
              <ControlRow label="Fullscreen">
                <Switch defaultChecked />
              </ControlRow>
            </ControlSection>
          </ControlPanel>
        </div>

        {/* Right panel */}
        <div className="border-border relative h-96 border">
          <p className="text-muted-foreground mb-3 text-sm">4. Left lg + collapsed</p>
          <ControlPanel
            title="Tools"
            size="lg"
            position="left"
            defaultCollapsed={true}
            variant="accent"
          >
            <ControlSection title="Display">
              <ControlRow label="Fullscreen">
                <Switch defaultChecked />
              </ControlRow>
            </ControlSection>
          </ControlPanel>
        </div>
      </div>
    </DemoSection>
  );
}
