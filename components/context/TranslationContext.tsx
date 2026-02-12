"use client";

import { createContext, ReactNode } from "react";

export interface TranslationContextType {
  t: (key: string, fallback?: string) => string;
  tRich: (
    key: string,
    values: Record<string, ReactNode>,
    fallback?: string
  ) => ReactNode;

  currentLanguage: string;
  changeLanguage: (language: string) => void;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);