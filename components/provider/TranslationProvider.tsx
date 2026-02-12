"use client";

import React, { useCallback, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TranslationContext } from "@/components/context/TranslationContext";
import { getNestedValue, renderWithPlaceholders } from "@/lib/translations";

type TranslationData = Record<string, unknown>;

interface TranslationProviderProps {
  children: ReactNode;
  language: string;
  translations: TranslationData;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  language,
  translations,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const t = useCallback(
    (key: string, fallback?: string): string =>
      getNestedValue(translations, key, fallback ?? key),
    [translations]
  );

  const tRich = useCallback(
    (
      key: string,
      values: Record<string, ReactNode>,
      fallback?: string
    ): ReactNode => {
      const text = getNestedValue(translations, key, fallback || key);
      return renderWithPlaceholders(text, values);
    },
    [translations]
  );

  const changeLanguage = useCallback(
    (newLang: string) => {
      const segments = pathname.split("/");
      segments[1] = newLang;
      router.push(segments.join("/"));
    },
    [pathname, router]
  );

  return (
    <TranslationContext.Provider value={{ t, tRich, currentLanguage: language, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};