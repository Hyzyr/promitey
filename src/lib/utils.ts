import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Prefix helpers: apply one breakpoint to every class ──────────────────────
// Usage: md('col-span-2 row-start-1') → 'md:col-span-2 md:row-start-1'
const bp =
  (prefix: string) =>
  (classes: string): string =>
    classes
      .trim()
      .split(/\s+/)
      .map((c) => `${prefix}:${c}`)
      .join(" ");

export const sm  = bp("sm");
export const md  = bp("md");
export const lg  = bp("lg");
export const lgx = bp("lgx");   // 1160px — matches --breakpoint-lgx in globals.css
export const xl  = bp("xl");
export const xxl = bp("2xl");

// ─── Range helpers: apply classes only between two breakpoints ────────────────
// Usage: mdToLg('flex gap-4') → 'md:max-lg:flex md:max-lg:gap-4'
const bpRange =
  (min: string, max: string) =>
  (classes: string): string =>
    classes
      .trim()
      .split(/\s+/)
      .map((c) => `${min}:max-${max}:${c}`)
      .join(" ");

export const smToMd  = bpRange("sm",  "md");
export const mdToLg  = bpRange("md",  "lg");
export const mdToLgx = bpRange("md",  "lgx");  // tablet-only: 768px → 1160px
export const lgToXl  = bpRange("lg",  "xl");
export const lgxToXl = bpRange("lgx", "xl");
export const xlTo2xl = bpRange("xl",  "2xl");
