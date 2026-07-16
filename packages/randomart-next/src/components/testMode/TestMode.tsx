import { listRules } from '@repo/randomart-engine-next';
import { GrammarTestBench } from './grammar/GrammarTestBench';

export function TestMode() {
  return (
    <div className="bg-background text-foreground h-screen overflow-auto">
      <GrammarTestBench rules={listRules()} />
    </div>
  );
}
