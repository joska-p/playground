import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const shuffleObject = (obj: { [key: string]: any }): { [key: string]: any } => {
  const values = Object.values(obj)
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[values[i], values[j]] = [values[j], values[i]]
  }
  return Object.fromEntries(Object.keys(obj).map((key, index) => [key, values[index]]))
}

const getRandom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

export { cn, getRandom, shuffleObject }
