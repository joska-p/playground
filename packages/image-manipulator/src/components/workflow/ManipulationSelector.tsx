import { imagePipeline } from '@repo/image-pipeline';
import { Button } from '@repo/ui/Button';
import { Select } from '@repo/ui/Select';
import { useState } from 'react';
import { addWorkflowStep } from '../../stores/manipulator/actions';

const manipulationIds = Object.keys(imagePipeline.manipulations);

function ManipulationSelector() {
  const [manipulationId, setManipulationId] = useState(manipulationIds[0]);

  return (
    <div className="flex flex-col gap-2">
      <Select
        variant="primary"
        value={manipulationId}
        onChange={(e) => setManipulationId(e.target.value)}
        label="Manipulation"
      >
        {manipulationIds.map((id) => (
          <option
            key={id}
            value={id}
          >
            {imagePipeline.manipulations[id]?.name ?? id}
          </option>
        ))}
      </Select>

      <Button onClick={() => addWorkflowStep(manipulationId)}>
        Add to Workflow
      </Button>
    </div>
  );
}

export { ManipulationSelector };
