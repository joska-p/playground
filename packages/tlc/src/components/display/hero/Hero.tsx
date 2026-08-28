import { heroVariants, type HeroVariants } from './variants';
import { cn } from '../../../lib/cn';
import { Badge } from '../badge';

import type { HTMLAttributes, Ref } from 'react';

const GRADIENT_FROM = {
    default: 'from-muted-foreground',
    primary: 'from-primary',
    secondary: 'from-secondary',
    accent: 'from-accent',
    destructive: 'from-destructive',
    ghost: 'from-foreground'
} as const;

interface HeroProps extends HTMLAttributes<HTMLElement>, HeroVariants {
    badgeText?: string;
    title?: string;
    highlight?: string;
    description?: string;
    ref?: Ref<HTMLElement>;
}

function Hero({
    badgeText,
    title,
    highlight,
    description,
    children,
    variant,
    className,
    ref
}: HeroProps) {
    const fromColor = GRADIENT_FROM[variant ?? 'ghost'];

    return (
        <section
            ref={ref}
            className={cn(heroVariants({ variant }), className)}
        >
            <div className="relative z-10 mx-auto w-full max-w-6xl">
                {badgeText && <Badge variant="primary">{badgeText}</Badge>}

                <h1
                    className={cn(
                        'mt-4 text-[clamp(2.75rem,7.5vw,5.5rem)]',
                        'bg-linear-to-br bg-clip-text leading-tight font-black text-transparent', // impeccable-disable-line gradient-text
                        fromColor,
                        'via-accent to-secondary'
                    )}
                >
                    <span className="block text-[clamp(0.75rem,5.5vw,3.5rem)] font-light">
                        {highlight}
                    </span>
                    {title}
                    <span className="ml-1 animate-ping font-light">_</span>
                </h1>

                {description && (
                    <p className="text-muted-foreground mt-6 max-w-xl text-[clamp(1rem,2.5vw,1.125rem)]">
                        {description}
                    </p>
                )}

                {children && (
                    <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>
                )}
            </div>
        </section>
    );
}

export { Hero };
export type { HeroProps };
