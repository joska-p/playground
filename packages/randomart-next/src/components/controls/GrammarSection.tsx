import {
  getOperator,
  getOperatorKinds,
  getRule,
  listRuleGroups
} from '@repo/randomart-engine-next';
import type { RuleId } from '@repo/randomart-engine-next/types';
import { ControlGrid, ControlRow, ControlSection, ControlSubsection } from '@repo/ui/control-panel';
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

const OPERATOR_KINDS = getOperatorKinds();
const RULE_GROUPS = listRuleGroups();

function GrammarSection() {
  const selectedRuleId = useSelectedRuleId();
  const customOperators = useCustomOperators();
  const minDepth = useMinDepth();
  const maxDepth = useMaxDepth();

  const preset = getRule(selectedRuleId);
  const baseOperators = customOperators ?? preset.operators;
  const hasTerminals = baseOperators.some((id) => getOperator(id).arity === 0);
  const activeOperators = hasTerminals ? baseOperators : [...baseOperators, 'x', 'y', 'const'];

  return (
    <ControlSection
      title="Grammar"
      defaultOpen={false}
    >
      <ControlRow label="Preset">
        <Select
          value={selectedRuleId}
          onChange={(e) => {
            selectRule(e.target.value as RuleId);
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
                  {rule.label}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
      </ControlRow>
      <ControlSubsection
        title="Depth"
        defaultOpen={false}
      >
        <ControlRow label={`Min: ${String(minDepth)}`}>
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

        <ControlRow label={`Max: ${String(maxDepth)}`}>
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
      </ControlSubsection>

      {OPERATOR_KINDS.map((category) => (
        <ControlSubsection
          key={category.label}
          title={category.label}
          defaultOpen={true}
        >
          <ControlGrid columns={3}>
            {category.operators.map((operator) => {
              const isActive = activeOperators.includes(operator.id);
              return (
                <Button
                  key={operator.id}
                  variant={isActive ? 'secondary' : 'default'}
                  size="sm"
                  onClick={() => {
                    toggleOperator(operator.id);
                  }}
                >
                  {operator.label}
                </Button>
              );
            })}
          </ControlGrid>
        </ControlSubsection>
      ))}
    </ControlSection>
  );
}

export { GrammarSection };
