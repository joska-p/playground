import { ControlPanel as Panel } from '@repo/ui/control-panel';
import { Chart } from './Chart';
import { Sketchpad } from './Sketchpad';

function ControlPanel() {
  return (
    <Panel size="lg">
      <Sketchpad />
      <Chart />
    </Panel>
  );
}

export { ControlPanel };
