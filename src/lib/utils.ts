import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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

export { cn, getRandom, shuffleObject }
