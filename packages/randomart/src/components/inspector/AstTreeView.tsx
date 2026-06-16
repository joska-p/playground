import { nodeToTreeView } from '../../core/treePrinter';
import { useActiveChannel } from '../../stores/randomart/selectors/useActiveChannel';
import {
  useTreeB,
  useTreeG,
  useTreeR
} from '../../stores/randomart/selectors/useTrees';

export function AstTreeView() {
  const activeChannel = useActiveChannel();
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const selectedTree =
    activeChannel === 'red' ? treeR : activeChannel === 'green' ? treeG : treeB;

  return (
    <div className="flex flex-1 flex-col gap-2">
      <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Abstract Syntax Tree (AST)
      </h4>
      <pre className="border-border bg-background text-utility-3 overflow-x-auto rounded-xl border p-4 font-mono text-xs leading-normal whitespace-pre shadow-inner">
        {nodeToTreeView(selectedTree)}
      </pre>
    </div>
  );
}
