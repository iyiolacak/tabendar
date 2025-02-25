import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  try {
    const res = await fetch(...args);
    if(!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`)
    }
    return res.json() as T;
  } catch (err) {
    console.error(err);
    throw err
  }

}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}