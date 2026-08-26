import { getManipulations } from '@repo/pixel/worker';
import { Button, FieldRow, Select } from '@repo/tlc/components/forms';
import { useState } from 'react';

import { addWorkflowStep } from '../../stores/manipulator/actions';

const manipulationIds = Object.keys(getManipulations());

function ManipulationSelector() {
    const [manipulationId, setManipulationId] = useState(manipulationIds[0]);

    const manipulationOptions = manipulationIds.map((id) => ({
        label: getManipulations()[id].name,
        value: id
    }));

    return (
        <FieldRow label="manipulation">
            <Select
                value={manipulationId}
                onChange={(val) => {
                    setManipulationId(val);
                }}
                options={manipulationOptions}
            />

            <Button
                onClick={() => {
                    addWorkflowStep(manipulationId);
                }}
            >
                Add to Workflow
            </Button>
        </FieldRow>
    );
}

export { ManipulationSelector };
