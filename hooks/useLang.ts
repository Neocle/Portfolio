"use client";

import { usePathname } from "next/navigation";
import { LANGUAGES, DEFAULT_LANGUAGE } from "@/lib/languages";
import { Language } from "@/lib/languages";

export function useLang(): string {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];

  if (segment && LANGUAGES.includes(segment as Language)) {
    return segment;
  }

  return DEFAULT_LANGUAGE;
}