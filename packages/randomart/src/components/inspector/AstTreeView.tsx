import { nodeToTreeView } from '../../core/format/treePrinter';
import { useSelectedTree } from '../../stores/randomart/selectors';

export function AstTreeView() {
  const selectedTree = useSelectedTree();

  return (
    <div className="flex flex-1 flex-col gap-2">
      <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Abstract Syntax Tree (AST)
      </h4>
      <pre className="bg-background text-utility-3 overflow-x-auto rounded-sm p-4 text-xs leading-normal whitespace-pre shadow-inner">
        {nodeToTreeView(selectedTree)}
      </pre>
    </div>
  );
}
