import { Panel } from '@repo/tlc/layout';

import { Chart } from './chart/Chart';
import { Sketchpad } from './Sketchpad';

function ControlPanel() {
    return (
        <Panel className="w-96">
            <Sketchpad />
            <Chart />
        </Panel>
    );
}

export { ControlPanel };
