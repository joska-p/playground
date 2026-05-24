import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { docSchema } from "./data/docs";
import { notebookSchema } from "./data/notebook";

const notebook = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notebook" }),
  schema: notebookSchema,
});

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: docSchema,
});

export const collections = { docs, notebook };
