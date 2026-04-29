import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { docSchema } from "./data/docs";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: docSchema,
});

export const collections = { docs };
