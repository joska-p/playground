import type { z } from "zod";

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

function shuffleObject<T extends Record<string, unknown>>(object: T) {
  const keys = Object.keys(object);
  const values = Object.values(object);
  const shuffledValues = shuffleArray(values);

  return Object.fromEntries(keys.map((key, index) => [key, shuffledValues[index]])) as T;
}

function getRandom<T>(array: T[]): T {
  const item = array[Math.floor(Math.random() * array.length)];
  if (item === undefined) {
    throw new Error("Cannot get random item from empty array");
  }
  return item;
}

async function safeFetch<TData>(url: string, scheme: z.ZodSchema<TData>): Promise<TData> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");

  return scheme.parse(await response.json());
}

function getRandomValue(obj: Record<string, unknown>) {
  const keys = Object.keys(obj);
  return getRandom(keys);
}

function stall(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { shuffleArray, shuffleObject, getRandom, safeFetch, getRandomValue, stall };
