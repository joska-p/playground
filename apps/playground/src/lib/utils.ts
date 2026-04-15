import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const shuffleArray = <T>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

const shuffleObject = <T extends Record<string, unknown>>(object: T) => {
  const keys = Object.keys(object);
  const values = Object.values(object);
  const shuffledValues = shuffleArray(values);

  return Object.fromEntries(keys.map((key, index) => [key, shuffledValues[index]])) as T;
};

const getRandom = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

const safeFetch = async <TData>(url: string, scheme: z.ZodSchema<TData>): Promise<TData> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");

  return scheme.parse(await response.json());
};

const getRandomValue = (obj: Record<string, unknown>) => {
  const keys = Object.keys(obj);
  return getRandom(keys);
};

const stall = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { cn, getRandom, getRandomValue, safeFetch, shuffleArray, shuffleObject, stall };
