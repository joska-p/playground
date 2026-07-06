import { ControlPanel, ControlRow, ControlSection } from '../../components/control-panel';
import { Switch } from '../../components/data-entry';
import { DemoSection } from '../layout/DemoSection';

export function ControlPanelDemo() {
  return (
    <DemoSection
      id="component-controlpanel"
      title="ControlPanel"
      intro="Collapsible control panel for creative-coding tools. Includes ControlSection, ControlRow, ControlConditional, ControlGrid, ControlSubsection."
      code={`<ControlPanel title="parameters" variant="secondary" dock="bottom-sheet">
  <ControlSection title="display" variant="primary">
    <ControlRow label="fullscreen"><Switch defaultChecked /></ControlRow>
      <ControlRow label="vsync"><Switch variant="accent"/></ControlRow>
  </ControlSection>
</ControlPanel>`}
    >
      <div className="space-y-4">
        <ControlPanel
          title="parameters"
          variant="secondary"
          dock="bottom-sheet"
        >
          <ControlSection
            title="display"
            variant="primary"
          >
            <ControlRow label="fullscreen">
              <Switch defaultChecked />
            </ControlRow>
            <ControlRow label="vsync">
              <Switch variant="accent" />
            </ControlRow>
          </ControlSection>
        </ControlPanel>
      </div>
    </DemoSection>
  );
}
