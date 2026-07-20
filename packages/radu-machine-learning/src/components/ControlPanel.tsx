import { ControlPanel as Panel } from '@repo/ui/control-panel';
import { Charts } from './Charts';
import { Sketchpad } from './Sketchpad';

function ControlPanel() {
  return (
    <Panel size="lg">
      <Sketchpad />
      <Charts />
    </Panel>
  );
}

export { ControlPanel };
