import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = async (...args: Parameters<typeof fetch>) => {
  try {
    const res = await fetch(...args);
    if(!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`)
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }

}