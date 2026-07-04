import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { colorVar, type ColorVariant } from "../lib/colorVariant";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: ColorVariant;
  /** Auto-grows with content via CSS `field-sizing: content` (progressive
   *  enhancement — falls back to a plain resizable textarea in browsers
   *  that don't support it yet). Defaults to true. */
  autoGrow?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "primary", autoGrow = true, style, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "input-wrapper bg-surface text-foreground placeholder:text-foreground-dim w-full resize-y rounded-md p-3 text-[13px] outline-none",
          autoGrow && "textarea-auto",
          className
        )}
        style={{ ["--_ring" as string]: colorVar(variant), ...style }}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
