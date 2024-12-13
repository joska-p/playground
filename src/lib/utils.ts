import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { z } from "zod"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const shuffleObject = <T extends Record<string, unknown>>(obj: T): T => {
  const keys = Object.keys(obj) as Array<keyof T>
  const values = Object.values(obj) as Array<T[keyof T]>

  const shuffledValues = values.sort(() => 0.5 - Math.random())

  return Object.fromEntries(keys.map((key, index) => [key, shuffledValues[index]])) as T
}

const getRandom = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)]

const safeFetch = async <TData>(url: string, scheme: z.ZodSchema<TData>): Promise<TData> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error("Network response was not ok")

  return scheme.parse(await response.json())
}

export { cn, getRandom, safeFetch, shuffleObject }
