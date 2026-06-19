import { nodeToTreeView } from '../../core/format/treePrinter';
import { useActiveChannel } from '../../stores/randomart/selectors/useActiveChannel';
import { useTreeB } from '../../stores/randomart/selectors/useTreeB';
import { useTreeG } from '../../stores/randomart/selectors/useTreeG';
import { useTreeR } from '../../stores/randomart/selectors/useTreeR';

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
      <pre className="bg-background text-utility-3 overflow-x-auto rounded-sm p-4 text-xs leading-normal whitespace-pre shadow-inner">
        {nodeToTreeView(selectedTree)}
      </pre>
    </div>
  );
}
