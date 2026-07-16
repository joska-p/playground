import type { OperatorId } from '@repo/randomart-engine-next';
import { getRule, listRules } from '@repo/randomart-engine-next';
import { ControlGrid, ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Button, Select, Slider } from '@repo/ui/data-entry';
import {
  selectRule,
  setMaxDepth,
  setMinDepth,
  toggleOperator
} from '../../stores/randomart/actions/config';
import {
  useCustomOperators,
  useMaxDepth,
  useMinDepth,
  useSelectedRuleId
} from '../../stores/randomart/selectors';

type OperatorCategory = {
  label: string;
  operators: { id: OperatorId; label: string }[];
};

const OPERATOR_CATEGORIES: OperatorCategory[] = [
  {
    label: 'Terminals',
    operators: [
      { id: 'x', label: 'x' },
      { id: 'y', label: 'y' },
      { id: 'const', label: 'const' },
      { id: 'random', label: 'random' },
      { id: 'radial', label: 'radial' },
      { id: 'sweep', label: 'sweep' },
      { id: 'fbm', label: 'fbm' },
      { id: 'recaman-pattern', label: 'recaman' },
      { id: 'nested-oscillation', label: 'nested osc.' }
    ]
  },
  {
    label: 'Transforms',
    operators: [
      { id: 'sin', label: 'sin' },
      { id: 'cos', label: 'cos' },
      { id: 'abs', label: 'abs' },
      { id: 'sqrt', label: 'sqrt' },
      { id: 'exp', label: 'exp' },
      { id: 'log', label: 'log' },
      { id: 'fract', label: 'fract' }
    ]
  },
  {
    label: 'Combinators',
    operators: [
      { id: 'sum', label: 'sum' },
      { id: 'product', label: 'product' },
      { id: 'mod', label: 'mod' },
      { id: 'pow', label: 'pow' },
      { id: 'less-than', label: '<' },
      { id: 'greater-than', label: '>' },
      { id: 'step', label: 'step' },
      { id: 'if', label: 'if' }
    ]
  }
];

type RuleGroup = {
  label: string;
  rules: { id: string; displayName: string }[];
};

const RULE_GROUPS: RuleGroup[] = [
  {
    label: 'Classic',
    rules: [
      { id: 'classic', displayName: 'Classic Random Art' },
      { id: 'trig', displayName: 'Trigonometric Waves' },
      { id: 'blocky', displayName: 'Blocky Modular' },
      { id: 'arithmetic-mix', displayName: 'Arithmetic Mix' }
    ]
  },
  {
    label: 'Terminal',
    rules: listRules()
      .filter((r) => r.id.startsWith('terminal-'))
      .map((r) => ({ id: r.id, displayName: r.displayName }))
  },
  {
    label: 'Transform',
    rules: listRules()
      .filter((r) => r.id.startsWith('transform-'))
      .map((r) => ({ id: r.id, displayName: r.displayName }))
  },
  {
    label: 'Combinator',
    rules: listRules()
      .filter((r) => r.id.startsWith('combinator-'))
      .map((r) => ({ id: r.id, displayName: r.displayName }))
  },
  {
    label: 'Composite',
    rules: listRules()
      .filter(
        (r) =>
          !r.id.startsWith('terminal-') &&
          !r.id.startsWith('transform-') &&
          !r.id.startsWith('combinator-') &&
          !['classic', 'trig', 'blocky', 'arithmetic-mix'].includes(r.id)
      )
      .map((r) => ({ id: r.id, displayName: r.displayName }))
  }
];

function GrammarSection() {
  const selectedRuleId = useSelectedRuleId();
  const customOperators = useCustomOperators();
  const minDepth = useMinDepth();
  const maxDepth = useMaxDepth();

  const preset = getRule(selectedRuleId);
  const activeOperators = customOperators ?? preset?.operators ?? [];

  return (
    <ControlSection
      title="Grammar"
      defaultOpen={false}
    >
      <ControlRow label="Preset">
        <Select
          value={selectedRuleId}
          onChange={(e) => {
            selectRule(e.target.value);
          }}
        >
          {RULE_GROUPS.map((group) => (
            <optgroup
              key={group.label}
              label={group.label}
            >
              {group.rules.map((rule) => (
                <option
                  key={rule.id}
                  value={rule.id}
                >
                  {rule.displayName}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
      </ControlRow>

      <ControlRow label="Min Depth">
        <div className="flex items-center gap-2">
          <Slider
            min={1}
            max={12}
            step={1}
            value={minDepth}
            onChange={setMinDepth}
          />
          <span className="text-foreground-dim w-6 text-right font-mono text-xs">{minDepth}</span>
        </div>
      </ControlRow>

      <ControlRow label="Max Depth">
        <div className="flex items-center gap-2">
          <Slider
            min={1}
            max={16}
            step={1}
            value={maxDepth}
            onChange={setMaxDepth}
          />
          <span className="text-foreground-dim w-6 text-right font-mono text-xs">{maxDepth}</span>
        </div>
      </ControlRow>

      {OPERATOR_CATEGORIES.map((category) => (
        <ControlSection
          key={category.label}
          title={category.label}
          defaultOpen={false}
        >
          <ControlGrid columns={3}>
            {category.operators.map((op) => (
              <Button
                key={op.id}
                variant={activeOperators.includes(op.id) ? 'secondary' : 'default'}
                size="sm"
                onClick={() => {
                  toggleOperator(op.id);
                }}
              >
                {op.label}
              </Button>
            ))}
          </ControlGrid>
        </ControlSection>
      ))}
    </ControlSection>
  );
}

export { GrammarSection };
