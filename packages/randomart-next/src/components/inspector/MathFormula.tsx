import { toMathString } from '@repo/randomart-engine-next';
import { useSelectedTree } from '../../stores/randomart/selectors';

export function MathFormula() {
  const selectedTree = useSelectedTree();

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Evaluated Math String Formula
      </h4>
      <div className="bg-background text-foreground overflow-x-auto rounded-sm p-4 text-sm leading-relaxed break-all whitespace-normal shadow-inner">
        f(x, y) = {toMathString(selectedTree)}
      </div>
    </div>
  );
}
