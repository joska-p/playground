import { Button } from '@repo/ui/Button';

type WorkflowNodeControlsProps = {
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

function WorkflowNodeControls({
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
}: WorkflowNodeControlsProps) {
  return (
    <div
      className="flex gap-0.5"
      role="toolbar"
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        disabled={isFirst}
        onClick={onMoveUp}
        aria-label="Move up"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        disabled={isLast}
        onClick={onMoveDown}
        aria-label="Move down"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive h-6 w-6"
        onClick={onRemove}
        aria-label="Remove step"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </Button>
    </div>
  );
}

export { WorkflowNodeControls };
