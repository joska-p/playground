import type { z } from "zod";

export const shuffleArray = <T>(array: T[]): T[] =>
  array.sort(() => Math.random() - 0.5);

export const shuffleObject = <T extends Record<string, unknown>>(object: T) => {
  const keys = Object.keys(object);
  const values = Object.values(object);
  const shuffledValues = shuffleArray(values);

  return Object.fromEntries(
    keys.map((key, index) => [key, shuffledValues[index]]),
  ) as T;
};

export const getRandom = <T>(array: T[]): T => {
  const item = array[Math.floor(Math.random() * array.length)];
  if (item === undefined) {
    throw new Error("Cannot get random item from empty array");
  }
  return item;
};

export const safeFetch = async <TData>(
  url: string,
  scheme: z.ZodSchema<TData>,
): Promise<TData> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");

  return scheme.parse(await response.json());
};

export const getRandomValue = (obj: Record<string, unknown>) => {
  const keys = Object.keys(obj);
  return getRandom(keys);
};

export const stall = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
