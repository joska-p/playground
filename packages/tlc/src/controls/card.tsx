import { type VariantProps } from "class-variance-authority";

import { cardVariants } from "./card.variants";
import { cn } from "../lib/cn";
import type { HTMLAttributes } from "react";

interface CardProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardVariants> {}

function Card({
    className,
    variant,
    ref,
    ...props
}: CardProps & { ref?: React.Ref<HTMLDivElement> }) {
    return (
        <div
            ref={ref}
            className={cn(cardVariants({ variant }), className)}
            {...props}
        />
    );
}

function CardTitle({
    className,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                "text-foreground text-lg font-semibold leading-none tracking-tight",
                className,
            )}
            {...props}
        />
    );
}

function CardDescription({
    className,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

export { Card, CardTitle, CardDescription };
export type { CardProps };
