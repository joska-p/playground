import { Book, Wrench, Lightbulb, Code } from "lucide-react";
import type { ComponentType } from "react";

export interface TagMetadata {
  label: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
  color: string;
}

// Use `as const` to lock down the keys as literal string types
const _TAG_REGISTRY = {
  tutorial: {
    label: "Tutorials",
    description: "Step-by-step guides to help you get started from scratch.",
    Icon: Book,
    color: "text-blue-500",
  },
  "how-to": {
    label: "How-To Guides",
    description: "Practical recipes to solve specific problems and implement features.",
    Icon: Wrench,
    color: "text-amber-500",
  },
  explanation: {
    label: "Explanations",
    description: "Deep dives into the concepts and architecture of the system.",
    Icon: Lightbulb,
    color: "text-emerald-500",
  },
  reference: {
    label: "Reference",
    description: "Technical specifications and detailed API documentation.",
    Icon: Code,
    color: "text-purple-500",
  },
} as const;

// Derive TagId from the actual keys (union of literal types)
export type TagId = keyof typeof _TAG_REGISTRY;

// Export a readonly registry (prevents accidental mutation)
export const TAG_REGISTRY: Readonly<typeof _TAG_REGISTRY> = _TAG_REGISTRY;

// Type-safe lookup function - returns undefined if key doesn't exist
export function getTagMetadata(id: string): TagMetadata | undefined {
  return TAG_REGISTRY[id as TagId];
}

// Type-safe lookup with fallback to 'reference'
export function getTagMetadataWithFallback(id: string): TagMetadata {
  return getTagMetadata(id) ?? TAG_REGISTRY.reference;
}
