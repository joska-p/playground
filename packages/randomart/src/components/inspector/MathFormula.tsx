import { nodeToMathString } from '../../core/treePrinter';
import { useActiveChannel } from '../../stores/randomart/selectors/useActiveChannel';
import {
  useTreeB,
  useTreeG,
  useTreeR
} from '../../stores/randomart/selectors/useTrees';

export function MathFormula() {
  const activeChannel = useActiveChannel();
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const selectedTree =
    activeChannel === 'red' ? treeR : activeChannel === 'green' ? treeG : treeB;

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Evaluated Math String Formula
      </h4>
      <div className="border-border bg-background text-foreground overflow-x-auto rounded-xl border p-4 font-mono text-sm leading-relaxed break-all whitespace-normal shadow-inner">
        f(x, y) = {nodeToMathString(selectedTree)}
      </div>
    </div>
  );
}
