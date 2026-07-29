type Rule<TId extends string = string> = {
  readonly id: TId;
  readonly name: string;
  readonly stateCount: number;
  readonly birth: readonly boolean[];
  readonly survive: readonly boolean[];
};

type ParseRuleProps<TId extends string> = {
  readonly id: TId;
  readonly name: string;
  readonly notation: string;
  readonly stateCount?: number;
};

function parseRule<const TId extends string>({
  id,
  name,
  notation,
  stateCount = 2
}: ParseRuleProps<TId>): Rule<TId> {
  const birth = Array<boolean>(9).fill(false);
  const survive = Array<boolean>(9).fill(false);

  const [bPart = '', sPart = ''] = notation.toUpperCase().split('/');

  for (const ch of bPart.replace('B', '')) {
    birth[Number(ch)] = true;
  }
  for (const ch of sPart.replace('S', '')) {
    survive[Number(ch)] = true;
  }

  return { id, name, stateCount, birth, survive };
}

const conwayRule = parseRule({ id: 'conway', name: "Conway's Game of Life", notation: 'B3/S23' });
const highlifeRule = parseRule({ id: 'highlife', name: 'HighLife', notation: 'B36/S23' });
const briansBrainRule = parseRule({
  id: 'brians-brain',
  name: "Brian's Brain",
  notation: 'B2/S',
  stateCount: 3
});

const allRules = [conwayRule, highlifeRule, briansBrainRule] as const;

type RuleId = (typeof allRules)[number]['id'];

const rules = allRules.reduce(
  (acc, rule) => {
    acc[rule.id] = rule;
    return acc;
  },
  {} as Record<RuleId, Rule<RuleId>>
);

export { allRules, rules };
export type { Rule, RuleId };
