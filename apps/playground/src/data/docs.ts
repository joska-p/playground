import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { TAG_REGISTRY, getTagMetadata, type TagId, type TagMetadata } from "./tags";

// Base URL with trailing slash (matches Astro's trailingSlash: "always" config)
const baseUrl = import.meta.env.BASE_URL || "/";

export type DocEntry = CollectionEntry<"docs">;

// Enrich document type with pre-computed tag metadata
export interface ProcessedDoc extends DocEntry {
  tagMetadata: (TagMetadata & { id: TagId })[];
  url: string;
}

const rawDocs = await getCollection("docs", ({ data }) => !data.draft);
const sortedDocs = rawDocs.sort((a, b) => a.data.order - b.data.order);

export const processedDocs: ProcessedDoc[] = sortedDocs.map((doc) => {
  // Get the folder name as the default tag
  const folderId = doc.id.split("/")[0] as TagId | undefined;

  // Use folder tag if no explicit tags, otherwise use explicit tags
  const tagIds: TagId[] =
    doc.data.tags.length > 0
      ? (doc.data.tags as TagId[])
      : folderId && folderId in TAG_REGISTRY
        ? [folderId]
        : [];

  // Map to metadata - all entries are guaranteed valid (no casting needed)
  const tagMetadata = tagIds
    .map((id) => {
      const metadata = getTagMetadata(id);
      if (!metadata) return null;
      return { id, ...metadata };
    })
    .filter((t): t is TagMetadata & { id: TagId } => t !== null);

  return {
    ...doc,
    tagMetadata,
    url: `${baseUrl}docs/${doc.id}/`,
  };
});

export const featuredDocs = processedDocs.filter((doc) => doc.data.featured);

// docsByTag uses TAG_REGISTRY entries, so all ids are valid TagIds
export const docsByTag = (Object.entries(TAG_REGISTRY) as [TagId, TagMetadata][])
  .map(([id, meta]) => ({
    ...meta,
    id,
    docs: processedDocs.filter((d) => d.id.startsWith(id) || d.data.tags.includes(id)),
  }))
  .filter((section) => section.docs.length > 0);
