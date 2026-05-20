import { Button } from "@repo/ui";

type EmptyInfoProps = {
  onResetView: () => void;
};

export function EmptyInfo({ onResetView }: EmptyInfoProps) {
  return (
    <div>
      <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
        Knowledge Graph
      </span>
      <p className="text-muted-foreground mt-0.5 text-xs italic">
        Click a node or edge to inspect
      </p>
      <div className="mt-2 flex gap-2">
        <Button onClick={onResetView} size="small" variant="outline">
          Reset view
        </Button>
      </div>
    </div>
  );
}
