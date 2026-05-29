import type { z } from "zod";

async function fetchWithValidation<TData>(url: string, scheme: z.ZodSchema<TData>): Promise<TData> {
  const response = await fetch(url);
  return scheme.parse(await response.json());
}

export { fetchWithValidation };
