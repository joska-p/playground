import { getCollection, type CollectionEntry } from "astro:content";
import { Book, Wrench, Lightbulb, Code } from "lucide-react";
import type { ComponentType } from "react";

export type DocType = "tutorial" | "how-to" | "explanation" | "reference";
export type DocEntry = CollectionEntry<"docs">;

export interface DocCategory {
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export const docCategories: Record<DocType, DocCategory> = {
  tutorial: {
    label: "Tutorials",
    icon: Book,
  },
  "how-to": {
    label: "How-To Guides",
    icon: Wrench,
  },
  explanation: {
    label: "Explanation",
    icon: Lightbulb,
  },
  reference: {
    label: "Reference",
    icon: Code,
  },
};

const featuredDocIds = [
  "explanation/getting-started",
  "explanation/engines",
  "how-to/adding-projects",
  "reference/design-tokens",
];

// Fetch all docs once at the top level
const allDocs = await getCollection("docs", ({ data }) => !data.draft);
export const docs = allDocs.sort((a, b) => a.data.order - b.data.order);

// Helper for grouping
export const docsByType: Record<DocType, DocEntry[]> = {
  tutorial: [],
  "how-to": [],
  explanation: [],
  reference: [],
};

for (const doc of docs) {
  const type = doc.data.type as DocType;
  if (type in docsByType) {
    docsByType[type].push(doc);
  }
}

// Helper for featured
export const featuredDocs = featuredDocIds
  .map((id) => docs.find((doc) => doc.id === id))
  .filter((doc): doc is DocEntry => !!doc);
