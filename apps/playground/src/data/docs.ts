import { getCollection } from "astro:content";
import { z } from "astro/zod";
import { Book, Wrench, Lightbulb, Code } from "lucide-react";

const baseUrl = import.meta.env.BASE_URL || "/";
export const docsBaseUrl = `${baseUrl}docs/`;

export const CATEGORY_METADATA = {
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

export type CategoryId = keyof typeof CATEGORY_METADATA;
const categoryIds = Object.keys(CATEGORY_METADATA) as [CategoryId, ...CategoryId[]];

export const docSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  draft: z.boolean().default(false),
  category: z.enum(categoryIds),
  tags: z.array(z.string()).default([]).optional(),
});

// 3. UI Helper Function
export function getCategoryMetadata(id: CategoryId) {
  return CATEGORY_METADATA[id];
}

export async function getDocsByCategory() {
  const allDocs = await getCollection("docs", ({ data }) => !data.draft);

  return Object.entries(CATEGORY_METADATA).map(([id, meta]) => ({
    id: id as CategoryId,
    ...meta,
    articles: allDocs
      .filter((doc) => doc.data.category === (id as CategoryId)) // Simple string check
      .sort((a, b) => a.data.order - b.data.order),
  }));
}

export async function getFeaturedDocs() {
  return getCollection("docs", ({ data }) => data.featured && !data.draft);
}
