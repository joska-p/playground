import { ControlPanel as Panel } from '@repo/ui/control-panel';
import { Sketchpad } from './Sketchpad';

function ControlPanel() {
  return (
    <Panel
      size="lg"
      defaultCollapsed
    >
      <Sketchpad />
    </Panel>
  );
}

export { ControlPanel };
