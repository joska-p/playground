import { Card } from '@repo/ui/Card';
import { Select } from '@repo/ui/Select';
import { Slider } from '@repo/ui/Slider';
import type { ChangeEvent, JSX } from 'react';
import { visualizations } from '../../core/visualizations/visualizations';
import {
  setSequenceSteps,
  setSequenceVisualizationId,
  useSequenceRule,
  useSequenceSteps,
  useSequenceVisualizationId,
} from '../../store/sequenceStore';
import { SequenceSelector } from './SequenceSelector';

function Controls(): JSX.Element {
  const sequenceRule = useSequenceRule();
  const steps = useSequenceSteps();
  const visualizationId = useSequenceVisualizationId();

  return (
    <Card className="flex w-full items-center py-2 px-4 justify-center gap-8">
      <SequenceSelector />

      <Slider
        variant="secondary"
        layout="horizontal"
        label="Steps"
        min={2}
        max={sequenceRule.maxSteps}
        step={1}
        value={steps}
        onChange={(steps) => setSequenceSteps({ steps })}
        className="max-w-xs"
      />

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Visualization:</span>
        <Select
          variant="secondary"
          value={visualizationId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSequenceVisualizationId({ visualizationId: e.target.value })
          }
          className="w-auto min-w-35"
        >
          {visualizations.map((v) => (
            <option
              key={v.id}
              value={v.id}
            >
              {v.name}
            </option>
          ))}
        </Select>
      </div>
    </Card>
  );
}

export { Controls };
