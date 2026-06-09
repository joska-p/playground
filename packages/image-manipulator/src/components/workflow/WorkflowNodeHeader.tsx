import { ChevronIcon } from '../shared/ChevronIcon';
import { StepBadge } from './StepBadge';

type WorkflowNodeHeaderProps = {
  index: number;
  name: string;
  hasArgs: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
};

function WorkflowNodeHeader({
  index,
  name,
  hasArgs,
  expanded,
  onToggleExpand,
}: WorkflowNodeHeaderProps) {
  return (
    <>
      <StepBadge stepNumber={index + 1} />
      <span className="flex-1 truncate text-sm font-medium">{name}</span>
      {hasArgs && (
        <button
          onClick={onToggleExpand}
          className="text-muted-foreground hover:text-foreground"
          aria-label={expanded ? 'Collapse arguments' : 'Expand arguments'}
        >
          <ChevronIcon isOpen={expanded} />
        </button>
      )}
    </>
  );
}

export { WorkflowNodeHeader };
