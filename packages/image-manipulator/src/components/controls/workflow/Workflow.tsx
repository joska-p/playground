import type { WorkflowStep } from "../../../store/workflowStore";
import { WorkflowStepItem } from "./WorkflowStepItem";

type WorkflowProps = {
  steps: WorkflowStep[];
};

function ArrowDown() {
  return (
    <div className="flex justify-center py-1">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground"
      >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>
    </div>
  );
}

function Workflow({ steps }: WorkflowProps) {
  if (steps.length === 0) {
    return (
      <div className="border-border flex flex-col items-center gap-2 rounded-lg border border-dashed px-4 py-8 text-center">
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
          <circle cx="12" cy="12" r="10" />
        </svg>
        <p className="text-muted-foreground text-sm">
          Add manipulations to build your pipeline
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {steps.map((step, index) => (
        <div key={step.uid}>
          <WorkflowStepItem
            step={step}
            index={index}
            isFirst={index === 0}
            isLast={index === steps.length - 1}
          />
          {index < steps.length - 1 && <ArrowDown />}
        </div>
      ))}
    </div>
  );
}

export { Workflow };
