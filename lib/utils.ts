import { clsx, type ClassValue } from "clsx"; // Clsx for conditional classes
import { twMerge } from "tailwind-merge"; // Tailwind merge

export function cn(...inputs: ClassValue[]) {
  // Combine classes function
  return twMerge(clsx(inputs)); // Merge with clsx
}
