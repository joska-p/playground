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

const getRandomValue = (obj: Record<string, unknown>) => {
  const keys = Object.keys(obj)
  return getRandom(keys)
}

const stall = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay = 1000
): ((...args: Parameters<T>) => void) => {
  let timeout: number
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(...args), delay)
  }
}

const throttle = <T extends (...args: any[]) => any>(callback: T, delay = 1000) => {
  let shouldWait = false
  let waitingArgs: Parameters<T> | null

  const timeoutFunc = () => {
    if (!waitingArgs) {
      shouldWait = false
    } else {
      callback(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args: Parameters<T>) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    callback(...args)
    shouldWait = true

    setTimeout(timeoutFunc, delay)
  }
}

export { cn, debounce, getRandom, getRandomValue, safeFetch, shuffleObject, stall, throttle }
