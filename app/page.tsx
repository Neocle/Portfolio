"use client";

import { useEffect } from "react";
import { DEFAULT_LANGUAGE, isValidLanguage } from "@/lib/languages";

function detectLanguage(): string {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;

  const languages = Array.isArray(navigator.languages)
    ? navigator.languages
    : navigator.language
    ? [navigator.language]
    : [];

  for (const lang of languages) {
    if (!lang) continue;

    const lower = lang.toLowerCase();
    if (isValidLanguage(lower)) return lower;

    const base = lower.split("-")[0];
    if (isValidLanguage(base)) return base;
  }

  return DEFAULT_LANGUAGE;
}

export default function RootPage() {
  useEffect(() => {
    const lang = detectLanguage();
    window.location.replace(`/${lang}`);
  }, []);

  return null;
}