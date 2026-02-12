import { LANGUAGE_MAP, type Language } from "./languages";

type TranslationData = Record<string, unknown>;

import fr_FR from "@/data/translations/fr_FR.json";
import en_US from "@/data/translations/en_US.json";
import es_ES from "@/data/translations/es_ES.json";
import de_DE from "@/data/translations/de_DE.json";
import { ReactNode, Fragment } from "react";

const translationFiles: Record<string, TranslationData> = {
  fr_FR,
  en_US,
  es_ES,
  de_DE,
};

export function getTranslations(lang: Language): TranslationData {
  const fileKey = LANGUAGE_MAP[lang];
  return translationFiles[fileKey] ?? translationFiles["en_US"];
}

export function getNestedValue(
  obj: TranslationData,
  path: string,
  fallback: string = path
): string {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (
      current &&
      typeof current === "object" &&
      key in (current as Record<string, unknown>)
    ) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return fallback;
    }
  }

  return typeof current === "string" ? current : fallback;
}

export function renderWithPlaceholders(
  text: string,
  values: Record<string, ReactNode>
): ReactNode[] {
  const regex = /{{\s*(\w+)\s*}}/g;
  const parts: ReactNode[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [placeholder, key] = match;
    const index = match.index;

    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    parts.push(values[key] ?? placeholder);

    lastIndex = index + placeholder.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.map((part, index) => (
    <Fragment key={index}>{part}</Fragment>
  ));
}

export function createT(lang: Language) {
  const translations = getTranslations(lang);
  return (key: string, fallback?: string): string =>
    getNestedValue(translations, key, fallback ?? key);
}