import { getCollection } from "astro:content";

export async function getDocs() {
  const docs = await getCollection("docs", ({ data }) => !data.draft);
  return docs.sort((a, b) => a.data.order - b.data.order);
}
