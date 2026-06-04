import { manipulations } from '../../core/manipulations/manipulations';
import type { WorkflowStep } from '../../stores/manipulator/types';
import { ArrowDownIcon } from './ArrowDownIcon';
import { EmptyState } from '../shared/EmptyState';
import { WorkflowNode } from './WorkflowNode';

type WorkflowListProps = {
  steps: WorkflowStep[];
};

function WorkflowList({ steps }: WorkflowListProps) {
  if (steps.length === 0) {
    return (
      <EmptyState
        message="Add manipulations to build your pipeline"
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M12 2a10 10 0 0 1 10 10" />
            <path d="M12 12 4.93 4.93" />
            <path d="M12 12 2 12" />
            <path d="M12 12 12 22" />
            <circle
              cx="12"
              cy="12"
              r="10"
            />
          </svg>
        }
      />
    );
  }

  return (
    <div className="flex flex-col">
      {steps.map((step, index) => {
        const manip = manipulations[step.id];
        if (!manip) return null;

        return (
          <div key={step.uid}>
            <WorkflowNode
              step={step}
              index={index}
              isFirst={index === 0}
              isLast={index === steps.length - 1}
              name={manip.name}
              argDefinitions={manip.argDefinitions}
            />
            {index < steps.length - 1 && <ArrowDownIcon />}
          </div>
        );
      })}
    </div>
  );
}

export { WorkflowList };
export type { WorkflowListProps };
