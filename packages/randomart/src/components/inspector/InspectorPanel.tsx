import { AstTreeView } from './AstTreeView';
import { ChannelTabs } from './ChannelTabs';
import { ChoiceHistory } from './ChoiceHistory';
import { MathFormula } from './MathFormula';
import { SeedInfo } from './SeedInfo';

export function InspectorPanel() {
  return (
    <>
      <ChannelTabs />
      <SeedInfo />
      <ChoiceHistory />
      <MathFormula />
      <AstTreeView />
    </>
  );
}
