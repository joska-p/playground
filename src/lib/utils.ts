import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const shuffleObject = <T>(obj: Record<string, T>): Record<string, T> => {
  // Extract the keys and values from the object
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  // Shuffle the values using the Fisher-Yates algorithm
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]]; // Swap
  }

  // Create a new object with the shuffled values
  const shuffledObject: Record<string, T> = {};
  keys.forEach((key, index) => {
    shuffledObject[key] = values[index];
  });

  return shuffledObject;
};

const shuffleArray = <T>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

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

const debounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay = 1000
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
};

const throttle = <T extends (...args: unknown[]) => unknown[]>(callback: T, delay = 1000) => {
  let shouldWait = false;
  let waitingArgs: Parameters<T> | null;

  const timeoutFunc = () => {
    if (!waitingArgs) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args: Parameters<T>) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
};

export {
  cn,
  debounce,
  getRandom,
  getRandomValue,
  safeFetch,
  shuffleArray,
  shuffleObject,
  stall,
  throttle,
};
