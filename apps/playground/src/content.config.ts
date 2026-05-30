import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { docSchema } from "./data/doc.schema";
import { notebookSchema } from "./data/notebook.schema";

const notebook = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notebook" }),
  schema: notebookSchema,
});

const docs = defineCollection({
  loader: glob({ pattern: ["**/*.{md,mdx}", "!home.md", "!_sidebar.md"], base: "../../docs/wiki" }),
  schema: docSchema,
});

export const collections = { docs, notebook };
