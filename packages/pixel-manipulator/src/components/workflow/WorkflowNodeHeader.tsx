import { StepBadge } from './StepBadge';

type WorkflowNodeHeaderProps = {
  index: number;
  name: string;
};

function WorkflowNodeHeader({ index, name }: WorkflowNodeHeaderProps) {
  return (
    <>
      <StepBadge stepNumber={index + 1} />
      <span className="flex-1 truncate text-sm font-medium">{name}</span>
    </>
  );
}

export { WorkflowNodeHeader };
