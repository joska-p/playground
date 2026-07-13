import { getAllRules } from '@repo/randomart-engine/grammar/registry';
import { GrammarTestBench } from './grammar/GrammarTestBench';

export function TestMode() {
  return (
    <div className="h-screen overflow-auto">
      <GrammarTestBench rules={getAllRules()} />
    </div>
  );
}
