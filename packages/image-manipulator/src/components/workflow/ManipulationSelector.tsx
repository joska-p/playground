import { Button } from '@repo/ui/Button';
import { Select } from '@repo/ui/Select';
import { useState } from 'react';
import type { ManipulationId } from '../../core/manipulations/manipulations';
import {
  manipulations,
  manipulationsIds,
} from '../../core/manipulations/manipulations';
import { addWorkflowStep } from '../../stores/manipulator/actions';

function ManipulationSelector() {
  const [manipulationId, setManipulationId] = useState(manipulationsIds[0]);

  return (
    <div className="flex flex-col gap-2">
      <Select
        variant="primary"
        value={manipulationId}
        onChange={(e) => setManipulationId(e.target.value as ManipulationId)}
        label="Manipulation"
      >
        {manipulationsIds.map((id) => (
          <option key={id} value={id}>
            {manipulations[id]?.name ?? id}
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
