import { Badge as UIBadge, type BadgeProps } from '@repo/tlc/components/display';

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
