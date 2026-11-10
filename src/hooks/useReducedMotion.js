import { useMediaQuery } from "@/hooks/useMediaQuery";

/** true quando a pessoa pediu ao sistema para reduzir animações. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
