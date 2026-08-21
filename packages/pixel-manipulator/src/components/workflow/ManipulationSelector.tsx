import { getManipulations } from '@repo/pixel/worker';
import { ControlRow } from '@repo/ui/control-panel';
import { Button, Select } from '@repo/ui/data-entry';
import { useState } from 'react';

import { addWorkflowStep } from '../../stores/manipulator/actions';

const manipulationIds = Object.keys(getManipulations());

function ManipulationSelector() {
    const [manipulationId, setManipulationId] = useState(manipulationIds[0]);

    return (
        <ControlRow label="manipulation">
            <Select
                value={manipulationId}
                onChange={(e) => {
                    setManipulationId(e.target.value);
                }}
            >
                {manipulationIds.map((id) => (
                    <option
                        key={id}
                        value={id}
                    >
                        {getManipulations()[id].name}
                    </option>
                ))}
            </Select>

            <Button
                onClick={() => {
                    addWorkflowStep(manipulationId);
                }}
            >
                Add to Workflow
            </Button>
        </ControlRow>

        //   <Button
        //     onClick={() => {
        //       addWorkflowStep(manipulationId);
        //     }}
        //   >
        //     Add to Workflow
        //   </Button>
        // </div>
    );
}

export { ManipulationSelector };
