import { getCollection } from "astro:content";
import { baseUrl } from "../constants/routes";

export type DocType = "tutorial" | "how-to" | "explanation" | "reference";

export interface DocNavItem {
  id: string;
  title: string;
  href: string;
  order: number;
}

export interface NavSection {
  type: DocType;
  label: string;
  items: DocNavItem[];
}

const TYPE_LABELS: Record<DocType, string> = {
  tutorial: "Tutorials",
  "how-to": "How-To Guides",
  explanation: "Explanation",
  reference: "Reference",
};

const DOCS_BASE = `${baseUrl}/docs`.replace(/\/+/g, "/");

export function resolveDocHref(id: string) {
  return `${DOCS_BASE}/${id}`.replace(/\/+/g, "/");
}

export async function getDocsNav(): Promise<NavSection[]> {
  const allDocs = await getCollection("docs", ({ data }) => !data.draft);

  const sections: Record<DocType, DocNavItem[]> = {
    tutorial: [],
    "how-to": [],
    explanation: [],
    reference: [],
  };

  allDocs.forEach((doc) => {
    sections[doc.data.type].push({
      id: doc.id,
      title: doc.data.title,
      href: resolveDocHref(doc.id),
      order: doc.data.order,
    });
  });

  return (Object.keys(sections) as DocType[]).map((type) => ({
    type,
    label: TYPE_LABELS[type],
    items: sections[type].sort((a, b) => a.order - b.order),
  }));
}

export async function getDocById(id: string) {
  const allDocs = await getCollection("docs");
  return allDocs.find((doc) => doc.id === id);
}

export async function getNextPrev(id: string) {
  const allDocs = await getCollection("docs", ({ data }) => !data.draft);
  // Sort all docs in a stable way for next/prev
  const sortedDocs = allDocs.sort((a, b) => {
    if (a.data.type !== b.data.type) {
      const types: DocType[] = ["tutorial", "how-to", "explanation", "reference"];
      return types.indexOf(a.data.type) - types.indexOf(b.data.type);
    }
    return a.data.order - b.data.order;
  });

  const currentIndex = sortedDocs.findIndex((doc) => doc.id === id);
  
  return {
    prev: currentIndex > 0 ? {
      title: sortedDocs[currentIndex - 1]!.data.title,
      href: resolveDocHref(sortedDocs[currentIndex - 1]!.id)
    } : null,
    next: currentIndex < sortedDocs.length - 1 ? {
      title: sortedDocs[currentIndex + 1]!.data.title,
      href: resolveDocHref(sortedDocs[currentIndex + 1]!.id)
    } : null,
  };
}
