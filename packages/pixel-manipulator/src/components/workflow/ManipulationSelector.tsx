import { pixel } from '@repo/pixel';
import { Button, ControlRow, Select } from '@repo/ui';
import { useState } from 'react';
import { addWorkflowStep } from '../../stores/manipulator/actions';

const manipulationIds = Object.keys(pixel.manipulations);

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
            {pixel.manipulations[id]?.name ?? id}
          </option>
        ))}
      </Select>

      <Button
        onClick={() => {
          addWorkflowStep(String(manipulationId));
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
