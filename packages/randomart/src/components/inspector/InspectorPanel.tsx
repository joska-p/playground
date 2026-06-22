import { AstTreeView } from './AstTreeView';
import { ChannelTabs } from './ChannelTabs';
import { ChoiceHistory } from './ChoiceHistory';
import { MathFormula } from './MathFormula';
import { SeedInfo } from './SeedInfo';

export function InspectorPanel() {
  return (
    <div className="flex flex-col gap-5 p-1">
      <ChannelTabs />
      <SeedInfo />
      <ChoiceHistory />
      <MathFormula />
      <AstTreeView />
    </div>
  );
}
