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
    <div className="flex gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        disabled={isFirst}
        onClick={onMoveUp}
        aria-label="Move up"
      >
        ↑
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        disabled={isLast}
        onClick={onMoveDown}
        aria-label="Move down"
      >
        ↓
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-destructive"
        onClick={onRemove}
        aria-label="Remove step"
      >
        ✕
      </Button>
    </div>
  );
}

export { WorkflowNodeControls };
