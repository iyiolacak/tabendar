import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = async <T>(...args: Parameters<typeof fetch>): Promise<T | undefined> => {
  try {
    const res = await fetch(...args);
    if(!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`)
    }
    return res.json() as Promise<T>;
  } catch (err) {
    console.error(err);
  }

}