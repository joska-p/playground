import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffleObject(obj: object) {
  return Object.fromEntries(Object.entries(obj).sort(() => Math.random() - 0.5))
}

export const getRandom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
