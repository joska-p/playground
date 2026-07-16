import { AstTreeView } from './AstTreeView';
import { ChannelTabs } from './ChannelTabs';
import { MathFormula } from './MathFormula';

export function InspectorPanel() {
  return (
    <div className="flex flex-col gap-5 p-1">
      <ChannelTabs />
      <MathFormula />
      <AstTreeView />
    </div>
  );
}
