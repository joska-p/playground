type StepBadgeProps = {
  stepNumber: number;
};

function StepBadge({ stepNumber }: StepBadgeProps) {
  return (
    <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
      {stepNumber}
    </span>
  );
}

export { StepBadge };
