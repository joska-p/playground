import { getCollection } from "astro:content";

export async function getDocs() {
  return getCollection("docs");
}
