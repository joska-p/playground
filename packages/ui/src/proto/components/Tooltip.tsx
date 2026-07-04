import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { cn } from "../lib/cn";

export type TooltipProps = {
  content: string;
  children: ReactElement<{ className?: string; "data-tooltip"?: string }>;
}

/**
 * Tooltip — a CSS-only `::after` bubble driven by `data-tooltip` (see
 * `.tooltip` in globals.css). Zero JS, zero portal, works on any element
 * that can hold an attribute — including elements with no ReactNode child.
 */
export function Tooltip({ content, children }: TooltipProps) {
  if (!isValidElement(children)) return children as ReactNode as ReactElement;
  return cloneElement(children, {
    className: cn(children.props.className, "tooltip"),
    "data-tooltip": content,
  });
}
