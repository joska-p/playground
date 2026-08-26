import { type VariantProps } from "class-variance-authority";

import { textareaVariants } from "./textarea.variants";
import { cn } from "../lib/cn";
import { useFieldContext } from "../lib/field-context";
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
    id: idProp,
    ...props
}: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
    const fallbackId = undefined;
    const field = useFieldContext();
    const id = idProp ?? field?.id ?? fallbackId;

    return (
        <textarea
            ref={ref}
            id={id}
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
