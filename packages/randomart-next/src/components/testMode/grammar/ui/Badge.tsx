import { Badge as UIBadge, type BadgeProps } from '@repo/ui/data-display';

export function Badge({ children, ...props }: BadgeProps) {
  return (
    <UIBadge
      variant="default"
      size="sm"
      {...props}
    >
      {children}
    </UIBadge>
  );
}
