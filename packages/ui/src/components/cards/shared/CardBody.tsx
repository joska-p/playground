import { cn } from '../../../lib/cn';

import type { ComponentProps } from 'react';

export type CardBodyProps = {} & ComponentProps<'div'>;

export function CardBody({ className, children, ...props }: CardBodyProps) {
    return (
        <div
            className={cn('flex flex-col gap-4 p-4', className)}
            {...props}
        >
            {children}
        </div>
    );
}
