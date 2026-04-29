import { getCollection } from "astro:content";
import { z } from "astro/zod";
import { Book, Wrench, Lightbulb, Code } from "lucide-react";

const baseUrl = import.meta.env.BASE_URL || "/";
export const docsBaseUrl = `${baseUrl}docs/`;

// 1. Define UI Metadata separately
export const TAG_METADATA = {
  tutorial: {
    label: "Tutorials",
    description: "Step-by-step guides.",
    Icon: Book,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  "how-to": {
    label: "How-To Guides",
    description: "Practical recipes.",
    Icon: Wrench,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  explanation: {
    label: "Explanations",
    description: "Deep dives.",
    Icon: Lightbulb,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  reference: {
    label: "Reference",
    description: "Technical specs.",
    Icon: Code,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
} as const;

// Helper types for your UI components
export type TagId = keyof typeof TAG_METADATA;
const tagIds = Object.keys(TAG_METADATA) as [TagId, ...TagId[]];

// 2. The "Pure" Schema: No transform, just validation
export const docSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  draft: z.boolean().default(false),
  tags: z.array(z.enum(tagIds)).default([]), // Only validates the strings
});

// 3. UI Helper Function
export function getTagMetadata(id: TagId) {
  return TAG_METADATA[id];
}

export async function getDocsByCategory() {
  const allDocs = await getCollection("docs", ({ data }) => !data.draft);

  return Object.entries(TAG_METADATA).map(([id, meta]) => ({
    id: id as TagId,
    ...meta,
    articles: allDocs
      .filter((doc) => doc.data.tags.includes(id as TagId)) // Simple string check
      .sort((a, b) => a.data.order - b.data.order),
  }));
}

export async function getFeaturedDocs() {
  return getCollection("docs", ({ data }) => data.featured && !data.draft);
}
