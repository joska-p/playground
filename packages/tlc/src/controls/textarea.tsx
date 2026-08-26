import { type VariantProps } from "class-variance-authority";

import { textareaVariants } from "./textarea.variants";
import { cn } from "../lib/cn";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textareaVariants> {
    autoGrow?: boolean;
}

function Textarea({
    className,
    variant,
    autoGrow = true,
    style,
    ref,
    ...props
}: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
    return (
        <textarea
            ref={ref}
            className={cn(
                textareaVariants({ variant }),
                autoGrow && "field-sizing-content max-h-[15lh] min-h-[3lh]",
                className,
            )}
            style={style}
            {...props}
        />
    );
}

export { Textarea };
export type { TextareaProps };
