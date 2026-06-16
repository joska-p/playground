export type ExpressionNode = {
  ruleId: string;
  args: ExpressionNode[];
  constantValue?: number;
};
