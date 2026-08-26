import { cn } from "../lib/cn";

import type { HTMLAttributes, ReactNode, Ref } from "react";

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    ref?: Ref<HTMLDivElement>;
}

function Accordion({ className, children, ref, ...props }: AccordionProps) {
    return (
        <div
            ref={ref}
            className={cn("flex flex-col gap-2", className)}
            {...props}
        >
            {children}
        </div>
    );
}

interface AccordionItemProps
    extends Omit<HTMLAttributes<HTMLDetailsElement>, "title"> {
    title: string;
    children: ReactNode;
    ref?: Ref<HTMLDetailsElement>;
}

function AccordionItem({
    className,
    title,
    children,
    ref,
    ...props
}: AccordionItemProps) {
    return (
        <details
            ref={ref}
            className={cn("group bg-card overflow-hidden rounded-lg", className)}
            {...props}
        >
            <summary className="text-foreground flex cursor-pointer items-center justify-between px-5 py-4 font-medium">
                {title}
                <span className="transition-transform group-open:rotate-180">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </span>
            </summary>
            <div className="text-muted-foreground px-5 pb-4 leading-relaxed">
                {children}
            </div>
        </details>
    );
}

export { Accordion, AccordionItem };
export type { AccordionProps, AccordionItemProps };
