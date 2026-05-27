import type { z } from "zod";

async function safeFetch<TData>(url: string, scheme: z.ZodSchema<TData>): Promise<TData> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");

  return scheme.parse(await response.json());
}

export { safeFetch };
