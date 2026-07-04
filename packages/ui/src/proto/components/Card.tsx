import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { colorVarStyle, type ColorVariant } from "../lib/colorVariant";

export type CardProps = {
  /** Enables the zero-JS `:has()` glow when `.card-actions` is hovered. */
  interactive?: boolean;
  /** Color used for the interactive glow. Ignored when `interactive` is false. */
  variant?: ColorVariant;
  /** Lay out as a row on landscape/desktop, stacked on mobile. */
  horizontal?: boolean;
} & HTMLAttributes<HTMLDivElement>

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, interactive, variant = "primary", horizontal, style, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md",
          interactive && "card-interactive transition-all",
          horizontal && "grid grid-cols-1 landscape:grid-cols-[200px_1fr]",
          className
        )}
        style={{ boxShadow: "var(--shadow-sm)", ...colorVarStyle(variant, style) }}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export const CardImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, alt = "", ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={cn("aspect-video landscape:aspect-auto w-full h-full object-cover", className)}
      {...props}
    />
  )
);
CardImage.displayName = "CardImage";

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4", className)} {...props} />
  )
);
CardBody.displayName = "CardBody";

export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-foreground text-[14px] font-medium", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-foreground-muted mt-1 text-[12px] leading-relaxed", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between px-4 py-2.5 bg-surface-raised/50",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

/** Wrap the row of icon buttons at the bottom of a card in this — hovering
 *  it triggers the `.card-interactive` glow via `:has()`, no JS needed. */
export const CardActions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("card-actions flex gap-0.5 px-4 pb-3", className)} {...props} />
  )
);
CardActions.displayName = "CardActions";
