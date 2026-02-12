"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LANGUAGES, Language } from '@/lib/languages'

const DEFAULT_LANGUAGE = "en";

function getPreferredLanguage(): string {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("lang");
    if (saved && LANGUAGES.includes(saved as Language)) {
      return saved;
    }

    const browserLang = navigator.language?.substring(0, 2).toLowerCase();
    if (browserLang && LANGUAGES.includes(browserLang as Language)) {
      return browserLang;
    }
  }

  return DEFAULT_LANGUAGE;
}

export default function RootNotFound() {
  const router = useRouter();

  useEffect(() => {
    const lang = getPreferredLanguage();
    router.replace(`/${lang}/404`);
  }, [router]);

  return null;
}