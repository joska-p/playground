import { nodeToMathString } from '../../core/format/treePrinter';
import { useActiveChannel } from '../../stores/randomart/selectors/useActiveChannel';
import { useTreeB } from '../../stores/randomart/selectors/useTreeB';
import { useTreeG } from '../../stores/randomart/selectors/useTreeG';
import { useTreeR } from '../../stores/randomart/selectors/useTreeR';

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
      <div className="bg-background text-foreground overflow-x-auto rounded-sm p-4 text-sm leading-relaxed break-all whitespace-normal shadow-inner">
        f(x, y) = {nodeToMathString(selectedTree)}
      </div>
    </div>
  );
}
