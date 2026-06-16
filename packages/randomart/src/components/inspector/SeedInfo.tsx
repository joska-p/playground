import { useActiveChannel } from '../../stores/randomart/selectors/useActiveChannel';
import {
  useRngB,
  useRngG,
  useRngR
} from '../../stores/randomart/selectors/useRngInstances';

export function SeedInfo() {
  const activeChannel = useActiveChannel();
  const rngR = useRngR();
  const rngG = useRngG();
  const rngB = useRngB();
  const selectedRng =
    activeChannel === 'red' ? rngR : activeChannel === 'green' ? rngG : rngB;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
          Generated Base Seed
        </h4>
        <div className="bg-card text-utility-1 rounded-sm px-3 py-2 text-sm font-bold">
          #{selectedRng.initialHash}
        </div>
      </div>
      <div>
        <h4 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
          Grammar Steps Used
        </h4>
        <div className="border-border/60 bg-card text-utility-4 rounded-lg border px-3 py-2 font-mono text-sm font-bold">
          {selectedRng.choiceHistory.length} Calls
        </div>
      </div>
    </div>
  );
}
