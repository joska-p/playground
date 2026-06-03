import { useState } from "react";
import { Button } from "@repo/ui/Button";
import type { ArgDefinition } from "../../../core/manipulations/manipulations";
import type { WorkflowStep } from "../../../store/workflowStore";
import {
  moveWorkflowStep,
  removeWorkflowStep,
  updateWorkflowStepOptions,
} from "../../../store/workflowStore";
import { WorkflowStepArgSlider } from "./WorkflowStepArgSlider";

type WorkflowNodeProps = {
  step: WorkflowStep;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  name: string;
  argDefinitions: ArgDefinition[];
};

function WorkflowNode({ step, index, isFirst, isLast, name, argDefinitions }: WorkflowNodeProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border-border rounded-lg border">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
          {index + 1}
        </span>

        <span className="text-sm font-medium flex-1 truncate">
          {name}
        </span>

        {argDefinitions.length > 0 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-muted-foreground hover:text-foreground"
            aria-label={expanded ? "Collapse arguments" : "Expand arguments"}
          >
            <svg
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}

        <div className="flex gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            disabled={isFirst}
            onClick={() => moveWorkflowStep(index, -1)}
            aria-label="Move up"
          >
            ↑
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            disabled={isLast}
            onClick={() => moveWorkflowStep(index, 1)}
            aria-label="Move down"
          >
            ↓
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-destructive"
            onClick={() => removeWorkflowStep(index)}
            aria-label="Remove step"
          >
            ✕
          </Button>
        </div>
      </div>

      {argDefinitions.length > 0 && expanded && (
        <div className="border-border flex flex-col gap-2 border-t px-3 py-2">
          {argDefinitions.map((def) => (
            <WorkflowStepArgSlider
              key={def.key}
              def={def}
              value={step.options[def.key] ?? def.min}
              onChange={(value) =>
                updateWorkflowStepOptions(index, {
                  ...step.options,
                  [def.key]: value,
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { WorkflowNode };
