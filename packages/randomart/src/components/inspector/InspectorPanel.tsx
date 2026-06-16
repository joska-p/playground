import { AstTreeView } from './AstTreeView';
import { ChannelTabs } from './ChannelTabs';
import { ChoiceHistory } from './ChoiceHistory';
import { MathFormula } from './MathFormula';
import { SeedInfo } from './SeedInfo';

export function InspectorPanel() {
  return (
    <>
      <ChannelTabs />
      <section className="border-border border-t pt-4">
        <SeedInfo />
      </section>
      <section className="border-border border-t pt-4">
        <ChoiceHistory />
      </section>
      <section className="border-border border-t pt-4">
        <MathFormula />
      </section>
      <section className="border-border border-t pt-4">
        <AstTreeView />
      </section>
    </>
  );
}
